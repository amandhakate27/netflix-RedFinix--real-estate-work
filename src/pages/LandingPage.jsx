import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import landingPageImage from "../assets/images/landingPage.png";
import redFinixLogo from "../assets/images/redFinixLogo.png";
import topProperty1 from "../assets/images/top-property-1.png";
import topProperty2 from "../assets/images/top-property-2.png";
import topProperty3 from "../assets/images/top-property-3.png";
import topProperty4 from "../assets/images/top-property-4.png";
import topProperty5 from "../assets/images/top-property-5.png";
import topProperty6 from "../assets/images/top-property-6.png";
import topProperty7 from "../assets/images/top-property-7.png";
import topProperty8 from "../assets/images/top-property-8.png";
import topProperty9 from "../assets/images/top-property-9.png";
import topProperty10 from "../assets/images/top-property-10.png";
import GradientDivider from "../components/GradientDivider";
import FloatingLabelInput from "../components/common/FloatingLableInput.jsx";
import TrendingSlider from "../components/common/TrendingSlider";
import ReasonsSection from "../components/ReasonsSection";
import FaqSection from "../components/FaqSection";
import BottomCtaSection from "../components/BottomCtaSection";
import FooterSection from "../components/FooterSection";

const trendingCards = [
    { id: 1, image: topProperty1, title: "Green Valley Villa" },
    { id: 2, image: topProperty2, title: "Sunrise Apartments" },
    { id: 3, image: topProperty3, title: "Royal Heights" },
    { id: 4, image: topProperty4, title: "Silver Oak Bungalow" },
    { id: 5, image: topProperty5, title: "Palm Grove Residency" },
    { id: 6, image: topProperty6, title: "Blue Ridge Towers" },
    { id: 7, image: topProperty7, title: "Emerald Estate" },
    { id: 8, image: topProperty8, title: "Horizon Homes" },
    { id: 9, image: topProperty9, title: "Maple Leaf Society" },
    { id: 10, image: topProperty10, title: "The Grand Enclave" },
];

const LandingPage = () => {
    const desktopEmailRef = useRef(null);
    const mobileEmailRef = useRef(null);

    const focusIfEmpty = (inputRef) => {
        if (!inputRef.current) return;
        if (!inputRef.current.value.trim()) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="relative h-[84vh] min-h-[48rem] w-full overflow-hidden sm:h-screen sm:min-h-0">
                <img className="absolute inset-0 h-full w-full object-cover" src={landingPageImage} alt="LandingPage" />

                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.8) 100%)" }}
                />

                <div className="absolute inset-0 z-10 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 lg:px-16 lg:py-6">
                        <img src={redFinixLogo} alt="redfinix-logo" className="w-28 sm:w-28 md:w-36 lg:w-44" /><button className="rounded bg-[#E50914] px-4 py-1.5 text-sm font-medium text-white sm:px-4 sm:py-1.5 sm:text-sm md:px-5 md:py-2">                            Sign In                        </button>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:justify-center sm:px-8 sm:pt-0 md:px-10">
                        <h1 className="max-w-xs text-[2.35rem] font-semibold leading-tight text-white sm:max-w-xl sm:text-4xl md:max-w-2xl md:text-5xl lg:max-w-3xl lg:text-6xl">
                            Unlimited properties,
                            <br />
                            listings, and more
                        </h1>

                        <p className="mt-3 text-sm font-medium text-white sm:mt-4 sm:text-base md:text-lg">
                            Starts at Rs 149. Cancel at any time.
                        </p>

                        <p className="mt-3 max-w-xs text-xs text-white sm:mt-4 sm:max-w-md sm:text-sm md:max-w-xl md:text-base">
                            Ready to explore? Enter your email to create or restart your membership.
                        </p>

                        <div className="mt-4 w-full max-w-xs sm:mt-5 sm:max-w-xl md:max-w-2xl">
                            <div className="hidden sm:flex sm:flex-row sm:items-stretch sm:gap-3">
                                <div className="flex-1">
                                    <FloatingLabelInput ref={desktopEmailRef} placeholder="Email address" type="email" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => focusIfEmpty(desktopEmailRef)}
                                    className="flex items-center justify-center gap-2 rounded bg-[#E50914] px-7 text-lg font-semibold text-white transition hover:bg-[#c11119] md:px-8 md:text-xl"
                                >
                                    Get Started
                                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
                                </button>
                            </div>

                            <div className="flex flex-col items-center gap-3 sm:hidden">
                                <div className="w-full">
                                    <FloatingLabelInput ref={mobileEmailRef} placeholder="Email address" type="email" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => focusIfEmpty(mobileEmailRef)}
                                    className="flex w-1/2 items-center justify-center gap-2 rounded bg-[#E50914] py-3 text-base font-semibold text-white transition hover:bg-[#c11119]"
                                >
                                    Get Started
                                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GradientDivider />

            <section className="-mt-1 bg-black px-4 pb-16 pt-0 sm:px-8 md:px-12 lg:-mt-2 lg:px-16">
                <div className="mx-auto w-full max-w-7xl">
                    <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl sm:font-semibold">Trending Now</h2>
                    <TrendingSlider cards={trendingCards} />
                </div>
            </section>

            <ReasonsSection />
            <FaqSection />
            <BottomCtaSection />
            <FooterSection />
        </div>
    );
};

export default LandingPage;

