import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Search, Home, Calendar, ShieldCheck, CircleUserRound } from "lucide-react";
import Footer from "../components/common/Footer";
import redFinixLogo from "../assets/images/redFinixLogo.png";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Properties", to: "/properties" },
  { label: "Schedule", to: "/schedule" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const About = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-40 px-4 py-4 transition-all duration-300 sm:px-8 lg:px-16 ${
          isScrolled
            ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
            : "bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.45)_72%,rgba(0,0,0,0)_100%)]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 lg:gap-8">
            <img src={redFinixLogo} alt="Redfinix" className="w-28 sm:w-32 lg:w-36 cursor-pointer" onClick={() => navigate("/home")} />
            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              className="flex items-center gap-1 text-sm font-medium text-white lg:hidden"
            >
              Browse
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm transition-colors duration-200 hover:text-[#b3b3b3] ${isActive ? "font-semibold text-white" : "text-white/80"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute sm:left-4 left-0 top-[100%] z-40 mt-1 w-[260px] rounded border border-white/20 bg-black/95 py-2 shadow-2xl backdrop-blur-md lg:hidden">
                <div className="absolute sm:left-[110px] left-[135px] -top-[12px] h-0 w-0 border-b-[12px] border-l-[12px] border-r-[12px] border-b-black/95 border-l-transparent border-r-transparent"></div>
                <div className="absolute sm:left-[109px] left-[134px] -top-[14px] -z-10 h-0 w-0 border-b-[14px] border-l-[13px] border-r-[13px] border-b-white/20 border-l-transparent border-r-transparent"></div>
                
                <nav className="flex flex-col divide-y divide-white/10 text-center">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <NavLink
                        key={link.label}
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`py-4 text-[15px] font-medium transition-colors hover:bg-white/5 ${isActive ? "text-white" : "text-white/70"}`}
                      >
                        {link.label}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </>
          )}
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
            <button type="button" className="text-white transition hover:text-[#b3b3b3]" aria-label="Search">
              <Search className="h-5 w-5" strokeWidth={2.2} />
            </button>
            <div className="flex items-center gap-2">
              <CircleUserRound className="h-8 w-8 text-white/80 transition-colors hover:text-white" strokeWidth={1.5} />
              <ChevronDown className="h-4 w-4 text-white" strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-16">
        {/* Main Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1b1b1b]">
          {/* subtle glow bg */}
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#E50914]/10 blur-[100px] pointer-events-none" />
          
          <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#E50914]/30 bg-[#E50914]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#E50914]">
                About RedFinix
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                A modern real estate experience built for clarity and speed
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
                RedFinix helps buyers and families discover premium homes, compare verified property details,
                and schedule visits with a simple workflow. We focus on practical UI, trust, and responsiveness
                across devices to give you a true Netflix-like browsing experience for real estate.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/properties")}
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-[#E50914] px-8 text-sm font-semibold text-white transition hover:bg-[#c11119] sm:text-base"
                >
                  Explore Properties
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-transparent px-8 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
                >
                  Contact Team
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Active Listings", value: "500+" },
                { label: "Happy Clients", value: "1200+" },
                { label: "Years Experience", value: "25+" },
                { label: "Support", value: "24/7" },
              ].map((stat) => (
                <div key={stat.label} className="group flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-black/40 p-6 transition hover:border-[#E50914]/30 hover:bg-black/60">
                  <span className="text-3xl font-black tracking-tight text-[#E50914] transition-transform group-hover:scale-110 sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-sm font-medium text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Home className="h-7 w-7 text-[#E50914]" />,
              title: "Curated Listings",
              desc: "Structured cards with location, beds, baths, area and direct detail access.",
            },
            {
              icon: <Calendar className="h-7 w-7 text-[#E50914]" />,
              title: "Fast Scheduling",
              desc: "From listing to confirmation in a guided step-by-step appointment flow.",
            },
            {
              icon: <ShieldCheck className="h-7 w-7 text-[#E50914]" />,
              title: "Consistent Experience",
              desc: "Same visual language and responsive behavior across all pages and devices.",
            },
          ].map((feature, i) => (
            <article key={i} className="flex flex-col items-start rounded-2xl border border-white/10 bg-[#1b1b1b] p-8 transition hover:border-white/25">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E50914]/10">
                {feature.icon}
              </div>
              <h2 className="text-xl font-bold text-white">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{feature.desc}</p>
            </article>
          ))}
        </section>

        {/* Mission Statement */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-[#1b1b1b] p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Our Mission</h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Make premium real-estate discovery simple, transparent, and efficient. Every page is built to
                help users decide faster with less friction. We believe finding a home should be as enjoyable and seamless as watching your favorite movie.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">What We Deliver</h2>
              <ul className="mt-5 space-y-4 text-base text-white/70">
                <li className="flex items-start gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E50914]" />
                  <span>High quality listing visuals with useful metadata.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E50914]" />
                  <span>Clear route flow from homepage to appointment confirmation.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E50914]" />
                  <span>Device-first responsive layout with clean spacing and typography.</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#E50914] px-8 text-sm font-semibold text-white transition hover:bg-[#c11119]"
              >
                Schedule a Visit
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
