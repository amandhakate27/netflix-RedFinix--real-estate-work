import { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { ChevronDown, Search, Download, Share2, Phone, Mail, CircleUserRound } from "lucide-react";
import Footer from "../components/common/Footer";
import redFinixLogo from "../assets/images/redFinixLogo.png";

// Icons
import successIcon from "../assets/Icons/sc-success.svg";
import confirmationIcon from "../assets/Icons/sc-confirmation.svg";
import propertyIcon from "../assets/Icons/sc-property.svg";
import locationIcon from "../assets/Icons/sc-location.svg";
import dateIcon from "../assets/Icons/sc-date.svg";
import timeIcon from "../assets/Icons/sc-time.svg";
import agentIcon from "../assets/Icons/sc-agent.svg";
import phoneIcon from "../assets/Icons/sc-phone.svg";
import emailIcon from "../assets/Icons/sc-email.svg";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Properties", to: "/properties" },
  { label: "Schedule", to: "/schedule" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// Generate a random confirmation code
const generateConfirmationCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "RDF-";
  for (let i = 0; i < 9; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

const whatToExpect = [
  {
    step: 1,
    title: "Arrive 5-10 Minutes Early",
    desc: "This gives you time to park and meet your agent comfortably.",
  },
  {
    step: 2,
    title: "Comprehensive Property Tour",
    desc: "Your agent will show you every detail of the property.",
  },
  {
    step: 3,
    title: "Ask Questions",
    desc: "Feel free to ask about features, neighborhood, and pricing.",
  },
  {
    step: 4,
    title: "Next Steps Discussion",
    desc: "We'll discuss your thoughts and potential next steps.",
  },
];

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking || {};
  const property = booking.property || {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [confirmationCode] = useState(generateConfirmationCode);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
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
            <img src={redFinixLogo} alt="Redfinix" className="w-28 sm:w-32 lg:w-36" />
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
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* ── Success Banner ── */}
        <section className="flex flex-col items-center gap-3 text-center">
          <div className="relative flex items-center justify-center">
            {/* Glow ring */}
            <span className="absolute h-24 w-24 rounded-full bg-green-500/20 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 ring-2 ring-green-500/30">
              <img src={successIcon} alt="Success" className="h-10 w-10 drop-shadow-md" />
            </div>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Viewing Scheduled!</h1>
          <p className="text-sm text-white/55 sm:text-base">
            Your appointment has been confirmed. See you there!
          </p>
        </section>

        {/* ── Confirmation Card ── */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b]">

          {/* Confirmation Number Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E50914]/80">
                Confirmation Number
              </p>
              <p className="mt-1 text-xl font-bold tracking-widest text-[#E50914] sm:text-2xl">
                {confirmationCode}
              </p>
            </div>
            <img src={confirmationIcon} alt="" className="h-10 w-9 brightness-0 invert opacity-30" />
          </div>

          {/* Appointment Details */}
          <div className="border-b border-white/10 px-5 py-6 sm:px-7">
            <h2 className="text-lg font-semibold text-white sm:text-xl">Appointment Details</h2>

            {/* Property */}
            <div className="mt-5 flex items-start gap-4">
              <img src={propertyIcon} alt="" className="mt-0.5 h-5 w-5 shrink-0 brightness-0 invert opacity-50" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#E50914]/80">Property</p>
                <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                  {property.title || "Your Selected Property"}
                </p>
                {property.location && (
                  <p className="mt-1 inline-flex items-center gap-2 text-sm text-white/55">
                    <img src={locationIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-50" />
                    {property.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid border-b border-white/10 px-5 py-6 sm:px-7 md:grid-cols-2 md:gap-8">
            <div className="flex items-start gap-4">
              <img src={dateIcon} alt="" className="mt-0.5 h-5 w-5 shrink-0 brightness-0 invert opacity-50" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#E50914]/80">Date &amp; Day</p>
                <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                  {formatDate(booking.date)}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-4 md:mt-0">
              <img src={timeIcon} alt="" className="mt-0.5 h-5 w-5 shrink-0 brightness-0 invert opacity-50" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#E50914]/80">Time</p>
                <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                  {booking.time || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Agent Info */}
          <div className="px-5 py-6 sm:px-7">
            <div className="flex items-start gap-4">
              <img src={agentIcon} alt="" className="mt-0.5 h-5 w-5 shrink-0 brightness-0 invert opacity-50" />
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#E50914]/80">Your Agent</p>
                <p className="mt-1 text-base font-semibold text-white sm:text-lg">Sarash Johnson</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <img src={phoneIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-50" />
                    +91 9876365357
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <img src={emailIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-50" />
                    sarash@redfinix.com
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 text-sm font-medium text-white/75 transition hover:border-white/35 hover:text-white"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
                Download to Calendar
              </button>
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 text-sm font-medium text-white/75 transition hover:border-white/35 hover:text-white"
              >
                <Share2 className="h-4 w-4" strokeWidth={2} />
                Share Details
              </button>
            </div>
          </div>
        </section>

        {/* ── What to Expect ── */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#1b1b1b] p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-white sm:text-xl">What to Expect</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {whatToExpect.map(({ step, title, desc }) => (
              <article key={step} className="flex items-start gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E50914] text-sm font-bold text-white">
                  {step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/50 sm:text-sm">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Important Information ── */}
        <section className="mt-6 rounded-2xl border border-[#E50914]/25 bg-[#E50914]/5 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-[#E50914] sm:text-xl">Important Information</h2>
          <ul className="mt-3 space-y-2.5 pl-1">
            {[
              "A confirmation email has been sent to your registered email address",
              "If you need to reschedule, please contact us at least 24 hours in advance",
              "Please bring a valid ID for security purposes",
              "Feel free to take photos during the viewing",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/65 sm:text-base">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E50914]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Navigation Buttons ── */}
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/15 text-sm font-medium text-white/70 transition hover:border-white/35 hover:text-white"
          >
            View More Properties
          </button>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/15 text-sm font-medium text-white/70 transition hover:border-white/35 hover:text-white"
          >
            Contact Support
          </button>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#E50914] text-sm font-semibold text-white transition hover:bg-[#c11119]"
          >
            Back to Home →
          </button>
        </section>

        {/* ── Need Help ── */}
        <section className="mt-14 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Need Help?</h2>
          <p className="mt-2 text-sm text-white/50 sm:text-base">
            Our team is here to assist you with any questions about your appointment
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-sm text-white/65 sm:text-base">
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#E50914]" strokeWidth={2} />
              +91 8765435629
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#E50914]" strokeWidth={2} />
              hello@redfinix.com
            </span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
