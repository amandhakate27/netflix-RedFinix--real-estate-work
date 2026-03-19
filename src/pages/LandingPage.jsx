import { ChevronRight } from "lucide-react";
import landingPageImage from "../assets/images/landingPage.png";
import redFinixLogo from "../assets/images/redFinixLogo.png";
import GradientDivider from "../components/GradientDivider";
import FloatingLabelInput from "../components/common/FloatingLableInput.jsx";

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <div className="relative h-screen w-full overflow-hidden">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={landingPageImage}
                    alt="LandingPage"
                />

                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)" }}
                />

                <div className="absolute inset-0 z-10 flex flex-col">

                    {/* Top Bar */}
                    <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 lg:px-16 lg:py-6">
                        <img
                            src={redFinixLogo}
                            alt="redfinix-logo"
                            className="w-20 sm:w-28 md:w-36 lg:w-44"
                        />
                        <button className="rounded bg-[#E50914] px-3 py-1 text-xs font-medium text-white sm:px-4 sm:py-1.5 sm:text-sm md:px-5 md:py-2">
                            Sign In
                        </button>
                    </div>

                    {/* Center Content */}
                    <div className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-8 md:px-10">

                        <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
                            Unlimited properties,<br />
                            listings, and more
                        </h1>

                        <p className="mt-3 text-sm font-medium text-white sm:mt-4 sm:text-base md:text-lg">
                            Starts at ₹149. Cancel at any time.
                        </p>

                        <p className="mt-3 text-xs text-white sm:mt-4 sm:text-sm md:text-base max-w-xs sm:max-w-md md:max-w-xl">
                            Ready to explore? Enter your email to create or restart your membership.
                        </p>

                        {/* Input + Button */}
                        <div className="mt-4 w-full max-w-xs sm:max-w-xl md:max-w-2xl sm:mt-5">

                            {/* Desktop/Tablet: side by side */}
                            <div className="hidden sm:flex sm:flex-row sm:items-stretch sm:gap-3">
                                <div className="flex-1">
                                    <FloatingLabelInput placeholder="Email address" type="email" />
                                </div>
                                <button className="flex items-center justify-center gap-2 rounded bg-[#E50914] px-7 text-lg font-semibold text-white transition hover:bg-[#c11119] md:px-8 md:text-xl">
                                    Get Started
                                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Mobile: stacked, button half width centered */}
                            <div className="flex flex-col items-center gap-3 sm:hidden">
                                <div className="w-full">
                                    <FloatingLabelInput placeholder="Email address" type="email" />
                                </div>
                                <button className="flex w-1/2 items-center justify-center gap-2 rounded bg-[#E50914] py-3 text-base font-semibold text-white transition hover:bg-[#c11119]">
                                    Get Started
                                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <GradientDivider />
        </div>
    );
};

export default LandingPage;