import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Properties", "Services", "VR Experience", "Investment", "About", "Contact"];

const STATS = [
  { value: "₦2.4B+", label: "Assets Managed" },
  { value: "840+", label: "Properties Sold" },
  { value: "15+", label: "Years Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

const SERVICES = [
  { icon: "🏗️", title: "Land Acquisition", desc: "Strategic sourcing, verification, and documentation of prime land assets across Nigeria's fastest-growing corridors." },
  { icon: "🏢", title: "Luxury Real Estate", desc: "Exclusive residential and commercial properties curated for discerning investors and high-net-worth individuals." },
  { icon: "🔨", title: "Construction & Dev", desc: "End-to-end development from architectural concept to construction completion with world-class standards." },
  { icon: "📊", title: "Investment Advisory", desc: "Data-driven insights, ROI projections, and portfolio strategies built on deep market intelligence." },
  { icon: "🔍", title: "Property Consulting", desc: "Expert guidance through due diligence, valuation, negotiation, and acquisition for every property type." },
  { icon: "🏙️", title: "Smart Estates", desc: "Forward-thinking developments integrating smart tech, sustainable design, and premium community living." },
];

const PROPERTIES = [
  { id: 1, name: "Lekki Phase II Estate", type: "Luxury Residential", price: "₦180M", size: "2,400 sqm", status: "Available", badge: "HOT", location: "Lekki, Lagos", roi: "22% p.a." },
  { id: 2, name: "Abuja Business Hub", type: "Commercial Complex", price: "₦520M", size: "8,000 sqm", status: "Limited", badge: "NEW", location: "Maitama, Abuja", roi: "18% p.a." },
  { id: 3, name: "Ikoyi Penthouse Plots", type: "Land", price: "₦95M", size: "1,200 sqm", status: "Available", badge: "PRIME", location: "Ikoyi, Lagos", roi: "35% p.a." },
  { id: 4, name: "Port Harcourt Garden City", type: "Mixed Development", price: "₦210M", size: "5,600 sqm", status: "Pre-sale", badge: "VIP", location: "GRA, Port Harcourt", roi: "26% p.a." },
  { id: 5, name: "Enugu Smart Residences", type: "Smart Homes", price: "₦62M", size: "320 sqm", status: "Available", badge: "SMART", location: "GRA Enugu", roi: "19% p.a." },
  { id: 6, name: "Victoria Island Tower", type: "Commercial", price: "₦2.1B", size: "22,000 sqm", status: "Off-plan", badge: "ICON", location: "V/I, Lagos", roi: "30% p.a." },
];

const PROJECTS = [
  { name: "Emerald Coast Residences", location: "Lekki Phase 3", progress: 78, phase: "Superstructure", units: 48, completion: "Q3 2025" },
  { name: "Nnamdi Business Plaza", location: "Abuja CBD", progress: 45, phase: "Foundation", units: 12, completion: "Q1 2026" },
  { name: "Sapphire Gardens Estate", location: "Ajah, Lagos", progress: 92, phase: "Finishing", units: 120, completion: "Q4 2024" },
];

const TESTIMONIALS = [
  { name: "Adaeze Okonkwo", role: "Property Investor, Lagos", text: "Squaremeter transformed my investment strategy. Their land acquisition expertise is unmatched. I've tripled my portfolio value in 3 years." },
  { name: "Emeka Nwosu", role: "CEO, TechBridge Africa", text: "The team's professionalism and market intelligence are at another level. They found us the perfect commercial space in record time." },
  { name: "Fatima Al-Hassan", role: "Diaspora Investor, UK", text: "Investing in Nigerian real estate from abroad felt daunting until I found Squaremeter. Their digital-first approach and trust framework is extraordinary." },
];

function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
    }));
    let frame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${s.o})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target.replace(/[^0-9.]/g, ""));
        const steps = 60;
        let i = 0;
        const timer = setInterval(() => {
          i++;
          setCount(Math.round((num * i) / steps));
          if (i >= steps) clearInterval(timer);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{target.replace(/[0-9.]+/, count)}{suffix}</span>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Properties");
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [filterType, setFilterType] = useState("All");
  const [vrMode, setVrMode] = useState("cinematic");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hello! I'm ARIA — Squaremeter's AI Real Estate Intelligence Assistant. I can help you discover investment opportunities, analyze locations, estimate ROI, and guide your property journey across Nigeria. What are you looking for today?" }
  ]);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const propertyTypes = ["All", "Luxury Residential", "Commercial Complex", "Land", "Smart Homes", "Mixed Development", "Commercial"];
  const filtered = filterType === "All" ? PROPERTIES : PROPERTIES.filter(p => p.type === filterType);

  async function handleAI(e) {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    const userMsg = aiQuery;
    setAiQuery("");
    const newHistory = [...chatHistory, { role: "user", content: userMsg }];
    setChatHistory(newHistory);
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are ARIA — the AI Real Estate Intelligence Assistant for Squaremeter Consults Ltd., Nigeria's premier luxury real estate and construction firm. You are knowledgeable, professional, and elegant in tone. You specialize in:
- Nigerian real estate markets (Lagos, Abuja, Port Harcourt, Enugu, etc.)
- Land acquisition and verification
- Luxury and commercial property investment
- ROI analysis and market trends
- Smart property development
- Property documentation and legal processes in Nigeria

Be helpful, insightful, and concise. Use ₦ for Nigerian Naira. Give specific, actionable advice. Keep responses under 150 words unless a detailed breakdown is needed.`,
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I apologize, I couldn't process that request. Please try again.";
      setChatHistory([...newHistory, { role: "assistant", content: reply }]);
    } catch {
      setChatHistory([...newHistory, { role: "assistant", content: "Connection issue. Please check your network and try again." }]);
    }
    setAiLoading(false);
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@200;300;400;500;600&display=swap');
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      --gold:#D4AF37;--gold2:#C9971C;--gold3:#F5D878;--dark:#050709;--dark2:#0A0D12;--dark3:#0F1318;
      --glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.07);--border:rgba(212,175,55,0.18);
      --border2:rgba(212,175,55,0.35);--text:#E8E4D9;--muted:#8A8070;--white:#FAFAF8;
    }
    html{scroll-behavior:smooth}
    body{background:var(--dark);color:var(--text);font-family:'Outfit',sans-serif;overflow-x:hidden}
    h1,h2,h3,h4{font-family:'Cormorant Garamond',serif}
    .serif{font-family:'Cormorant Garamond',serif}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:var(--dark)}
    ::-webkit-scrollbar-thumb{background:var(--gold2);border-radius:2px}
    
    .nav{position:fixed;top:0;left:0;right:0;z-index:1000;transition:all 0.4s ease;padding:24px 5%}
    .nav.scrolled{background:rgba(5,7,9,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:16px 5%}
    .nav-inner{display:flex;align-items:center;justify-content:space-between;max-width:1400px;margin:0 auto}
    .logo{display:flex;align-items:center;gap:10px;text-decoration:none}
    .logo-mark{width:38px;height:38px;border:1.5px solid var(--gold);transform:rotate(45deg);display:flex;align-items:center;justify-content:center;position:relative}
    .logo-mark::before{content:'';position:absolute;width:18px;height:18px;background:var(--gold);transform:rotate(0deg)}
    .logo-text{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;color:var(--gold);letter-spacing:1px;line-height:1.1}
    .logo-sub{font-size:9px;font-weight:300;color:var(--muted);letter-spacing:3px;text-transform:uppercase}
    .nav-links{display:flex;align-items:center;gap:36px;list-style:none}
    .nav-links a{color:var(--text);text-decoration:none;font-size:13px;font-weight:300;letter-spacing:1.5px;text-transform:uppercase;opacity:0.7;transition:all 0.3s}
    .nav-links a:hover{opacity:1;color:var(--gold)}
    .nav-cta{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#0a0a0a;border:none;padding:10px 24px;font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.3s}
    .nav-cta:hover{opacity:0.85;transform:translateY(-1px)}
    
    .hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:center;overflow:hidden}
    .hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 60% 40%,rgba(212,175,55,0.06) 0%,transparent 60%),radial-gradient(ellipse 50% 70% at 10% 80%,rgba(212,175,55,0.04) 0%,transparent 50%),var(--dark)}
    .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(212,175,55,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.04) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 70%)}
    .hero-content{position:relative;z-index:2;padding:0 5%;max-width:1400px;margin:0 auto;width:100%;padding-top:120px}
    .hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:28px;font-weight:400}
    .eyebrow-line{width:40px;height:1px;background:var(--gold)}
    .hero-title{font-size:clamp(52px,8vw,112px);font-weight:300;line-height:0.95;margin-bottom:32px;color:var(--white)}
    .hero-title em{font-style:italic;color:var(--gold)}
    .hero-subtitle{font-size:clamp(14px,1.6vw,17px);font-weight:300;color:var(--muted);max-width:520px;line-height:1.8;margin-bottom:48px;letter-spacing:0.5px}
    .hero-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
    .btn-primary{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#080808;border:none;padding:16px 36px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.3s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 20px 40px rgba(212,175,55,0.3)}
    .btn-ghost{background:transparent;color:var(--text);border:1px solid var(--border2);padding:15px 34px;font-size:12px;font-weight:400;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.3s}
    .btn-ghost:hover{background:var(--glass2);border-color:var(--gold);color:var(--gold)}
    
    .hero-stats{display:flex;gap:48px;flex-wrap:wrap;margin-top:80px;padding-top:40px;border-top:1px solid var(--border)}
    .stat-item{text-align:left}
    .stat-value{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:600;color:var(--gold);line-height:1}
    .stat-label{font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-top:4px;font-weight:300}

    .hero-float{position:absolute;right:5%;top:50%;transform:translateY(-50%);width:min(480px,42vw);z-index:2}
    .building-viz{position:relative;height:520px}
    .bld{position:absolute;bottom:0;background:linear-gradient(to top,rgba(212,175,55,0.12),rgba(212,175,55,0.02));border:1px solid var(--border);backdrop-filter:blur(4px)}
    .bld1{width:120px;height:380px;left:80px}
    .bld2{width:160px;height:480px;left:180px}
    .bld3{width:100px;height:300px;left:300px}
    .bld4{width:80px;height:200px;left:360px}
    .bld-window{position:absolute;width:8px;height:12px;background:rgba(212,175,55,0.4)}
    .bld-glow{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:200px;height:80px;background:radial-gradient(ellipse,rgba(212,175,55,0.25) 0%,transparent 70%)}
    .float-card{position:absolute;background:rgba(5,7,9,0.8);border:1px solid var(--border2);backdrop-filter:blur(20px);padding:16px 20px;animation:floatCard 4s ease-in-out infinite}
    .float-card-1{top:20px;right:0;animation-delay:0s}
    .float-card-2{top:180px;left:-20px;animation-delay:1.5s}
    .float-card-3{bottom:100px;right:20px;animation-delay:0.8s}
    @keyframes floatCard{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    .fc-label{font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px}
    .fc-value{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--gold);font-weight:600}
    .fc-sub{font-size:11px;color:var(--muted)}

    section{padding:120px 5%;max-width:1400px;margin:0 auto}
    .section-eyebrow{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:16px;font-weight:400;display:flex;align-items:center;gap:10px}
    .section-title{font-size:clamp(38px,5vw,64px);font-weight:300;color:var(--white);line-height:1.05;margin-bottom:20px}
    .section-title em{font-style:italic;color:var(--gold)}
    .section-desc{font-size:16px;color:var(--muted);max-width:560px;line-height:1.8;font-weight:300}

    .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1px;margin-top:60px;border:1px solid var(--border)}
    .service-card{padding:48px 36px;background:var(--dark2);border:1px solid transparent;transition:all 0.4s;cursor:default;position:relative;overflow:hidden}
    .service-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);transform:scaleX(0);transition:transform 0.4s}
    .service-card:hover{background:var(--dark3);border-color:var(--border)}
    .service-card:hover::before{transform:scaleX(1)}
    .svc-icon{font-size:28px;margin-bottom:20px}
    .svc-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:var(--white);margin-bottom:12px}
    .svc-desc{font-size:14px;color:var(--muted);line-height:1.8;font-weight:300}
    .svc-num{position:absolute;top:24px;right:24px;font-size:11px;color:var(--border2);letter-spacing:2px}

    .properties-section{max-width:100%;padding:120px 5%}
    .prop-filters{display:flex;gap:8px;flex-wrap:wrap;margin:40px 0 48px}
    .filter-btn{background:transparent;border:1px solid var(--border);color:var(--muted);padding:8px 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.3s}
    .filter-btn.active,.filter-btn:hover{border-color:var(--gold);color:var(--gold);background:rgba(212,175,55,0.05)}
    .props-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px}
    .prop-card{background:var(--dark2);border:1px solid var(--border);overflow:hidden;transition:all 0.4s;cursor:pointer;position:relative}
    .prop-card:hover{border-color:var(--gold2);transform:translateY(-4px);box-shadow:0 30px 60px rgba(0,0,0,0.4)}
    .prop-img{height:220px;position:relative;overflow:hidden;background:linear-gradient(135deg,#0a0d12,#151a22)}
    .prop-img-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative}
    .prop-skyline{width:100%;height:100%;position:absolute;inset:0}
    .prop-badge{position:absolute;top:16px;left:16px;background:var(--gold);color:#080808;font-size:9px;font-weight:700;letter-spacing:2px;padding:5px 12px;text-transform:uppercase}
    .prop-status{position:absolute;top:16px;right:16px;background:rgba(5,7,9,0.8);border:1px solid var(--border2);color:var(--gold);font-size:10px;padding:4px 12px;letter-spacing:1px}
    .prop-body{padding:24px}
    .prop-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:var(--white);margin-bottom:4px}
    .prop-type{font-size:11px;color:var(--gold);letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
    .prop-details{display:flex;gap:16px;padding:16px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:16px}
    .prop-detail{flex:1}
    .pd-label{font-size:10px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px}
    .pd-value{font-size:13px;color:var(--text);font-weight:400}
    .prop-footer{display:flex;align-items:center;justify-content:space-between}
    .prop-price{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:600;color:var(--gold)}
    .prop-roi{font-size:11px;color:var(--muted);background:rgba(212,175,55,0.08);border:1px solid var(--border);padding:4px 10px}
    
    .prop-building{position:absolute;bottom:0;left:50%;transform:translateX(-50%);display:flex;align-items:flex-end;gap:6px}
    .pb{background:linear-gradient(to top,rgba(212,175,55,0.25),rgba(212,175,55,0.04));border:1px solid rgba(212,175,55,0.2)}
    .pb-glow{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:150px;height:50px;background:radial-gradient(ellipse,rgba(212,175,55,0.2) 0%,transparent 70%)}

    .investment-section{background:var(--dark2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);max-width:100%;padding:120px 5%}
    .inv-inner{max-width:1400px;margin:0 auto}
    .inv-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:60px}
    .inv-chart{position:relative;height:280px;background:var(--dark);border:1px solid var(--border);padding:24px}
    .chart-bars{display:flex;align-items:flex-end;gap:6px;height:200px;padding-top:8px}
    .bar{flex:1;position:relative;min-width:20px;background:linear-gradient(to top,var(--gold2),rgba(212,175,55,0.3));transition:all 0.3s}
    .bar:hover{opacity:0.85}
    .bar-label{position:absolute;bottom:-24px;left:50%;transform:translateX(-50%);font-size:10px;color:var(--muted);white-space:nowrap}
    .chart-title{font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
    .chart-value{font-family:'Cormorant Garamond',serif;font-size:36px;color:var(--gold);font-weight:600}
    .inv-metrics{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .metric-card{background:var(--dark);border:1px solid var(--border);padding:24px;transition:border-color 0.3s}
    .metric-card:hover{border-color:var(--border2)}
    .mc-label{font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
    .mc-value{font-family:'Cormorant Garamond',serif;font-size:32px;color:var(--gold);font-weight:600;margin-bottom:4px}
    .mc-trend{font-size:12px;color:#4CAF50}

    .vr-section{max-width:100%;padding:120px 5%}
    .vr-inner{max-width:1400px;margin:0 auto}
    .vr-tabs{display:flex;gap:0;margin:40px 0;border:1px solid var(--border)}
    .vr-tab{background:transparent;border:none;color:var(--muted);padding:14px 28px;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.3s;border-right:1px solid var(--border)}
    .vr-tab:last-child{border-right:none}
    .vr-tab.active{background:var(--gold);color:#080808;font-weight:600}
    .vr-viewport{background:var(--dark2);border:1px solid var(--border);height:480px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
    .vr-scene{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
    .vr-label{position:absolute;bottom:24px;left:24px;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase}
    .vr-controls{position:absolute;bottom:24px;right:24px;display:flex;gap:8px}
    .vr-btn{background:rgba(5,7,9,0.8);border:1px solid var(--border2);color:var(--text);padding:8px 16px;font-size:11px;letter-spacing:1.5px;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.3s}
    .vr-btn:hover{background:var(--gold);color:#080808;border-color:var(--gold)}
    .vr-hotspot{position:absolute;width:30px;height:30px;border:2px solid var(--gold);border-radius:50%;cursor:pointer;animation:pulse 2s ease-in-out infinite;display:flex;align-items:center;justify-content:center}
    .vr-hotspot::before{content:'';width:8px;height:8px;background:var(--gold);border-radius:50%}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0.4)}50%{box-shadow:0 0 0 12px rgba(212,175,55,0)}}
    .hs-tooltip{position:absolute;background:rgba(5,7,9,0.95);border:1px solid var(--border2);padding:10px 14px;font-size:11px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity 0.3s;top:-44px;left:50%;transform:translateX(-50%);color:var(--text)}
    .vr-hotspot:hover .hs-tooltip{opacity:1}

    .construction-section{max-width:1400px;margin:0 auto;padding:120px 5%}
    .proj-grid{display:grid;gap:24px;margin-top:60px}
    .proj-card{background:var(--dark2);border:1px solid var(--border);padding:36px;transition:border-color 0.3s}
    .proj-card:hover{border-color:var(--border2)}
    .proj-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px}
    .proj-name{font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--white);margin-bottom:4px}
    .proj-location{font-size:12px;color:var(--muted);letter-spacing:1.5px}
    .proj-phase{font-size:10px;color:var(--gold);border:1px solid var(--border2);padding:5px 12px;letter-spacing:2px;text-transform:uppercase}
    .progress-bar{background:var(--dark);height:4px;margin-bottom:12px;position:relative;overflow:hidden}
    .progress-fill{height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold3));transition:width 1s ease}
    .proj-meta{display:flex;gap:32px;font-size:12px}
    .pm-item{display:flex;flex-direction:column;gap:4px}
    .pm-label{color:var(--muted);letter-spacing:1.5px;font-size:10px;text-transform:uppercase}
    .pm-value{color:var(--text)}

    .ai-section{background:var(--dark2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);max-width:100%;padding:120px 5%}
    .ai-inner{max-width:900px;margin:0 auto}
    .ai-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(212,175,55,0.08);border:1px solid var(--border2);padding:8px 16px;font-size:11px;color:var(--gold);letter-spacing:2px;text-transform:uppercase;margin-bottom:32px}
    .ai-dot{width:8px;height:8px;background:var(--gold);border-radius:50%;animation:aiPulse 1.5s ease-in-out infinite}
    @keyframes aiPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
    .chat-window{background:var(--dark);border:1px solid var(--border);height:400px;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px;margin-bottom:16px}
    .chat-msg{display:flex;gap:12px;align-items:flex-start;animation:msgIn 0.3s ease}
    @keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .chat-avatar{width:32px;height:32px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600}
    .av-ai{background:rgba(212,175,55,0.15);border:1px solid var(--border2);color:var(--gold)}
    .av-user{background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--muted)}
    .chat-bubble{background:var(--dark2);border:1px solid var(--border);padding:12px 16px;font-size:14px;line-height:1.7;color:var(--text);font-weight:300;max-width:80%}
    .chat-bubble.user{background:rgba(212,175,55,0.06);border-color:var(--border2);margin-left:auto}
    .chat-form{display:flex;gap:0}
    .chat-input{flex:1;background:var(--dark);border:1px solid var(--border);border-right:none;color:var(--text);padding:14px 20px;font-size:14px;font-family:'Outfit',sans-serif;outline:none;font-weight:300}
    .chat-input:focus{border-color:var(--border2)}
    .chat-input::placeholder{color:var(--muted)}
    .chat-send{background:var(--gold);border:none;color:#080808;padding:14px 28px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Outfit',sans-serif;transition:opacity 0.2s}
    .chat-send:hover{opacity:0.85}
    .chat-typing{display:flex;gap:4px;align-items:center;padding:12px 16px}
    .typing-dot{width:6px;height:6px;background:var(--gold);border-radius:50%;animation:typing 1.4s ease-in-out infinite}
    .typing-dot:nth-child(2){animation-delay:0.2s}
    .typing-dot:nth-child(3){animation-delay:0.4s}
    @keyframes typing{0%,100%{opacity:0.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-4px)}}

    .testimonials-section{max-width:1400px;margin:0 auto;padding:120px 5%}
    .testimonial-display{background:var(--dark2);border:1px solid var(--border);padding:60px;margin-top:60px;position:relative;overflow:hidden}
    .quote-mark{position:absolute;top:30px;left:40px;font-family:'Cormorant Garamond',serif;font-size:120px;color:var(--border);line-height:1}
    .testimonial-text{font-family:'Cormorant Garamond',serif;font-size:clamp(18px,2.5vw,26px);font-weight:300;line-height:1.6;color:var(--white);position:relative;z-index:1;margin-bottom:36px}
    .testimonial-author{display:flex;align-items:center;gap:16px}
    .ta-avatar{width:48px;height:48px;background:linear-gradient(135deg,var(--gold2),var(--dark3));display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--gold);border:1px solid var(--border2)}
    .ta-name{font-size:15px;font-weight:500;color:var(--white);margin-bottom:2px}
    .ta-role{font-size:12px;color:var(--muted);letter-spacing:1px}
    .testimonial-dots{display:flex;gap:8px;margin-top:36px}
    .t-dot{width:20px;height:2px;background:var(--border);cursor:pointer;transition:all 0.3s}
    .t-dot.active{background:var(--gold);width:40px}

    .about-section{max-width:1400px;margin:0 auto;padding:120px 5%}
    .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:60px}
    .about-visual{position:relative;height:500px}
    .av-main{position:absolute;inset:0;background:var(--dark2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .av-overlay{position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(to top,var(--dark2),transparent)}
    .av-accent{position:absolute;bottom:-20px;right:-20px;width:200px;height:200px;background:rgba(212,175,55,0.04);border:1px solid var(--border)}
    .av-accent2{position:absolute;top:-20px;left:-20px;width:140px;height:140px;background:rgba(212,175,55,0.02);border:1px solid var(--border)}
    .about-text p{font-size:15px;color:var(--muted);line-height:1.9;margin-bottom:20px;font-weight:300}
    .about-vals{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:36px}
    .val-item{padding:20px;border:1px solid var(--border);border-left:2px solid var(--gold);padding-left:18px}
    .val-title{font-size:13px;font-weight:500;color:var(--white);margin-bottom:4px;letter-spacing:1px}
    .val-desc{font-size:12px;color:var(--muted);line-height:1.6}

    .contact-section{background:var(--dark2);max-width:100%;padding:120px 5%;border-top:1px solid var(--border)}
    .contact-inner{max-width:1400px;margin:0 auto}
    .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:60px}
    .contact-info{display:flex;flex-direction:column;gap:32px}
    .ci-item{display:flex;gap:16px;align-items:flex-start}
    .ci-icon{width:40px;height:40px;border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
    .ci-label{font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px}
    .ci-value{font-size:14px;color:var(--text);line-height:1.6}
    .contact-form{display:flex;flex-direction:column;gap:16px}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .form-field{display:flex;flex-direction:column;gap:6px}
    .form-label{font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase}
    .form-input{background:var(--dark);border:1px solid var(--border);color:var(--text);padding:12px 16px;font-size:14px;font-family:'Outfit',sans-serif;outline:none;font-weight:300;transition:border-color 0.3s}
    .form-input:focus{border-color:var(--border2)}
    .form-input::placeholder{color:var(--muted)}
    textarea.form-input{resize:vertical;min-height:120px}

    footer{border-top:1px solid var(--border);padding:60px 5% 40px;background:var(--dark)}
    .footer-inner{max-width:1400px;margin:0 auto}
    .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;margin-bottom:60px}
    .footer-desc{font-size:13px;color:var(--muted);line-height:1.8;margin-top:16px;font-weight:300}
    .footer-col-title{font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:20px}
    .footer-links{display:flex;flex-direction:column;gap:10px}
    .footer-links a{font-size:13px;color:var(--muted);text-decoration:none;transition:color 0.3s;font-weight:300}
    .footer-links a:hover{color:var(--text)}
    .footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:32px;border-top:1px solid var(--border)}
    .footer-copy{font-size:12px;color:var(--muted);letter-spacing:1px}
    .footer-badge{font-size:11px;color:var(--muted);border:1px solid var(--border);padding:6px 14px;letter-spacing:1.5px}

    .scroll-reveal{opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease}
    .scroll-reveal.revealed{opacity:1;transform:translateY(0)}
    
    .divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--border2),transparent);margin:0}

    @media(max-width:900px){
      .hero-float{display:none}
      .inv-grid,.about-grid,.contact-grid{grid-template-columns:1fr}
      .footer-top{grid-template-columns:1fr 1fr}
      .hero-stats{gap:24px}
    }
    @media(max-width:600px){
      .nav-links,.nav-cta{display:none}
      .services-grid,.props-grid{grid-template-columns:1fr}
      .footer-top{grid-template-columns:1fr}
    }
  `;

  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, aiLoading]);

  const scrollRevealRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed") }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function PropertyBuilding({ id }) {
    const configs = [
      [[60, 180], [90, 260], [70, 200], [50, 140]],
      [[80, 300], [110, 380], [70, 220], [90, 260]],
      [[50, 160], [80, 240], [100, 320], [60, 180]],
      [[70, 200], [90, 280], [80, 260], [50, 160]],
      [[60, 180], [70, 220], [90, 300], [70, 220]],
      [[100, 340], [130, 440], [90, 280], [70, 200]],
    ];
    const config = configs[(id - 1) % configs.length];
    return (
      <div className="prop-skyline">
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, padding: "0 20px" }}>
          {config.map(([w, h], i) => (
            <div key={i} className="pb" style={{ width: w, height: h, flexShrink: 0 }}>
              {Array.from({ length: Math.floor(h / 30) }).map((_, j) => (
                <div key={j} style={{ display: "flex", gap: 4, justifyContent: "center", padding: "6px 0" }}>
                  {Array.from({ length: Math.floor(w / 20) }).map((_, k) => (
                    <div key={k} style={{ width: 6, height: 10, background: `rgba(212,175,55,${Math.random() > 0.4 ? 0.5 : 0.1})` }} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pb-glow" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.1),rgba(5,7,9,0.6))" }} />
      </div>
    );
  }

  const barData = [
    { year: "2019", val: 35 }, { year: "2020", val: 48 },
    { year: "2021", val: 62 }, { year: "2022", val: 78 },
    { year: "2023", val: 95 }, { year: "2024", val: 118 },
  ];
  const maxBar = Math.max(...barData.map(b => b.val));

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="logo">
            <div className="logo-mark" />
            <div>
              <div className="logo-text">SQUAREMETER</div>
              <div className="logo-sub">Consults Ltd.</div>
            </div>
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map(l => <li key={l}><a href={`#${l.toLowerCase().replace(" ", "-")}`}>{l}</a></li>)}
          </ul>
          <button className="nav-cta">Book Consultation</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero" id="home" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-grid" />
        <StarField />
        <div className="hero-content">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <div className="hero-eyebrow"><span className="eyebrow-line" />Nigeria's Premier Real Estate Intelligence</div>
              <h1 className="hero-title">
                Building the<br /><em>Future</em> of<br />Real Estate.
              </h1>
              <p className="hero-subtitle">Where visionary architecture meets intelligent investment. Squaremeter Consults redefines the standard of luxury property across Africa's most dynamic markets.</p>
              <div className="hero-actions">
                <button className="btn-primary">Explore Properties</button>
                <button className="btn-ghost">Investment Intelligence</button>
              </div>
              <div className="hero-stats">
                {STATS.map(s => (
                  <div className="stat-item" key={s.label}>
                    <div className="stat-value"><AnimatedCounter target={s.value} /></div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-float">
              <div className="building-viz">
                <div className="bld bld1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(r => (
                    <div key={r} style={{ display: "flex", gap: 6, justifyContent: "center", padding: "5px 0" }}>
                      {[0, 1, 2].map(c => <div key={c} className="bld-window" style={{ opacity: Math.random() > 0.3 ? 0.7 : 0.15 }} />)}
                    </div>
                  ))}
                </div>
                <div className="bld bld2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
                    <div key={r} style={{ display: "flex", gap: 8, justifyContent: "center", padding: "5px 0" }}>
                      {[0, 1, 2, 3].map(c => <div key={c} className="bld-window" style={{ opacity: Math.random() > 0.3 ? 0.7 : 0.15 }} />)}
                    </div>
                  ))}
                </div>
                <div className="bld bld3">
                  {[0, 1, 2, 3, 4, 5, 6].map(r => (
                    <div key={r} style={{ display: "flex", gap: 6, justifyContent: "center", padding: "5px 0" }}>
                      {[0, 1].map(c => <div key={c} className="bld-window" style={{ opacity: Math.random() > 0.3 ? 0.6 : 0.1 }} />)}
                    </div>
                  ))}
                </div>
                <div className="bld bld4">
                  {[0, 1, 2, 3].map(r => (
                    <div key={r} style={{ display: "flex", gap: 4, justifyContent: "center", padding: "5px 0" }}>
                      {[0, 1].map(c => <div key={c} className="bld-window" style={{ opacity: 0.5 }} />)}
                    </div>
                  ))}
                </div>
                <div className="bld-glow" />
                <div className="float-card float-card-1">
                  <div className="fc-label">Live Market Value</div>
                  <div className="fc-value">₦180M</div>
                  <div className="fc-sub">Lekki Phase II · Per Plot</div>
                </div>
                <div className="float-card float-card-2">
                  <div className="fc-label">Est. Annual ROI</div>
                  <div className="fc-value">22–35%</div>
                  <div className="fc-sub">Prime Lagos Corridors</div>
                </div>
                <div className="float-card float-card-3">
                  <div className="fc-label">New Listing</div>
                  <div className="fc-value">V/I Tower</div>
                  <div className="fc-sub">₦2.1B · Off-plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "floatCard 2s ease-in-out infinite" }}>
          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 3, textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,var(--gold),transparent)" }} />
        </div>
      </div>

      <div className="divider" />

      {/* SERVICES */}
      <section id="services" className="scroll-reveal">
        <div className="section-eyebrow"><span style={{ width: 30, height: 1, background: "var(--gold)" }} />Our Expertise</div>
        <h2 className="section-title">Premium Real Estate<br /><em>Services</em></h2>
        <p className="section-desc">Six pillars of excellence built to serve Africa's most ambitious investors, developers, and property seekers.</p>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card" key={s.title}>
              <div className="svc-num">0{i + 1}</div>
              <div className="svc-icon">{s.icon}</div>
              <div className="svc-title">{s.title}</div>
              <p className="svc-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* PROPERTIES */}
      <div className="properties-section scroll-reveal" id="properties" style={{ maxWidth: "100%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="section-eyebrow"><span style={{ width: 30, height: 1, background: "var(--gold)" }} />Current Listings</div>
          <h2 className="section-title">Premium Property<br /><em>Portfolio</em></h2>
          <div className="prop-filters">
            {propertyTypes.map(t => (
              <button key={t} className={`filter-btn ${filterType === t ? "active" : ""}`} onClick={() => setFilterType(t)}>{t}</button>
            ))}
          </div>
          <div className="props-grid">
            {filtered.map(p => (
              <div className="prop-card" key={p.id}>
                <div className="prop-img">
                  <div className="prop-img-inner">
                    <PropertyBuilding id={p.id} />
                  </div>
                  <div className="prop-badge">{p.badge}</div>
                  <div className="prop-status">{p.status}</div>
                </div>
                <div className="prop-body">
                  <div className="prop-type">{p.type}</div>
                  <div className="prop-name">{p.name}</div>
                  <div className="prop-details">
                    <div className="prop-detail"><div className="pd-label">Location</div><div className="pd-value">{p.location}</div></div>
                    <div className="prop-detail"><div className="pd-label">Size</div><div className="pd-value">{p.size}</div></div>
                  </div>
                  <div className="prop-footer">
                    <div className="prop-price">{p.price}</div>
                    <div className="prop-roi">ROI {p.roi}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* INVESTMENT INTELLIGENCE */}
      <div className="investment-section scroll-reveal" id="investment">
        <div className="inv-inner">
          <div className="section-eyebrow"><span style={{ width: 30, height: 1, background: "var(--gold)" }} />Investment Intelligence</div>
          <h2 className="section-title">Market <em>Analytics</em><br />& ROI Projections</h2>
          <div className="inv-grid">
            <div>
              <div className="inv-chart">
                <div className="chart-title">Portfolio Value Growth (₦Billion)</div>
                <div className="chart-value">₦2.4B</div>
                <div style={{ height: 8 }} />
                <div className="chart-bars">
                  {barData.map(b => (
                    <div key={b.year} className="bar" style={{ height: `${(b.val / maxBar) * 100}%` }}>
                      <div className="bar-label">{b.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="inv-metrics">
              {[
                { label: "Avg. Land Appreciation", value: "31%", trend: "+4.2% vs last year" },
                { label: "Commercial Yield", value: "18%", trend: "+2.1% vs last year" },
                { label: "Active Listings", value: "142", trend: "+22 this month" },
                { label: "Completed Projects", value: "67", trend: "₦8.2B total value" },
              ].map(m => (
                <div className="metric-card" key={m.label}>
                  <div className="mc-label">{m.label}</div>
                  <div className="mc-value"><AnimatedCounter target={m.value} /></div>
                  <div className="mc-trend">↑ {m.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* VR EXPERIENCE */}
      <div className="vr-section scroll-reveal" id="vr-experience">
        <div className="vr-inner">
          <div className="section-eyebrow"><span style={{ width: 30, height: 1, background: "var(--gold)" }} />Immersive Technology</div>
          <h2 className="section-title">Virtual Property<br /><em>Experience</em></h2>
          <p className="section-desc">Walk through properties from anywhere in the world. Switch between multiple immersive exploration modes.</p>
          <div className="vr-tabs">
            {["Cinematic", "360° Tour", "Drone View", "Floorplan", "Day/Night"].map(tab => (
              <button key={tab} className={`vr-tab ${vrMode === tab.toLowerCase().split("°")[0].split("/")[0] ? "active" : ""}`}
                onClick={() => setVrMode(tab.toLowerCase().split("°")[0].split("/")[0])}>
                {tab}
              </button>
            ))}
          </div>
          <div className="vr-viewport">
            <div className="vr-scene">
              {vrMode === "cinematic" && (
                <svg viewBox="0 0 800 400" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                  <defs>
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#050709" /><stop offset="100%" stopColor="#0a1020" />
                    </linearGradient>
                    <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(212,175,55,0.15)" /><stop offset="100%" stopColor="rgba(212,175,55,0.03)" />
                    </linearGradient>
                    <radialGradient id="glow" cx="50%" cy="100%" r="50%">
                      <stop offset="0%" stopColor="rgba(212,175,55,0.15)" /><stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                  <rect width="800" height="400" fill="url(#sky)" />
                  <rect width="800" height="200" y="200" fill="url(#glow)" />
                  {[
                    [100, 320, 80, 180], [190, 320, 60, 140], [260, 320, 140, 280], [410, 320, 100, 260], [520, 320, 70, 160], [600, 320, 120, 220], [730, 320, 60, 120]
                  ].map(([x, y, w, h], i) => (
                    <g key={i}>
                      <rect x={x} y={y - h} width={w} height={h} fill="url(#bldg)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                      {Array.from({ length: Math.floor(h / 30) }).map((_, r) =>
                        Array.from({ length: Math.floor(w / 20) }).map((_, c) => (
                          <rect key={`${r}-${c}`} x={x + 6 + c * 20} y={y - h + 8 + r * 30} width={8} height={12}
                            fill={`rgba(212,175,55,${Math.random() > 0.35 ? 0.55 : 0.08})`} />
                        ))
                      )}
                    </g>
                  ))}
                  <rect x="0" y="320" width="800" height="80" fill="rgba(5,7,9,0.6)" />
                  <line x1="0" y1="320" x2="800" y2="320" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
                  {[50, 150, 250, 350, 450, 550, 650, 750].map(x => (
                    <g key={x}>
                      <circle cx={x} cy={320} r="2" fill="rgba(212,175,55,0.3)" />
                      <line x1={x} y1="322" x2={x} y2="400" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" strokeDasharray="4 4" />
                    </g>
                  ))}
                  <text x="400" y="200" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="14" fill="rgba(212,175,55,0.5)" letterSpacing="4">EMERALD COAST RESIDENCES</text>
                  <text x="400" y="218" textAnchor="middle" fontFamily="Outfit" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="2">LEKKI PHASE III · LAGOS</text>
                </svg>
              )}
              {vrMode === "360°" && (
                <div style={{ textAlign: "center", color: "var(--gold)" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>⭕</div>
                  <div style={{ fontFamily: "Cormorant Garamond", fontSize: 24 }}>360° Tour Active</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 2, marginTop: 8 }}>DRAG TO EXPLORE · CLICK HOTSPOTS FOR DETAILS</div>
                </div>
              )}
              {vrMode === "drone" && (
                <div style={{ textAlign: "center", color: "var(--gold)" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🚁</div>
                  <div style={{ fontFamily: "Cormorant Garamond", fontSize: 24 }}>Aerial Drone View</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 2, marginTop: 8 }}>SATELLITE MAP MODE · ESTATE OVERVIEW</div>
                </div>
              )}
              {vrMode === "floorplan" && (
                <svg viewBox="0 0 600 350" width="100%" height="100%">
                  <rect x="60" y="40" width="480" height="270" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                  <line x1="240" y1="40" x2="240" y2="310" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
                  <line x1="60" y1="200" x2="540" y2="200" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
                  <line x1="350" y1="200" x2="350" y2="310" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
                  <text x="150" y="125" textAnchor="middle" fontFamily="Outfit" fontSize="11" fill="rgba(212,175,55,0.7)" letterSpacing="1">LIVING ROOM</text>
                  <text x="150" y="260" textAnchor="middle" fontFamily="Outfit" fontSize="11" fill="rgba(212,175,55,0.7)" letterSpacing="1">MASTER BED</text>
                  <text x="390" y="125" textAnchor="middle" fontFamily="Outfit" fontSize="11" fill="rgba(212,175,55,0.7)" letterSpacing="1">DINING</text>
                  <text x="295" y="260" textAnchor="middle" fontFamily="Outfit" fontSize="11" fill="rgba(212,175,55,0.7)" letterSpacing="1">BED 2</text>
                  <text x="440" y="260" textAnchor="middle" fontFamily="Outfit" fontSize="11" fill="rgba(212,175,55,0.7)" letterSpacing="1">KITCHEN</text>
                  <circle cx="80" cy="200" r="6" fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="1.5" />
                </svg>
              )}
              {vrMode === "day" && (
                <div style={{ textAlign: "center", color: "var(--gold)" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>☀️</div>
                  <div style={{ fontFamily: "Cormorant Garamond", fontSize: 24 }}>Day / Night Simulation</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 2, marginTop: 8 }}>ENVIRONMENTAL LIGHTING PREVIEW</div>
                </div>
              )}
              <div className="vr-hotspot" style={{ top: "30%", left: "20%" }}><div className="hs-tooltip">Living Room · 45 sqm</div></div>
              <div className="vr-hotspot" style={{ top: "50%", left: "60%" }}><div className="hs-tooltip">Master Suite · 62 sqm</div></div>
              <div className="vr-hotspot" style={{ top: "70%", left: "40%" }}><div className="hs-tooltip">Smart Kitchen · 28 sqm</div></div>
            </div>
            <div className="vr-label">● LIVE PREVIEW · EMERALD COAST RESIDENCES</div>
            <div className="vr-controls">
              <button className="vr-btn">Book Tour</button>
              <button className="vr-btn">Full Screen</button>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* CONSTRUCTION */}
      <section className="construction-section scroll-reveal" id="construction">
        <div className="section-eyebrow"><span style={{ width: 30, height: 1, background: "var(--gold)" }} />Active Development</div>
        <h2 className="section-title">Construction<br /><em>Progress</em> Tracker</h2>
        <div className="proj-grid">
          {PROJECTS.map(p => (
            <div className="proj-card" key={p.name}>
              <div className="proj-header">
                <div>
                  <div className="proj-name">{p.name}</div>
                  <div className="proj-location">{p.location}</div>
                </div>
                <div className="proj-phase">{p.phase}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
                <div style={{ fontFamily: "Cormorant Garamond", fontSize: 22, color: "var(--gold)", fontWeight: 600, minWidth: 48 }}>{p.progress}%</div>
              </div>
              <div className="proj-meta">
                <div className="pm-item"><div className="pm-label">Units</div><div className="pm-value">{p.units} units</div></div>
                <div className="pm-item"><div className="pm-label">Est. Completion</div><div className="pm-value">{p.completion}</div></div>
                <div className="pm-item"><div className="pm-label">Status</div><div className="pm-value" style={{ color: "var(--gold)" }}>On Schedule</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* AI ASSISTANT */}
      <div className="ai-section scroll-reveal" id="ai">
        <div className="ai-inner">
          <div className="ai-badge"><div className="ai-dot" />ARIA · AI Real Estate Intelligence</div>
          <h2 className="section-title" style={{ maxWidth: 700 }}>Your Personal<br /><em>Property Intelligence</em> Advisor</h2>
          <p className="section-desc" style={{ marginBottom: 40 }}>ARIA analyzes market data, predicts appreciation trends, and delivers personalized investment recommendations in real time.</p>
          <div className="chat-window">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role === "user" ? "justify-end" : ""}`} style={msg.role === "user" ? { flexDirection: "row-reverse" } : {}}>
                <div className={`chat-avatar ${msg.role === "assistant" ? "av-ai" : "av-user"}`}>
                  {msg.role === "assistant" ? "AI" : "You"}
                </div>
                <div className={`chat-bubble ${msg.role === "user" ? "user" : ""}`}>{msg.content}</div>
              </div>
            ))}
            {aiLoading && (
              <div className="chat-msg">
                <div className="chat-avatar av-ai">AI</div>
                <div className="chat-bubble">
                  <div className="chat-typing">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-form" onSubmit={handleAI}>
            <input className="chat-input" value={aiQuery} onChange={e => setAiQuery(e.target.value)}
              placeholder="Ask about investment opportunities, ROI projections, or property locations..." />
            <button className="chat-send" type="submit" disabled={aiLoading}>
              {aiLoading ? "..." : "Ask ARIA →"}
            </button>
          </form>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            {["Best land to buy in Lagos 2025?", "Compare Lekki vs Ikoyi ROI", "How to verify land title in Nigeria?"].map(q => (
              <button key={q} onClick={() => setAiQuery(q)}
                style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "Outfit", transition: "all 0.3s" }}
                onMouseEnter={e => { e.target.style.borderColor = "var(--gold)"; e.target.style.color = "var(--gold)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* TESTIMONIALS */}
      <section className="testimonials-section scroll-reveal">
        <div className="section-eyebrow"><span style={{ width: 30, height: 1, background: "var(--gold)" }} />Client Voices</div>
        <h2 className="section-title">Stories of<br /><em>Trust & Returns</em></h2>
        <div className="testimonial-display">
          <div className="quote-mark">"</div>
          <p className="testimonial-text">"{TESTIMONIALS[testimonialIdx].text}"</p>
          <div className="testimonial-author">
            <div className="ta-avatar">{TESTIMONIALS[testimonialIdx].name.split(" ").map(n => n[0]).join("")}</div>
            <div>
              <div className="ta-name">{TESTIMONIALS[testimonialIdx].name}</div>
              <div className="ta-role">{TESTIMONIALS[testimonialIdx].role}</div>
            </div>
          </div>
          <div className="testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <div key={i} className={`t-dot ${i === testimonialIdx ? "active" : ""}`} onClick={() => setTestimonialIdx(i)} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section className="about-section scroll-reveal" id="about">
        <div className="section-eyebrow"><span style={{ width: 30, height: 1, background: "var(--gold)" }} />Our Story</div>
        <h2 className="section-title">About <em>Squaremeter</em><br />Consults Ltd.</h2>
        <div className="about-grid">
          <div className="about-visual">
            <div className="av-main">
              <svg viewBox="0 0 400 440" width="100%" height="100%">
                <defs>
                  <linearGradient id="abg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(212,175,55,0.08)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0.01)" />
                  </linearGradient>
                </defs>
                <rect width="400" height="440" fill="url(#abg)" />
                {[
                  [120, 420, 80, 200], [210, 420, 120, 320], [340, 420, 70, 160], [50, 420, 50, 100]
                ].map(([x, y, w, h], i) => (
                  <g key={i}>
                    <rect x={x} y={y - h} width={w} height={h} fill="rgba(212,175,55,0.07)" stroke="rgba(212,175,55,0.25)" strokeWidth="0.5" />
                    {Array.from({ length: Math.floor(h / 28) }).map((_, r) =>
                      Array.from({ length: Math.floor(w / 18) }).map((_, c) => (
                        <rect key={`${r}-${c}`} x={x + 5 + c * 18} y={y - h + 7 + r * 28} width={7} height={10}
                          fill={`rgba(212,175,55,${Math.random() > 0.4 ? 0.5 : 0.08})`} />
                      ))
                    )}
                  </g>
                ))}
                <rect x="0" y="390" width="400" height="50" fill="rgba(5,7,9,0.7)" />
                <ellipse cx="200" cy="440" rx="160" ry="30" fill="rgba(212,175,55,0.12)" />
                <text x="200" y="230" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="12" fill="rgba(212,175,55,0.4)" letterSpacing="4">BUILDING TOMORROW</text>
                <text x="200" y="248" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="12" fill="rgba(212,175,55,0.4)" letterSpacing="4">TODAY</text>
              </svg>
              <div className="av-overlay" />
            </div>
            <div className="av-accent" />
            <div className="av-accent2" />
          </div>
          <div className="about-text">
            <p>Squaremeter Consults Ltd. was founded with a singular conviction: that Africa deserves world-class real estate intelligence. For over 15 years, we have been at the forefront of Nigeria's property market transformation.</p>
            <p>We operate at the intersection of technology, architecture, and financial intelligence — delivering experiences that go far beyond traditional real estate practice. Our team of 80+ experts spans land law, construction, urban planning, and investment analytics.</p>
            <p>From Lekki to Maitama, Port Harcourt to Enugu, we have shaped the skylines and investment portfolios of Nigeria's most discerning property investors.</p>
            <div className="about-vals">
              {[
                { title: "Integrity", desc: "Every transaction built on transparency and trust" },
                { title: "Innovation", desc: "AI-driven insights and digital-first client experience" },
                { title: "Excellence", desc: "World-class standards in every engagement" },
                { title: "Legacy", desc: "Building generational wealth through smart property" },
              ].map(v => (
                <div className="val-item" key={v.title}>
                  <div className="val-title">{v.title}</div>
                  <div className="val-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <div className="contact-section scroll-reveal" id="contact">
        <div className="contact-inner">
          <div className="section-eyebrow"><span style={{ width: 30, height: 1, background: "var(--gold)" }} />Get In Touch</div>
          <h2 className="section-title">Begin Your<br /><em>Property Journey</em></h2>
          <div className="contact-grid">
            <div className="contact-info">
              {[
                { icon: "📍", label: "Headquarters", value: "14 Admiralty Way, Lekki Phase 1\nLagos, Nigeria" },
                { icon: "📞", label: "Phone", value: "+234 (0) 803 456 7890\n+234 (0) 703 456 7890" },
                { icon: "✉️", label: "Email", value: "invest@squaremeterconsults.ng\ninfo@squaremeterconsults.ng" },
                { icon: "🕐", label: "Office Hours", value: "Monday – Friday: 8:00 AM – 6:00 PM\nSaturday: 10:00 AM – 3:00 PM" },
              ].map(c => (
                <div className="ci-item" key={c.label}>
                  <div className="ci-icon">{c.icon}</div>
                  <div>
                    <div className="ci-label">{c.label}</div>
                    <div className="ci-value" style={{ whiteSpace: "pre-line" }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-form">
              <div className="form-row">
                <div className="form-field">
                  <div className="form-label">First Name</div>
                  <input type="text" className="form-input" placeholder="Adaeze" />
                </div>
                <div className="form-field">
                  <div className="form-label">Last Name</div>
                  <input type="text" className="form-input" placeholder="Okonkwo" />
                </div>
              </div>
              <div className="form-field">
                <div className="form-label">Email Address</div>
                <input type="email" className="form-input" placeholder="you@example.com" />
              </div>
              <div className="form-field">
                <div className="form-label">Phone Number</div>
                <input type="tel" className="form-input" placeholder="+234 803 000 0000" />
              </div>
              <div className="form-field">
                <div className="form-label">Service Interest</div>
                <select className="form-input" style={{ background: "var(--dark)", color: "var(--text)", appearance: "none", cursor: "pointer" }}>
                  <option>Land Acquisition</option>
                  <option>Luxury Property Purchase</option>
                  <option>Investment Advisory</option>
                  <option>Construction & Development</option>
                  <option>Property Consulting</option>
                </select>
              </div>
              <div className="form-field">
                <div className="form-label">Your Message</div>
                <textarea className="form-input" placeholder="Tell us about your property goals or investment interests..." />
              </div>
              <button className="btn-primary" style={{ width: "100%", fontSize: 12, padding: 18 }}>
                Send Consultation Request →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="logo">
                <div className="logo-mark" />
                <div>
                  <div className="logo-text">SQUAREMETER</div>
                  <div className="logo-sub">Consults Ltd.</div>
                </div>
              </div>
              <p className="footer-desc">Nigeria's premier real estate intelligence firm. Transforming the way Africa invests, builds, and lives.</p>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <div className="footer-links">
                {["Land Acquisition", "Luxury Sales", "Construction", "Investment Advisory", "Smart Estates", "Consulting"].map(l => <a href="#" key={l}>{l}</a>)}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <div className="footer-links">
                {["About Us", "Our Team", "Projects", "Case Studies", "Media & Press", "Careers"].map(l => <a href="#" key={l}>{l}</a>)}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Connect</div>
              <div className="footer-links">
                {["LinkedIn", "Instagram", "Twitter/X", "Facebook", "YouTube", "WhatsApp"].map(l => <a href="#" key={l}>{l}</a>)}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Squaremeter Consults Ltd. All rights reserved. RC: 1847392</div>
            <div style={{ display: "flex", gap: 16 }}>
              <div className="footer-badge">LASEPA Certified</div>
              <div className="footer-badge">NIESV Member</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
