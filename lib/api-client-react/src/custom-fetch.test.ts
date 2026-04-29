import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  ApiError,
  ResponseParseError,
  customFetch,
  setAuthTokenGetter,
  setBaseUrl,
} from "./custom-fetch";

function mockFetch(
  handler: (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => Promise<Response> | Response,
): () => void {
  const original = globalThis.fetch;
  globalThis.fetch = (async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => handler(input, init)) as typeof fetch;

  return () => {
    globalThis.fetch = original;
  };
}

describe("customFetch", () => {
  beforeEach(() => {
    setBaseUrl(null);
    setAuthTokenGetter(null);
  });

  it("prepends baseUrl to relative paths", async () => {
    setBaseUrl("https://api.example.com/");

    const restore = mockFetch((input) => {
      assert.equal(input, "https://api.example.com/v1/health");
      return new Response("ok", { status: 200, statusText: "OK" });
    });

    try {
      const result = await customFetch<string>("/v1/health", {
        responseType: "text",
      });
      assert.equal(result, "ok");
    } finally {
      restore();
    }
  });

  it("does not prepend baseUrl to absolute URLs", async () => {
    setBaseUrl("https://api.example.com");

    const restore = mockFetch((input) => {
      assert.equal(input, "https://other.example.com/v1/health");
      return new Response("ok", { status: 200, statusText: "OK" });
    });

    try {
      const result = await customFetch<string>("https://other.example.com/v1/health", {
        responseType: "text",
      });
      assert.equal(result, "ok");
    } finally {
      restore();
    }
  });

  it("throws when GET has an explicit body", async () => {
    const restore = mockFetch(() => {
      throw new Error("fetch should not be called");
    });

    try {
      await assert.rejects(
        () =>
          customFetch("/v1/health", {
            method: "GET",
            body: "{}",
          }),
        (err: unknown) => {
          assert.ok(err instanceof TypeError);
          assert.match((err as Error).message, /GET requests cannot have a body/);
          return true;
        },
      );
    } finally {
      restore();
    }
  });

  it("auto-detects json string body and sets content-type", async () => {
    const restore = mockFetch((_, init) => {
      assert.equal(init?.method, "POST");
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("content-type"), "application/json");
      return new Response("created", { status: 200, statusText: "OK" });
    });

    try {
      const result = await customFetch<string>("/v1/items", {
        method: "POST",
        body: "{\n  \"a\": 1\n}",
        responseType: "text",
      });
      assert.equal(result, "created");
    } finally {
      restore();
    }
  });

  it("sets Accept for responseType json when not provided", async () => {
    const restore = mockFetch((_, init) => {
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("accept"), "application/json, application/problem+json");
      return new Response("{}", {
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/json" },
      });
    });

    try {
      const result = await customFetch("/v1/items", { responseType: "json" });
      assert.deepEqual(result, {});
    } finally {
      restore();
    }
  });

  it("attaches Authorization header from authTokenGetter", async () => {
    setAuthTokenGetter(async () => "token123");

    const restore = mockFetch((_, init) => {
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("authorization"), "Bearer token123");
      return new Response("ok", { status: 200, statusText: "OK" });
    });

    try {
      const result = await customFetch<string>("/v1/secure", { responseType: "text" });
      assert.equal(result, "ok");
    } finally {
      restore();
    }
  });

  it("does not override explicit Authorization header", async () => {
    setAuthTokenGetter(() => "token123");

    const restore = mockFetch((_, init) => {
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("authorization"), "Bearer explicit");
      return new Response("ok", { status: 200, statusText: "OK" });
    });

    try {
      const result = await customFetch<string>("/v1/secure", {
        responseType: "text",
        headers: { authorization: "Bearer explicit" },
      });
      assert.equal(result, "ok");
    } finally {
      restore();
    }
  });

  it("throws ApiError with parsed JSON error body", async () => {
    const restore = mockFetch(() => {
      return new Response(JSON.stringify({ title: "Bad", detail: "Nope" }), {
        status: 400,
        statusText: "Bad Request",
        headers: { "content-type": "application/problem+json" },
      });
    });

    try {
      await assert.rejects(
        () => customFetch("/v1/items"),
        (err: unknown) => {
          assert.ok(err instanceof ApiError);
          const apiError = err as ApiError;
          assert.equal(apiError.status, 400);
          assert.deepEqual(apiError.data, { title: "Bad", detail: "Nope" });
          assert.match(apiError.message, /Bad — Nope/);
          return true;
        },
      );
    } finally {
      restore();
    }
  });

  it("throws ResponseParseError when JSON parsing fails", async () => {
    const restore = mockFetch(() => {
      return new Response("{not json}", {
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/json" },
      });
    });

    try {
      await assert.rejects(
        () => customFetch("/v1/items", { responseType: "json" }),
        (err: unknown) => {
          assert.ok(err instanceof ResponseParseError);
          const parseError = err as ResponseParseError;
          assert.match(parseError.message, /Failed to parse response/);
          assert.equal(parseError.rawBody, "{not json}");
          return true;
        },
      );
    } finally {
      restore();
    }
  });

  it("treats missing content-type as text in auto mode", async () => {
    const restore = mockFetch(() => {
      return new Response("hello", { status: 200, statusText: "OK" });
    });

    try {
      const result = await customFetch<string>("/v1/text");
      assert.equal(result, "hello");
    } finally {
      restore();
    }
  });
});
