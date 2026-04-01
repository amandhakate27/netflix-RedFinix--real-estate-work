import { useState } from "react";
import { useNavigate } from "react-router-dom";
import redFinixLogo from "../assets/images/redFinixLogo.png";
import landingPageImage from "../assets/images/landingPage.png";

const FloatingInput = ({ id, label, type = "text", value, onChange, required }) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="peer w-full rounded-[4px] border border-white/20 bg-white/5 px-4 pb-2 pt-6 text-base text-white outline-none backdrop-blur-md transition focus:border-white/50 focus:bg-white/10 focus:ring-1 focus:ring-white/30 placeholder-transparent"
      placeholder=" "
      required={required}
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-4 top-4 text-base text-white/50 transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-white/70 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-white/70"
    >
      {label}
    </label>
  </div>
);

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim() && mobile.trim() && email.trim() && password.trim() && agreed) {
      // Save user info to localStorage for pre-filling other pages
      localStorage.setItem("redfinix_user", JSON.stringify({ firstName, lastName, mobile, email }));
      navigate("/signin");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background Image */}
      <img
        src={landingPageImage}
        alt="Properties background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.05)" }}
      />

      {/* Header Logo */}
      <header className="absolute top-0 left-0 z-20 p-6 md:px-12 md:py-8 w-full">
        <img
          src={redFinixLogo}
          alt="Redfinix Logo"
          className="h-8 md:h-11 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
      </header>

      {/* Form */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 sm:px-6">
        <div
          className="w-full max-w-[500px] rounded-2xl px-8 py-10 sm:px-10"
          style={{
            background: "rgba(5, 5, 5, 0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <h1 className="mb-1 text-center text-4xl font-bold tracking-tight">
              Registration
            </h1>
            <p className="mb-8 text-center text-base text-white/60">
              Create an account to avail the best real estate solutions
            </p>

            {/* Input Fields */}
            <div className="flex flex-col gap-4">
              <FloatingInput
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <FloatingInput
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <FloatingInput
                id="mobile"
                label="Mobile Number"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <FloatingInput
                id="signup-email"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FloatingInput
                id="signup-password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="mt-5 flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#E50914]"
                required
              />
              <label htmlFor="terms" className="text-sm text-white/70 leading-snug cursor-pointer">
                I agree to all the{" "}
                <span className="text-[#E50914] hover:underline cursor-pointer">Terms &amp; Conditions</span>
                , Privacy Policy stated here in
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center rounded-[4px] bg-[#E50914] py-4 text-lg font-bold text-white transition hover:bg-[#c11119]"
            >
              Continue
            </button>

            {/* Already have an account */}
            <div className="mt-5 text-center text-sm text-white/60">
              All ready have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="font-semibold text-[#E50914] hover:underline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
