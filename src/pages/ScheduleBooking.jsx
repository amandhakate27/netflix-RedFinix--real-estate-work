import { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { ChevronDown, Search, CircleUserRound } from "lucide-react";
import Footer from "../components/common/Footer";
import redFinixLogo from "../assets/images/redFinixLogo.png";

// Icons
import backIcon from "../assets/Icons/detail-back.svg";
import locationIcon from "../assets/Icons/sv-location.svg";
import bedIcon from "../assets/Icons/sv-bed.svg";
import bathIcon from "../assets/Icons/sv-bath.svg";
import areaIcon from "../assets/Icons/sv-area.svg";
import userIcon from "../assets/Icons/sv-user.svg";
import emailIcon from "../assets/Icons/sv-email.svg";
import phoneIcon from "../assets/Icons/sv-phone.svg";
import calendarIcon from "../assets/Icons/sv-calendar.svg";
import clockIcon from "../assets/Icons/sv-clock.svg";
import messageIcon from "../assets/Icons/sv-message.svg";
import checkIcon from "../assets/Icons/sv-check.svg";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Properties", to: "/properties" },
  { label: "Schedule", to: "/schedule" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM",
];

const InputField = ({ icon, label, type = "text", placeholder, value, onChange, required }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-sm font-semibold text-white/80">{label}{required && " *"}</span>
    <span className="flex h-12 items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-3 transition focus-within:border-white/40 focus-within:bg-white/10">
      {icon && <img src={icon} alt="" className="h-4 w-4 shrink-0 brightness-0 invert opacity-60" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35 sm:text-base"
      />
    </span>
  </label>
);

const ScheduleBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property || {};
  const backPath = location.state?.from || "/properties";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingFor, setBookingFor] = useState("self"); // "self" | "other"
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  // Self fields
  const [selfFirstName, setSelfFirstName] = useState("");
  const [selfLastName, setSelfLastName] = useState("");
  const [selfEmail, setSelfEmail] = useState("");
  const [selfPhone, setSelfPhone] = useState("");

  // Other fields
  const [otherFirstName, setOtherFirstName] = useState("");
  const [otherLastName, setOtherLastName] = useState("");
  const [otherEmail, setOtherEmail] = useState("");
  const [otherPhone, setOtherPhone] = useState("");

  // Pre-fill from localStorage for self
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("redfinix_user") || "{}");
    if (stored.firstName) setSelfFirstName(stored.firstName);
    if (stored.lastName) setSelfLastName(stored.lastName);
    if (stored.email) setSelfEmail(stored.email);
    if (stored.phone) setSelfPhone(stored.phone);
  }, []);

  const [todayDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    
    // Pass booking details to confirmation page
    navigate("/booking-confirmation", {
      state: {
        booking: {
          property,
          date: selectedDate,
          time: selectedTime,
        }
      }
    });
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

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(backPath, { state: { property } })}
          className="mb-6 inline-flex items-center gap-3 text-sm font-semibold text-white/85 transition hover:text-[#E50914] sm:text-base"
        >
          <img src={backIcon} alt="" className="h-5 w-5 brightness-0 invert" />
          <span>Back to Property</span>
        </button>

        {/* Page Title */}
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Schedule Property</h1>
          <p className="mt-2 text-sm text-white/55 sm:text-base">
            Book an appointment to view{" "}
            <span className="text-white/80 font-medium">{property.title || "this property"}</span>
          </p>
        </section>

        {/* Property Card */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b]">
          <div className="grid md:grid-cols-[340px_1fr]">
            {/* Property Image */}
            <div className="relative h-56 md:h-auto">
              <img
                src={property.image}
                alt={property.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
            </div>

            {/* Property Info */}
            <div className="flex flex-col justify-center gap-4 px-6 py-6 sm:px-8">
              <div>
                <h2 className="text-2xl font-bold text-[#E50914] sm:text-3xl">{property.title}</h2>
                <p className="mt-2 inline-flex items-center gap-2 text-base text-white/65">
                  <img src={locationIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-70" />
                  {property.location}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60 sm:text-base">
                <span className="inline-flex items-center gap-2">
                  <img src={bedIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-60" />
                  {property.beds}
                </span>
                <span className="inline-flex items-center gap-2">
                  <img src={bathIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-60" />
                  {property.baths}
                </span>
                <span className="inline-flex items-center gap-2">
                  <img src={areaIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-60" />
                  {property.area}
                </span>
              </div>

              <p className="text-2xl font-bold text-[#E50914]">{property.price}</p>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Self / Other Toggle */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b]">
            <div className="flex border-b border-white/10">
              <button
                type="button"
                onClick={() => setBookingFor("self")}
                className={`flex-1 py-4 text-sm font-semibold transition-colors sm:text-base ${
                  bookingFor === "self"
                    ? "bg-[#E50914] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                For Myself
              </button>
              <button
                type="button"
                onClick={() => setBookingFor("other")}
                className={`flex-1 py-4 text-sm font-semibold transition-colors sm:text-base ${
                  bookingFor === "other"
                    ? "bg-[#E50914] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                For Someone Else
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <h2 className="mb-5 text-xl font-semibold text-[#E50914] sm:text-2xl">
                {bookingFor === "self" ? "Your Information" : "Visitor's Information"}
              </h2>

              {bookingFor === "self" ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField icon={userIcon} label="First Name" placeholder="First Name" value={selfFirstName} onChange={(e) => setSelfFirstName(e.target.value)} required />
                    <InputField icon={userIcon} label="Last Name" placeholder="Last Name" value={selfLastName} onChange={(e) => setSelfLastName(e.target.value)} required />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField icon={emailIcon} label="Email Address" type="email" placeholder="Email Address" value={selfEmail} onChange={(e) => setSelfEmail(e.target.value)} required />
                    <InputField icon={phoneIcon} label="Phone Number" type="tel" placeholder="+91" value={selfPhone} onChange={(e) => setSelfPhone(e.target.value)} required />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField icon={userIcon} label="First Name" placeholder="First Name" value={otherFirstName} onChange={(e) => setOtherFirstName(e.target.value)} required />
                    <InputField icon={userIcon} label="Last Name" placeholder="Last Name" value={otherLastName} onChange={(e) => setOtherLastName(e.target.value)} required />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField icon={emailIcon} label="Email Address" type="email" placeholder="Email Address" value={otherEmail} onChange={(e) => setOtherEmail(e.target.value)} required />
                    <InputField icon={phoneIcon} label="Phone Number" type="tel" placeholder="+91" value={otherPhone} onChange={(e) => setOtherPhone(e.target.value)} required />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Date & Time Section */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] p-5 sm:p-7">
            <h2 className="mb-5 text-xl font-semibold text-[#E50914] sm:text-2xl">Schedule Details</h2>

            <div className="space-y-5">
              {/* Date Picker */}
              <label className="flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  <img src={calendarIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-60" />
                  Select Date *
                </span>
                <span className="flex h-12 items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-3 transition focus-within:border-white/40">
                  <input
                    type="date"
                    min={todayDate}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark] sm:text-base"
                    required
                  />
                </span>
              </label>

              {/* Time Slots */}
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  <img src={clockIcon} alt="" className="h-4 w-4 brightness-0 invert opacity-60" />
                  Select Time Slot *
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`h-11 rounded-lg border text-sm font-medium transition-all sm:text-base ${
                        selectedTime === slot
                          ? "border-[#E50914] bg-[#E50914]/20 text-[#E50914]"
                          : "border-white/15 bg-white/5 text-white/65 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Message */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-white/80">Additional Message (Optional)</span>
                <span className="flex items-start gap-3 rounded-lg border border-white/15 bg-white/5 px-3 py-3 transition focus-within:border-white/40">
                  <img src={messageIcon} alt="" className="mt-1 h-4 w-4 shrink-0 brightness-0 invert opacity-60" />
                  <textarea
                    rows={3}
                    placeholder="Any specific questions or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/35 sm:text-base"
                  />
                </span>
              </label>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center pb-4">
            <button
              type="submit"
              className="inline-flex h-12 min-w-[260px] items-center justify-center gap-2 rounded-[4px] bg-[#E50914] px-8 text-base font-semibold text-white transition hover:bg-[#c11119] sm:text-lg"
            >
              <img src={checkIcon} alt="" className="h-4 w-4 brightness-0 invert" />
              Confirm Booking
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ScheduleBooking;
