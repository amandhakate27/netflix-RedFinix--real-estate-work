import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Info, Menu, Search, X } from "lucide-react";
import redFinixLogo from "../assets/images/redFinixLogo.png";
import profilePhotoRed from "../assets/images/profilePhotoRed.jpg";
import heroSlide1 from "../assets/images/HeroSlide1.png";
import heroSlide2 from "../assets/images/HeroSlide2.avif";
import heroSlide3 from "../assets/images/HeroSlide3.avif";
import heroSlide4 from "../assets/images/HeroSlide4.avif";

const navLinks = [
    { label: "Home", to: "/home" },
    { label: "Properties", href: "#" },
    { label: "Schedule", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
];
const SLIDE_DURATION = 7000;
const CONTENT_FADE_DELAY = 600;

const heroSlides = [
    {
        image: heroSlide1,
        title: "Modern Luxury Villa",
        description:
            "Discover signature homes, private estates, and premium residences tailored for modern living and unforgettable first impressions.",
        location: "Beverly Hills, CA",
        status: "Ready to Move",
        badge: "Verified Listing",
        type: "Villa",
        beds: "5 Beds",
        baths: "4 Baths",
        area: "6,200 sq.ft",
        price: "? 14.5 Cr",
        overview:
            "A private luxury villa with open glass interiors, resort-style outdoor spaces, and a layout designed for elegant family living.",
        highlights: "Infinity pool, skyline terrace, designer kitchen",
        idealFor: "Luxury buyers, private hosting, family estate living",
    },
    {
        image: heroSlide2,
        title: "Skyline Penthouse Collection",
        description:
            "Explore elevated city living with panoramic views, curated interiors, and standout spaces designed for comfort, prestige, and convenience.",
        location: "Pune, Maharashtra",
        status: "New Launch",
        badge: "Signature Release",
        type: "Penthouse",
        beds: "4 Beds",
        baths: "4 Baths",
        area: "4,800 sq.ft",
        price: "? 9.8 Cr",
        overview:
            "A panoramic penthouse residence with double-height living, premium finishes, and a rooftop-ready entertaining experience.",
        highlights: "Private deck, skyline views, bespoke finishes",
        idealFor: "City executives, luxury buyers, premium investors",
    },
    {
        image: heroSlide3,
        title: "Oceanfront Estate Retreat",
        description:
            "Step into exceptional coastal living with open layouts, dramatic architecture, and lifestyle-first amenities in every detail.",
        location: "Alibaug, Maharashtra",
        status: "Private Tour Available",
        badge: "Featured Estate",
        type: "Retreat Home",
        beds: "6 Beds",
        baths: "5 Baths",
        area: "8,100 sq.ft",
        price: "? 18.2 Cr",
        overview:
            "A coastal estate built for light, privacy, and relaxed premium living with generous entertaining zones throughout.",
        highlights: "Sea-facing lawn, spa suite, sunset deck",
        idealFor: "Holiday home buyers, retreat seekers, premium hosting",
    },
    {
        image: heroSlide4,
        title: "Garden Manor Residences",
        description:
            "From private tours to trusted guidance, Redfinix helps you move from discovery to decision with confidence.",
        location: "Lonavala, Maharashtra",
        status: "Exclusive Access",
        badge: "Curated Collection",
        type: "Manor Home",
        beds: "5 Beds",
        baths: "5 Baths",
        area: "7,300 sq.ft",
        price: "? 12.9 Cr",
        overview:
            "A serene manor residence surrounded by landscaped greens, crafted for calm luxury, family comfort, and refined entertaining.",
        highlights: "Garden court, lounge pavilion, formal dining wing",
        idealFor: "Second-home buyers, family estates, nature-led living",
    },
];

const contentBaseClass =
    "transform-gpu transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";
const navBaseClass = "text-sm transition-colors duration-200 hover:text-[#b3b3b3]";

const Home = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(1);
    const [contentVisible, setContentVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const currentSlide = useMemo(() => heroSlides[activeIndex], [activeIndex]);

    const clearTimers = () => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const queueNextSlide = () => {
        intervalRef.current = window.setInterval(() => {
            setContentVisible(false);
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => {
                setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setContentVisible(true);
                    });
                });
            }, CONTENT_FADE_DELAY);
        }, SLIDE_DURATION);
    };

    const changeSlide = (nextIndex) => {
        if (nextIndex === activeIndex) return;
        setContentVisible(false);
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            setActiveIndex(nextIndex);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setContentVisible(true);
                });
            });
        }, CONTENT_FADE_DELAY);
    };

    useEffect(() => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
        }
        queueNextSlide();
        return () => clearTimers();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isModalOpen]);

    const renderNavItem = (link) => {
        if (link.to) {
            const isActive = location.pathname === link.to;
            return (
                <NavLink
                    key={link.label}
                    to={link.to}
                    className={`${navBaseClass} ${isActive ? "font-semibold text-white" : "text-white/80"}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    {link.label}
                </NavLink>
            );
        }

        return (
            <a key={link.label} href={link.href} className={`${navBaseClass} text-white/80`} onClick={() => setIsMenuOpen(false)}>
                {link.label}
            </a>
        );
    };

    return (
        <>
            <style>
                {`
                    @keyframes heroZoom {
                        from { transform: scale(1); }
                        to { transform: scale(1.08); }
                    }
                `}
            </style>

            <section className="relative h-screen overflow-hidden bg-black text-white">
                <div className="absolute inset-0 overflow-hidden">
                    {heroSlides.map((slide, index) => (
                        <img
                            key={slide.title}
                            src={slide.image}
                            alt={slide.title}
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1500ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
                                index === activeIndex ? "opacity-[0.92]" : "opacity-0"
                            }`}
                            style={{ animation: index === activeIndex ? `heroZoom ${SLIDE_DURATION}ms ease-out forwards` : "none" }}
                        />
                    ))}
                    <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.6)_15%,rgba(0,0,0,0.36)_40%,rgba(0,0,0,0.14)_66%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.08)_55%,rgba(0,0,0,0.62)_100%)]" />
                </div>

                <header className="relative z-20 px-4 pt-4 sm:px-8 sm:pt-5 lg:px-16 lg:pt-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-5 lg:gap-8">
                            <img src={redFinixLogo} alt="Redfinix" className="w-28 sm:w-32 lg:w-36" />
                            <nav className="hidden lg:flex lg:items-center lg:gap-7 xl:gap-8">
                                {navLinks.map(renderNavItem)}
                            </nav>
                        </div>

                        <div className="hidden lg:flex lg:items-center lg:gap-5">
                            <button type="button" className="text-white transition hover:text-[#b3b3b3]" aria-label="Search">
                                <Search className="h-5 w-5" strokeWidth={2.2} />
                            </button>
                            <div className="flex items-center gap-2">
                                <img src={profilePhotoRed} alt="Profile" className="h-8 w-8 rounded object-cover" />
                                <ChevronDown className="h-4 w-4 text-white" strokeWidth={2.2} />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 lg:hidden">
                            <button type="button" className="text-white transition hover:text-[#b3b3b3]" aria-label="Search">
                                <Search className="h-5 w-5" strokeWidth={2.2} />
                            </button>
                            <img src={profilePhotoRed} alt="Profile" className="h-8 w-8 rounded object-cover" />
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((currentState) => !currentState)}
                                className="text-white transition hover:text-[#b3b3b3]"
                                aria-label="Toggle navigation"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" strokeWidth={2.2} /> : <Menu className="h-6 w-6" strokeWidth={2.2} />}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="mt-4 rounded bg-black/85 p-4 backdrop-blur-md lg:hidden">
                            <nav className="flex flex-col gap-3">{navLinks.map(renderNavItem)}</nav>
                        </div>
                    )}
                </header>

                <div className="relative z-10 flex h-full items-center px-4 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-16 lg:pb-28 lg:pt-36">
                    <div className="max-w-xl lg:max-w-2xl">
                        <h1 className={`${contentBaseClass} mt-4 max-w-3xl text-4xl font-bold leading-[0.95] text-white sm:text-5xl lg:text-6xl xl:text-7xl ${contentVisible ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"}`}>
                            {currentSlide.title}
                        </h1>
                        <p className={`${contentBaseClass} delay-200 mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8 lg:text-lg ${contentVisible ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"}`}>
                            {currentSlide.description}
                        </p>
                        <p className={`${contentBaseClass} delay-300 mt-3 text-sm font-medium text-white/75 sm:text-base ${contentVisible ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"}`}>
                            {currentSlide.location}
                        </p>

                        <div className={`${contentBaseClass} delay-[400ms] mt-7 flex flex-wrap items-center gap-3 sm:mt-8 ${contentVisible ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"}`}>
                            <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded bg-white px-6 text-base font-semibold text-black transition hover:bg-white/85 sm:h-12 sm:px-7 sm:text-lg">
                                Schedule
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded bg-white/25 px-6 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/35 sm:h-12 sm:px-7 sm:text-lg"
                            >
                                <Info className="h-5 w-5" strokeWidth={2.3} />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 px-4 py-6 backdrop-blur-[2px] sm:px-8 lg:px-14" onClick={() => setIsModalOpen(false)}>
                    <div className="relative mx-auto flex h-[92vh] w-full flex-col rounded bg-[#181818] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:max-w-4xl lg:w-[60vw] lg:max-w-none" onClick={(event) => event.stopPropagation()}>
                        <div className="relative h-[18rem] w-full shrink-0 sm:h-[21rem] lg:h-[52%]">
                            <img src={currentSlide.image} alt={currentSlide.title} className="h-full w-full object-cover object-center" />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.24)_48%,rgba(24,24,24,1)_100%)]" />
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black sm:right-6 sm:top-6"
                                aria-label="Close details"
                            >
                                <X className="h-6 w-6" strokeWidth={2.2} />
                            </button>
                            <div className="absolute bottom-0 left-0 w-full px-6 pb-5 sm:px-10 sm:pb-6 lg:px-12 lg:pb-8">
                                <h2 className="max-w-4xl text-3xl font-semibold leading-none text-white sm:text-4xl lg:text-[2.65rem]">
                                    {currentSlide.title}
                                </h2>
                                <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5">
                                    <button type="button" className="inline-flex h-10 items-center justify-center rounded bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/85 sm:h-11 sm:px-6 sm:text-base">
                                        Schedule
                                    </button>
                                    <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 text-white transition hover:border-white sm:h-11 sm:w-11" aria-label="Info">
                                        <Info className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.1} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid flex-1 gap-6 overflow-hidden px-6 pb-7 pt-4 text-white sm:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(15rem,0.8fr)] lg:px-12">
                            <div className="min-h-0 overflow-hidden">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base">
                                    <span className="text-white/70">{currentSlide.status}</span>
                                    <span className="rounded border border-white/25 px-2 py-0.5 text-xs text-white/85 sm:text-sm">{currentSlide.badge}</span>
                                    <span className="rounded border border-white/25 px-2 py-0.5 text-xs text-white/85 sm:text-sm">{currentSlide.type}</span>
                                </div>
                                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/88 sm:text-base sm:leading-8 lg:text-[1rem]">
                                    {currentSlide.overview}
                                </p>
                            </div>

                            <div className="space-y-3 text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                                <p><span className="text-white/45">Price: </span><span className="text-white">{currentSlide.price}</span></p>
                                <p><span className="text-white/45">Location: </span><span className="text-white">{currentSlide.location}</span></p>
                                <p><span className="text-white/45">Layout: </span><span className="text-white">{currentSlide.beds}, {currentSlide.baths}</span></p>
                                <p><span className="text-white/45">Area: </span><span className="text-white">{currentSlide.area}</span></p>
                                <p><span className="text-white/45">Highlights: </span><span className="text-white">{currentSlide.highlights}</span></p>
                                <p><span className="text-white/45">Ideal For: </span><span className="text-white">{currentSlide.idealFor}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
