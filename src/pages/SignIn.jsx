import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import redFinixLogo from "../assets/images/redFinixLogo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if email was saved from Landing Page
    const savedEmail = localStorage.getItem("redfinix_signin_email");
    if (savedEmail) {
      setEmail(savedEmail);
      localStorage.removeItem("redfinix_signin_email");
    }
  }, []);

  const handleContinue = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      navigate("/home");
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(to bottom, #4a0404 0%, #3a0303 20%, #220202 40%, #0e0101 60%, #000000 100%)",
      }}
    >
      {/* Header Logo */}
      <header className="absolute top-0 left-0 p-6 md:px-12 md:py-8 z-10 w-full">
        <img
          src={redFinixLogo}
          alt="Redfinix Logo"
          className="h-8 md:h-11 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
      </header>

      {/* Form Container */}
      <div className="flex min-h-screen items-center justify-center px-4 pt-16 sm:px-6">
        <div className="w-full max-w-[450px]">
          <form onSubmit={handleContinue}>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              Enter your info to sign in
            </h1>
            <p className="mb-8 text-lg font-medium text-gray-300">
              Or get started with a new account.
            </p>

            {/* Input Group */}
            <div className="flex flex-col gap-4">
              {/* Email Input Container */}
              <div className="relative rounded-[4px] bg-[#161616]/70">
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full rounded-[4px] border border-[#5e5e5e] bg-transparent px-4 pb-2 pt-6 text-base text-white outline-none focus:ring-2 focus:ring-white"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-4 top-4 text-base text-[#b3b3b3] transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
                >
                  Email or mobile number
                </label>
              </div>

              {/* Password Input Container */}
              <div className="relative rounded-[4px] bg-[#161616]/70">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full rounded-[4px] border border-[#5e5e5e] bg-transparent px-4 pb-2 pt-6 text-base text-white outline-none focus:ring-2 focus:ring-white"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-4 top-4 text-base text-[#b3b3b3] transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
                >
                  Password
                </label>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center rounded-[4px] bg-[#E50914] py-4 text-lg font-bold text-white transition hover:bg-[#c11119]"
            >
              Continue
            </button>

            {/* Forgot Password */}
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-[#b3b3b3] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-[#737373]">
              New to Redfinix?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-semibold text-white hover:underline"
              >
                Sign up now.
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
