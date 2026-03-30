import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Search, MapPin, Phone, Mail, Send, CircleUserRound } from "lucide-react";
import Footer from "../components/common/Footer";
import redFinixLogo from "../assets/images/redFinixLogo.png";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Properties", to: "/properties" },
  { label: "Schedule", to: "/schedule" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Contact = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending message
    alert("Your message has been sent successfully!");
  };

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
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1b1b1b]">
          {/* subtle glow bg */}
          <div className="absolute top-0 right-1/4 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#E50914]/10 blur-[120px] pointer-events-none" />
          
          <div className="relative grid gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-16">
            
            {/* Left Info Column */}
            <div className="pr-0 lg:pr-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#E50914]/30 bg-[#E50914]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#E50914]">
                Contact RedFinix
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Talk to our real estate support team
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
                Get help with listings, appointments, pricing questions, and property recommendations. Our team
                replies quickly and keeps communication clear.
              </p>

              <div className="mt-10 flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-black/40 p-5 transition hover:bg-black/60">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E50914]/10">
                    <MapPin className="h-5 w-5 text-[#E50914]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Office Location</h3>
                    <p className="mt-1 text-sm text-white/50 leading-relaxed">123 Park Avenue, Suite 1000<br />New York, NY 10017</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-black/40 p-5 transition hover:bg-black/60">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E50914]/10">
                    <Phone className="h-5 w-5 text-[#E50914]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Phone Support</h3>
                    <p className="mt-1 text-sm text-white/50">+91 87865 32932</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-black/40 p-5 transition hover:bg-black/60">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E50914]/10">
                    <Mail className="h-5 w-5 text-[#E50914]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Email Us</h3>
                    <p className="mt-1 text-sm text-white/50">hello@redfinix.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="relative rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-md sm:p-8">
              <h2 className="text-2xl font-bold text-white">Send a Message</h2>
              <p className="mt-2 text-sm text-white/50">Share your requirements and we will get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">First Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John"
                    className="h-12 w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#E50914] focus:bg-black"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Last Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Doe"
                    className="h-12 w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#E50914] focus:bg-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#E50914] focus:bg-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="How can we help?"
                    className="h-12 w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#E50914] focus:bg-black"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Message</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Write your message here..."
                    className="w-full resize-y rounded-lg border border-white/10 bg-[#1b1b1b] p-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#E50914] focus:bg-black"
                  />
                </div>
                <div className="sm:col-span-2 mt-2">
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#E50914] text-sm font-bold text-white transition hover:bg-[#c11119]"
                  >
                    <Send className="h-4 w-4" strokeWidth={2.5} />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
