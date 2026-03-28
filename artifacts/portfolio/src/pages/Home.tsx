import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles, Bot, Code2, Zap, Award, Search, Megaphone, BarChart3, Smartphone, Layout, ShoppingCart, Palette, TrendingUp, Star, Quote, Mail, Phone, MapPin, Linkedin, Twitter, Github, Heart, ChevronDown, Menu, X, CheckCircle2, AlertCircle, ExternalLink, Eye } from "lucide-react";
import profileImg from "/images/profile.webp";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  { icon: Search, color: "emerald", title: "Advanced SEO, AEO & GEO", desc: "Future-proof strategies optimizing for Google Search and modern AI Answer Engines like ChatGPT & Gemini.", tags: ["AEO & GEO", "Technical SEO", "Voice Search"] },
  { icon: Megaphone, color: "orange", title: "Paid Advertising", desc: "High-ROAS Google Ads and Meta Ads campaigns. Strategy to execution — maximizing conversions.", tags: ["Google Ads", "Meta Ads", "PPC"] },
  { icon: BarChart3, color: "violet", title: "Analytics & CRO", desc: "Turn data into decisions. Advanced analytics setup, funnel optimization, A/B testing, and CRO strategies.", tags: ["GA4", "A/B Testing", "Heatmaps"] },
  { icon: Smartphone, color: "red", title: "Social Media Marketing", desc: "Strategic social media management that builds brand authority. Content calendars, community management.", tags: ["Instagram", "LinkedIn", "Content"] },
  { icon: Layout, color: "blue", title: "WordPress & Shopify", desc: "Custom, high-performance websites. Marketing-ready WordPress sites and scalable Shopify stores.", tags: ["WordPress", "Shopify", "Custom Themes"] },
  { icon: ShoppingCart, color: "teal", title: "E-Commerce Solutions", desc: "End-to-end e-commerce with Shopify, WooCommerce, or custom solutions. Payment & order management.", tags: ["Shopify", "WooCommerce", "Payments"] },
  { icon: Palette, color: "pink", title: "UI/UX Design", desc: "Beautiful, user-centric interfaces that convert. Wireframing, prototyping, and pixel-perfect designs.", tags: ["Figma", "Prototyping", "Design Systems"] },
  { icon: Bot, color: "indigo", title: "AI Automation & Dev", desc: "LLM integration, advanced prompt engineering, and automated workflows to boost productivity.", tags: ["Prompt Eng.", "LLMs", "Automation"] },
];

const PROJECTS = [
  { id: 1, cat: "Web Dev", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", badge: "12K+", label: "Web Dev & AI", title: "AI-Powered SaaS Dashboard", desc: "Full-stack financial management platform with predictive AI analytics. Built with React, Node.js, and OpenAI API.", tags: ["React", "OpenAI", "Node.js"] },
  { id: 2, cat: "Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", badge: "5x", label: "Marketing", title: "AEO & SEO Growth Strategy", desc: "Complete digital overhaul optimizing for Google and AI Answer Engines. Achieved 5x revenue growth.", tags: ["AEO", "Meta Ads", "SEO"] },
  { id: 3, cat: "E-Commerce", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop", badge: "340%", label: "E-Commerce", title: "Luxury Fashion Shopify Store", desc: "High-conversion Shopify store for a premium fashion brand. Custom theme with abandoned cart and upsell flows.", tags: ["Shopify", "CRO", "Automation"] },
  { id: 4, cat: "Marketing", img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=500&fit=crop", badge: "-60% CPL", label: "Paid Ads", title: "Google Ads Performance Campaign", desc: "End-to-end Google Ads management for B2B SaaS. Reduced cost-per-lead by 60% while doubling conversion rate.", tags: ["Google Ads", "B2B", "Conversion"] },
  { id: 5, cat: "Web Dev", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop", badge: "99 Speed", label: "WordPress", title: "Performance WordPress Agency Site", desc: "Ultra-fast WordPress build scoring 99 on PageSpeed. Custom Elementor blocks, schema markup, and GA4 setup.", tags: ["WordPress", "Performance", "SEO"] },
  { id: 6, cat: "Branding", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop", badge: "2.1M reach", label: "Social Media", title: "D2C Brand Social Strategy", desc: "Full-scale social media strategy for a D2C health brand. Grew Instagram from 2K to 85K followers in 8 months.", tags: ["Instagram", "Content", "Influencer"] },
];

const PROCESS = [
  { num: "01", color: "brand", title: "Discovery & Strategy", desc: "Deep-dive into your business, competitors, and audience. I craft a custom AI-powered growth strategy.", items: ["AI Market Analysis", "Strategy Blueprint"] },
  { num: "02", color: "violet", title: "AI-Accelerated Build", desc: "Speed and precision. LLM-assisted coding and automated workflows cut development time by 50%.", items: ["Rapid Prototyping", "Automated Testing"] },
  { num: "03", color: "cyan", title: "Launch & Optimize", desc: "Go live with confidence. Continuous monitoring and data-driven optimization ensure lasting results.", items: ["Performance Monitoring", "A/B Testing"] },
  { num: "04", color: "emerald", title: "Scale & Grow", desc: "Systematic scaling using AI tools and proven frameworks to amplify what works and eliminate what doesn't.", items: ["Analytics tracking", "Monthly reports"] },
];

const TECH = [
  { title: "AI & Automation", items: ["ChatGPT (LLMs)", "Claude AI", "Midjourney", "Zapier"] },
  { title: "Marketing", items: ["Google Ads", "Meta Ads", "GA4 & GTM", "SEMrush"] },
  { title: "CMS & Platforms", items: ["WordPress", "Shopify", "WooCommerce"] },
  { title: "SEO & Research", items: ["Ahrefs", "Screaming Frog", "Search Console", "Surfer SEO"] },
];

const TESTIMONIALS = [
  { quote: "Abhinav transformed our entire digital presence. Our website went from a basic template to a conversion machine. Traffic tripled within 3 months.", name: "Rajesh Mehta", title: "CEO, TechStart India", initials: "RM", color: "from-blue-500 to-cyan-400" },
  { quote: "Working with Abhinav on our e-commerce store was a game-changer. His understanding of both development and marketing is rare and incredibly valuable.", name: "Priya Sharma", title: "Founder, StyleHive", initials: "PS", color: "from-pink-500 to-rose-400" },
  { quote: "We hired Abhinav for our Google Ads campaigns and were blown away. Our cost per lead dropped by 60% while conversions doubled.", name: "Amit Patel", title: "Marketing Head, GrowthCo", initials: "AP", color: "from-emerald-500 to-green-400" },
];

const MARQUEE_ITEMS = ["AI Integration", "LLMs & Prompt Eng.", "AEO & SEO", "Shopify & WordPress", "Growth Strategy", "Automation", "UI/UX Design", "Analytics & CRO"];

const colorMap: Record<string, string> = {
  brand: "from-[#6c47ff] to-[#00d4ff]",
  violet: "from-violet-500 to-purple-400",
  cyan: "from-cyan-500 to-blue-400",
  emerald: "from-emerald-500 to-green-400",
  orange: "from-orange-500 to-amber-400",
  red: "from-red-500 to-pink-400",
  blue: "from-blue-500 to-cyan-400",
  teal: "from-teal-500 to-cyan-400",
  pink: "from-pink-500 to-rose-400",
  indigo: "from-indigo-500 to-blue-400",
};

const iconColorMap: Record<string, string> = {
  brand: "text-[#7c6bff]",
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
  orange: "text-orange-400",
  red: "text-red-400",
  blue: "text-blue-400",
  teal: "text-teal-400",
  pink: "text-pink-400",
  indigo: "text-indigo-400",
};

const bgColorMap: Record<string, string> = {
  brand: "bg-[#6c47ff]/10",
  violet: "bg-violet-500/10",
  cyan: "bg-cyan-500/10",
  emerald: "bg-emerald-500/10",
  orange: "bg-orange-500/10",
  red: "bg-red-500/10",
  blue: "bg-blue-500/10",
  teal: "bg-teal-500/10",
  pink: "bg-pink-500/10",
  indigo: "bg-indigo-500/10",
};

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("active");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const FILTERS = ["All", "Web Dev", "Marketing", "E-Commerce", "Branding"];
  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === activeFilter);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    const fd = new FormData(e.currentTarget);
    const services = [...(e.currentTarget as HTMLFormElement).querySelectorAll<HTMLInputElement>("input[name='services']:checked")].map(x => x.value).join(", ");
    const payload = { name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone"), budget: fd.get("budget"), services, details: fd.get("details") };
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwbGiQXVmXTcl-2up9WbfbXCio1ajbi0rDudYEypLeEL7WilNa_vuM38G8xgd7Pbwy1pg/exec";
    try {
      await fetch(scriptUrl, { method: "POST", body: JSON.stringify(payload) });
      setFormState("success");
      formRef.current?.reset();
      setTimeout(() => setFormState("idle"), 3500);
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3500);
    }
  }

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-2xl border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6c47ff] to-cyan-400 flex items-center justify-center font-bold text-lg text-white">A</div>
              <span className="font-bold text-lg text-white hidden sm:block">Abhinav<span className="text-[#7c6bff]">.tech</span></span>
            </a>
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">{l.label}</a>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-4">
              <a href="#contact" data-testid="cta-lets-talk" className="shine-btn group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#6c47ff] hover:bg-[#5b2bf5] rounded-xl transition-all duration-300">
                Let's Talk <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <button data-testid="mobile-menu-btn" className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl pt-24 px-6 lg:hidden transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="px-4 py-4 text-xl font-medium text-zinc-300 hover:text-white border-b border-border transition-colors">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-[#6c47ff] rounded-xl">
            Let's Talk <ArrowUpRight className="w-5 h-5" />
          </a>
        </nav>
      </div>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center aurora-bg grid-pattern overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6c47ff]/10 rounded-full blur-[120px] animate-float pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px] animate-float-delayed pointer-events-none" />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-[80px] animate-float pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6c47ff]/20 bg-[#6c47ff]/5 text-[#a08eff] text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Available for Strategies — 2025</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h1 className="reveal font-bold tracking-tight leading-[1.05] mb-6 delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="text-white">I Drive Growth Through</span>
              <br />
              <span className="gradient-text">AI-Powered Marketing</span>
              <span className="text-white"> &</span>
              <br />
              <span className="gradient-text">Smart Development</span>
            </h1>

            <p className="reveal max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 mb-12 leading-relaxed delay-200">
              Digital Strategist leveraging LLMs & AI for 10x productivity. Specializing in SEO, AEO, and high-performance WordPress & Shopify experiences.
            </p>

            <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 delay-300">
              <a href="#work" data-testid="cta-view-work" className="shine-btn group inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 font-semibold rounded-2xl hover:bg-zinc-100 transition-all duration-300 text-base">
                View My Work <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="#contact" data-testid="cta-start-project" className="inline-flex items-center gap-2 px-8 py-4 border border-border text-white font-semibold rounded-2xl hover:border-[#6c47ff]/50 hover:bg-[#6c47ff]/5 transition-all duration-300 text-base">
                Start a Project
              </a>
            </div>

            <div className="reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto delay-400">
              {[["500%", "Avg. ROI"], ["10M+", "Revenue Generated"], ["5+", "Years Experience"], ["100+", "Projects Delivered"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{val}</div>
                  <div className="text-sm text-zinc-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-bounce-slow absolute bottom-8 left-1/2 flex flex-col items-center gap-2">
            <span className="text-xs text-zinc-600 uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-4 h-4 text-zinc-600" />
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="reveal relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[#6c47ff]/20 to-cyan-500/10 border border-[#6c47ff]/10 backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-25" />
                    <div className="relative h-full flex flex-col items-center justify-center p-8">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6c47ff] to-cyan-400 p-1 mb-6 shadow-2xl shadow-[#6c47ff]/20">
                        <img src={profileImg} alt="Abhinav Saxena" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <h3 className="font-bold text-2xl text-white mb-1">Abhinav Saxena</h3>
                      <p className="text-[#a08eff] text-sm">Digital Strategist & Developer</p>
                      <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-xs">
                        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                          <div className="font-bold text-lg text-white">5+</div>
                          <div className="text-xs text-zinc-500">Years Exp</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                          <div className="font-bold text-lg text-white">100+</div>
                          <div className="text-xs text-zinc-500">Projects</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl animate-float">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">ROI Growth</div>
                      <div className="text-xs text-emerald-400">+340%</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -left-2 bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl animate-float-delayed">
                    <div className="w-8 h-8 rounded-lg bg-[#6c47ff]/10 flex items-center justify-center">
                      <Award className="w-4 h-4 text-[#7c6bff]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Certified</div>
                      <div className="text-xs text-[#a08eff]">Google Ads</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal delay-200">
                <span className="text-[#7c6bff] text-sm font-semibold uppercase tracking-widest">About Me</span>
                <h2 className="font-bold text-4xl sm:text-5xl text-white mt-4 mb-6 leading-tight">
                  The Future of <br /><span className="gradient-text">Digital Growth is AI</span>
                </h2>
                <div className="space-y-4 text-zinc-400 leading-relaxed">
                  <p>I'm Abhinav Saxena — a <strong className="text-white">hybrid digital strategist</strong> who combines deep AI knowledge with development expertise. I don't just work hard; I work smart using <strong className="text-white">Generative AI & LLMs</strong>.</p>
                  <p>My approach is built on <strong className="text-white">AI-enhanced productivity</strong>. By mastering prompt engineering and automation, I deliver weeks of work in days. From <strong className="text-white">AEO</strong> that ranks you on ChatGPT and Perplexity, to high-speed <strong className="text-white">WordPress & Shopify</strong> sites, I build future-proof assets.</p>
                  <p>Whether you need to scale your traffic with <strong className="text-white">GEO (Generative Engine Optimization)</strong> or build a custom e-commerce experience, I bring expert-level AI advantage to your project.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[{ icon: Bot, label: "AI Integrated", sub: "LLMs & Prompt Eng." }, { icon: Code2, label: "CMS Expert", sub: "WordPress & Shopify" }, { icon: Zap, label: "Performance", sub: "Speed & Conversion" }, { icon: Award, label: "Certified", sub: "Google & Meta Ads" }].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-[#6c47ff]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#7c6bff]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{label}</div>
                        <div className="text-xs text-zinc-500">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative py-32 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 glow-line pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="reveal text-center mb-20">
              <span className="text-[#7c6bff] text-sm font-semibold uppercase tracking-widest">What I Do</span>
              <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-4 mb-6">
                Services That <span className="gradient-text">Deliver Results</span>
              </h2>
              <p className="max-w-2xl mx-auto text-zinc-400 text-lg">From concept to launch and beyond — comprehensive digital solutions tailored to accelerate your business growth.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className={`reveal group relative bg-card/50 border border-border rounded-2xl p-6 card-hover cursor-pointer backdrop-blur-sm ${i % 4 === 1 ? "delay-100" : i % 4 === 2 ? "delay-150" : i % 4 === 3 ? "delay-200" : ""}`}>
                    <div className={`w-12 h-12 rounded-xl ${bgColorMap[s.color]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${iconColorMap[s.color]}`} />
                    </div>
                    <h3 className="font-semibold text-lg text-white mb-3 group-hover:text-[#a08eff] transition-colors">{s.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {s.tags.map((t) => <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/5">{t}</span>)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#7c6bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorMap[s.color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="relative py-32 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 glow-line pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#6c47ff]/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="reveal text-center mb-16">
              <span className="text-[#7c6bff] text-sm font-semibold uppercase tracking-widest">Portfolio</span>
              <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-4 mb-6">
                Selected <span className="gradient-text">Work</span>
              </h2>
              <p className="max-w-2xl mx-auto text-zinc-400 text-lg">A curated showcase where strategy meets execution — delivering measurable results across industries.</p>
            </div>
            <div className="reveal flex flex-wrap justify-center gap-2 mb-12 delay-200">
              {FILTERS.map((f) => (
                <button key={f} data-testid={`filter-${f.toLowerCase().replace(" ", "-")}`} onClick={() => setActiveFilter(f)} className={`px-5 py-2 text-sm rounded-xl font-medium transition-all duration-300 ${activeFilter === f ? "bg-[#6c47ff] text-white shadow-lg shadow-[#6c47ff]/25" : "bg-card text-zinc-400 hover:text-white border border-border hover:border-[#6c47ff]/30"}`}>{f}</button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div key={p.id} data-testid={`project-card-${p.id}`} className="group relative bg-card border border-border rounded-2xl overflow-hidden card-hover">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"><Eye className="w-5 h-5" /></button>
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"><ExternalLink className="w-5 h-5" /></button>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-semibold text-white">{p.badge}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-[#7c6bff] font-medium">{p.label}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-[#a08eff] transition-colors">{p.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/5 text-zinc-400">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="relative py-32 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 glow-line pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="reveal text-center mb-20">
              <span className="text-[#7c6bff] text-sm font-semibold uppercase tracking-widest">How I Work</span>
              <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-4 mb-6">
                The AI-Enhanced <span className="gradient-text">Process</span>
              </h2>
              <p className="max-w-2xl mx-auto text-zinc-400 text-lg">A systematic, AI-powered workflow that ensures every project delivers exceptional results, on time and on budget.</p>
            </div>
            <div className="relative space-y-12 lg:space-y-0 lg:pl-16">
              <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              {PROCESS.map((step, i) => (
                <div key={step.num} className={`reveal relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "" : ""}`}>
                  <div className={`${i % 2 === 1 ? "lg:col-start-2 lg:pl-16" : "lg:pr-16"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[step.color]} flex items-center justify-center md:hidden`}>
                        <span className="font-bold text-white text-sm">{step.num}</span>
                      </div>
                      <h3 className="font-bold text-2xl sm:text-3xl text-white">{step.title}</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-6">{step.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.items.map((item) => <span key={item} className="text-sm px-3 py-1.5 rounded-lg bg-card border border-border text-zinc-300">{item}</span>)}
                    </div>
                  </div>
                  <div className="absolute left-8 lg:left-1/2 top-0 -translate-x-1/2 hidden md:flex">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[step.color]} flex items-center justify-center shadow-2xl`}>
                      <span className="font-bold text-white text-lg">{step.num}</span>
                    </div>
                  </div>
                  <div className={`${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1 lg:pr-16" : "lg:pl-16"}`}>
                    <div className="relative bg-card/80 border border-border rounded-2xl p-8 backdrop-blur-sm">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[step.color]} flex items-center justify-center mb-4 opacity-80`}>
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-3">
                        {step.items.map((item) => (
                          <div key={item} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorMap[step.color]}`} />
                            <span className="text-sm text-zinc-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TechStack */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 glow-line pointer-events-none" />
          <div className="relative mb-20 overflow-hidden py-6 border-y border-border">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i}>
                  <span className="mx-4 text-2xl sm:text-3xl font-bold text-zinc-700 hover:text-[#7c6bff] transition-colors cursor-default">{item}</span>
                  <span className="mx-4 text-2xl sm:text-3xl font-bold text-[#6c47ff]/30">•</span>
                </span>
              ))}
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="reveal text-center mb-16">
              <span className="text-[#7c6bff] text-sm font-semibold uppercase tracking-widest">Tech Stack</span>
              <h2 className="font-bold text-4xl sm:text-5xl text-white mt-4 mb-6">
                Tools of the <span className="gradient-text">Trade</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TECH.map((group, i) => (
                <div key={group.title} className={`reveal bg-card/50 border border-border rounded-2xl p-6 ${i === 1 ? "delay-100" : i === 2 ? "delay-200" : i === 3 ? "delay-300" : ""}`}>
                  <h3 className="font-semibold text-lg text-white mb-4">{group.title}</h3>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-2 h-2 rounded-full bg-[#6c47ff] group-hover:bg-[#7c6bff] transition-colors" />
                        <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="relative py-32 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 glow-line pointer-events-none" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#6c47ff]/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="reveal text-center mb-20">
              <span className="text-[#7c6bff] text-sm font-semibold uppercase tracking-widest">Testimonials</span>
              <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-4 mb-6">
                Client <span className="gradient-text">Love</span>
              </h2>
              <p className="max-w-2xl mx-auto text-zinc-400 text-lg">Don't just take my word for it — here's what clients say about working together.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} className={`reveal group relative bg-card/50 border border-border rounded-2xl p-6 card-hover ${i === 1 ? "delay-100" : i === 2 ? "delay-200" : ""}`}>
                  <Quote className="w-8 h-8 text-[#6c47ff]/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xs font-bold text-white">{t.initials}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-zinc-500">{t.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-32 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 glow-line pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#6c47ff]/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="reveal text-center mb-20">
              <span className="text-[#7c6bff] text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
              <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-4 mb-6">
                Let's Build Something <span className="gradient-text">Amazing</span>
              </h2>
              <p className="max-w-2xl mx-auto text-zinc-400 text-lg">Have a project in mind? Let's discuss how I can help your business grow with the perfect blend of technology and marketing.</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
              <div className="reveal lg:col-span-2 space-y-8">
                <div>
                  <h3 className="font-bold text-2xl text-white mb-6">Contact Info</h3>
                  <div className="space-y-5">
                    {[{ icon: Mail, label: "abhinav@abhinav.tech", sub: "Email me anytime" }, { icon: Phone, label: "+91 98765 43210", sub: "Mon–Fri, 9AM–6PM IST" }, { icon: MapPin, label: "New Delhi, India", sub: "Available for remote work" }].map(({ icon: Icon, label, sub }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#6c47ff]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#7c6bff]" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{label}</div>
                          <div className="text-sm text-zinc-500">{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Follow Me</h4>
                  <div className="flex gap-3">
                    {[{ icon: Linkedin, label: "LinkedIn" }, { icon: Twitter, label: "Twitter" }, { icon: Github, label: "GitHub" }].map(({ icon: Icon, label }) => (
                      <a key={label} href="#" data-testid={`social-${label.toLowerCase()}`} className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#6c47ff]/50 hover:bg-[#6c47ff]/10 transition-all">
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#6c47ff]/10 to-cyan-500/5 border border-[#6c47ff]/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-white">Currently Available</span>
                  </div>
                  <p className="text-sm text-zinc-400">Open to new projects and collaborations. Typical response time: <span className="text-white font-medium">within 24 hours</span>.</p>
                </div>
              </div>

              <div className="reveal delay-200 lg:col-span-3">
                <form ref={formRef} data-testid="contact-form" onSubmit={handleSubmit} className="bg-card/50 border border-border rounded-2xl p-8 backdrop-blur-sm space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Name *</label>
                      <input data-testid="input-name" name="name" required placeholder="Your full name" className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6c47ff]/60 transition-colors text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Email *</label>
                      <input data-testid="input-email" name="email" type="email" required placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6c47ff]/60 transition-colors text-sm" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Phone</label>
                      <input data-testid="input-phone" name="phone" placeholder="+91 00000 00000" className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6c47ff]/60 transition-colors text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Budget Range</label>
                      <select data-testid="select-budget" name="budget" className="w-full px-4 py-3 rounded-xl bg-input border border-border text-zinc-300 focus:outline-none focus:border-[#6c47ff]/60 transition-colors text-sm appearance-none cursor-pointer">
                        <option value="">Select range</option>
                        <option value="under-25k">Under ₹25,000</option>
                        <option value="25k-50k">₹25,000 – ₹50,000</option>
                        <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                        <option value="1l-3l">₹1,00,000 – ₹3,00,000</option>
                        <option value="above-3l">Above ₹3,00,000</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-300">Services Needed</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {["SEO / AEO", "Paid Ads", "Web Dev", "E-Commerce", "UI/UX Design", "AI Automation"].map((s) => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" name="services" value={s} className="w-4 h-4 rounded border-border accent-[#6c47ff]" />
                          <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Project Details</label>
                    <textarea data-testid="input-details" name="details" rows={4} placeholder="Tell me about your project, goals, and timeline..." className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6c47ff]/60 transition-colors text-sm resize-none" />
                  </div>
                  <button data-testid="button-submit" type="submit" disabled={formState === "loading"} className={`shine-btn w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${formState === "success" ? "bg-emerald-500" : formState === "error" ? "bg-red-500" : "bg-gradient-to-r from-[#6c47ff] to-[#5b2bf5] hover:from-[#5b2bf5] hover:to-[#4d1de0]"} disabled:opacity-70 disabled:cursor-not-allowed`}>
                    {formState === "loading" ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : formState === "success" ? <><CheckCircle2 className="w-5 h-5" /> Lead saved!</> : formState === "error" ? <><AlertCircle className="w-5 h-5" /> Failed — try again</> : <><span>Send Message</span><ArrowUpRight className="w-5 h-5" /></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6c47ff] to-cyan-400 flex items-center justify-center font-bold text-lg text-white">A</div>
                <span className="font-bold text-lg text-white">Abhinav<span className="text-[#7c6bff]">.tech</span></span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">AI-powered digital marketing & development. Helping businesses grow smarter.</p>
            </div>
            {[
              { title: "Navigation", links: [{ href: "#about", label: "About" }, { href: "#services", label: "Services" }, { href: "#work", label: "Portfolio" }, { href: "#process", label: "Process" }] },
              { title: "Services", links: [{ href: "#services", label: "Web Development" }, { href: "#services", label: "SEO Optimization" }, { href: "#services", label: "Paid Advertising" }, { href: "#services", label: "UI/UX Design" }] },
              { title: "Connect", links: [{ href: "#", label: "LinkedIn" }, { href: "#", label: "Twitter / X" }, { href: "#", label: "GitHub" }, { href: "#contact", label: "Email" }] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-white mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => <li key={l.label}><a href={l.href} className="text-sm text-zinc-500 hover:text-white transition-colors">{l.label}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-600">© 2025 Abhinav Saxena. All rights reserved.</p>
            <p className="text-sm text-zinc-600 flex items-center gap-1">Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" /> in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
