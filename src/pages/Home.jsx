import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Info, Menu, Search, X } from "lucide-react";
import redFinixLogo from "../assets/images/redFinixLogo.png";
import profilePhotoRed from "../assets/images/profilePhotoRed.jpg";
import heroSlide1 from "../assets/images/HeroSlide1.png";
import heroSlide2 from "../assets/images/HeroSlide2.avif";
import heroSlide3 from "../assets/images/HeroSlide3.avif";
import heroSlide4 from "../assets/images/HeroSlide4.avif";
import villa1Slide1 from "../assets/images/villa1Slide1.png";
import villa2Slide1 from "../assets/images/villa2Slide1.png";
import villa3Slide1 from "../assets/images/villa3Slide1.png";
import villa4Slide1 from "../assets/images/villa4Slide1.png";
import apartment1Slide1 from "../assets/images/apartment1Slide1.png";
import apartment2Slide1 from "../assets/images/apartment2Slide1.png";
import apartment3Slide1 from "../assets/images/apartment3Slide1.png";
import apartment4Slide1 from "../assets/images/apartment4Slide1.png";
import townhouse1Slide1 from "../assets/images/townhouse1Slide1.png";
import townhouse2Slide1 from "../assets/images/townhouse2Slide1.png";
import townhouse3Slide1 from "../assets/images/townhouse3Slide1.png";
import townhouse4Slide1 from "../assets/images/townhouse4Slide1.png";
import townhouse5Slide1 from "../assets/images/townhouse5Slide1.png";
import penthouse1Slide1 from "../assets/images/penthouse1Slide1.png";
import penthouse2Slide1 from "../assets/images/penthouse2Slide1.png";
import penthouse3Slide1 from "../assets/images/penthouse3Slide1.png";
import penthouse4Slide1 from "../assets/images/penthouse4Slide1.png";

const navLinks = [
    { label: "Home", to: "/home" },
    { label: "Properties", href: "#" },
    { label: "Schedule", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
];
const SLIDE_DURATION = 7000;
const CONTENT_FADE_DELAY = 600;
const PREVIEW_CARD_WIDTH = 217.94;
const PREVIEW_CARD_HEIGHT = 122.71;
const PREVIEW_CARD_GAP = 6;

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
        price: "?14.5 Cr",
        overview:
            "A private luxury villa with open glass interiors, resort-style outdoor spaces, and a layout designed for elegant family living.",
        highlights: "Infinity pool, skyline terrace, designer kitchen",
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
        price: "?9.8 Cr",
        overview:
            "A panoramic penthouse residence with double-height living, premium finishes, and a rooftop-ready entertaining experience.",
        highlights: "Private deck, skyline views, bespoke finishes",
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
        price: "?18.2 Cr",
        overview:
            "A coastal estate built for light, privacy, and relaxed premium living with generous entertaining zones throughout.",
        highlights: "Sea-facing lawn, spa suite, sunset deck",
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
        price: "?12.9 Cr",
        overview:
            "A serene manor residence surrounded by landscaped greens, crafted for calm luxury, family comfort, and refined entertaining.",
        highlights: "Garden court, lounge pavilion, formal dining wing",
    },
];

const previewSlides = [
    villa1Slide1,
    penthouse2Slide1,
    apartment3Slide1,
    townhouse1Slide1,
    villa2Slide1,
    penthouse4Slide1,
    apartment1Slide1,
    townhouse4Slide1,
    villa4Slide1,
    apartment4Slide1,
    penthouse1Slide1,
    townhouse2Slide1,
    villa3Slide1,
    penthouse3Slide1,
    apartment2Slide1,
    townhouse5Slide1,
    townhouse3Slide1,
];

const contentBaseClass =
    "transform-gpu transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";
const navBaseClass = "text-sm transition-colors duration-200 hover:text-[#b3b3b3]";

const Home = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(1);
    const [contentVisible, setContentVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);
    const previewRowRef = useRef(null);

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
        document.body.style.overflow = selectedSlide ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedSlide]);

    const scrollPreviewRow = (direction) => {
        if (!previewRowRef.current) return;
        const scrollAmount = (PREVIEW_CARD_WIDTH * 4) + (PREVIEW_CARD_GAP * 4);
        previewRowRef.current.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

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

                    .home-preview-scroll {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }

                    .home-preview-scroll::-webkit-scrollbar {
                        display: none;
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
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1500ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${index === activeIndex ? "opacity-[0.92]" : "opacity-0"
                                }`}
                            style={{ animation: index === activeIndex ? `heroZoom ${SLIDE_DURATION}ms ease-out forwards` : "none" }}
                        />
                    ))}
                    <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.6)_15%,rgba(0,0,0,0.36)_40%,rgba(0,0,0,0.14)_66%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.08)_55%,rgba(0,0,0,0.62)_100%)]" />
                </div>

                <header className="relative z-20 px-4 pt-2 sm:px-8 sm:pt-3 lg:px-16 lg:pt-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-2 lg:gap-8">
                            <img src={redFinixLogo} alt="Redfinix" className="w-28 sm:w-32 lg:w-36" />
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((currentState) => !currentState)}
                                className="ml-0 flex items-center gap-1 rounded bg-transparent px-1 py-1 text-base font-normal text-white focus:border-0 focus:outline-none focus:ring-0 lg:hidden"
                                aria-label="Browse navigation"
                            >
                                Browse
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} strokeWidth={2.2} />
                            </button>
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
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="fixed left-0 top-0 z-40 h-[calc(5*3.5rem+6rem)] w-1/2 max-w-xs rounded-r-lg border-r border-white/10 bg-black/70 shadow-2xl backdrop-blur-[6px] lg:hidden">
                            <nav className="flex flex-col items-center justify-center gap-6 pt-24 text-lg font-medium">
                                {navLinks.map(renderNavItem)}
                            </nav>
                        </div>
                    )}
                </header>

                <div className="relative z-10 flex h-full items-center px-4 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-12 lg:px-16 lg:pb-28 lg:pt-16">
                    <div className="max-w-xl lg:max-w-2xl">
                        <div className="mt-4 flex w-full flex-row flex-wrap items-end gap-2">
                            <h1
                                className={`${contentBaseClass} break-words text-3xl font-bold leading-[0.95] text-white sm:text-4xl lg:text-5xl xl:text-6xl ${contentVisible ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"}`}
                            >
                                {(() => {
                                    switch (activeIndex) {
                                        case 0: return "Luxury Villa";
                                        case 1: return "City Penthouse";
                                        case 2: return "Beach Retreat";
                                        case 3: return "Green Manor";
                                        default: return currentSlide.title;
                                    }
                                })()}
                            </h1>
                            <span className="mb-1 ml-2 text-base font-medium text-white/75">{currentSlide.location}</span>
                        </div>
                        <p
                            className={`${contentBaseClass} delay-200 mt-5 max-w-full break-words text-sm font-normal leading-snug text-white sm:max-w-xl sm:text-base ${contentVisible ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"}`}
                            style={{
                                fontSize: "1rem",
                                lineHeight: "1.5",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                whiteSpace: "normal",
                            }}
                        >
                            {currentSlide.description}
                        </p>

                        <div className={`${contentBaseClass} delay-[400ms] mt-7 flex flex-wrap items-center gap-3 sm:mt-8 ${contentVisible ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"}`}>
                            <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded bg-white px-6 text-base font-semibold text-black transition hover:bg-white/85 sm:h-12 sm:px-7 sm:text-lg" style={{ paddingTop: "6px", paddingBottom: "6px" }}>
                                Schedule
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedSlide(currentSlide)}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded bg-white/25 px-6 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/35 sm:h-12 sm:px-7 sm:text-lg"
                                style={{ paddingTop: "6px", paddingBottom: "6px" }}
                            >
                                <Info className="h-5 w-5" strokeWidth={2.3} />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-[#141414] px-0 pb-10 pt-10 text-white sm:pt-12 lg:pt-14">
                <div className="px-4 sm:px-8 lg:px-16">
                    <h2 className="mb-3 text-2xl font-bold text-white sm:text-[2rem]">Gems for You</h2>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => scrollPreviewRow("prev")}
                        className="absolute left-0 top-1/2 z-20 flex h-[122.71px] w-14 -translate-y-1/2 items-center justify-center bg-black/35 text-white transition hover:bg-black/55"
                        aria-label="Previous previews"
                    >
                        <ChevronLeft className="h-10 w-10" strokeWidth={1.8} />
                    </button>

                    <div
                        ref={previewRowRef}
                        className="home-preview-scroll overflow-x-auto overflow-y-hidden px-0"
                    >
                        <div className="flex min-w-max gap-[6px] px-0">
                            {previewSlides.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    className="shrink-0 overflow-hidden rounded-sm transition-transform duration-300"
                                    style={{ width: `${PREVIEW_CARD_WIDTH}px`, height: `${PREVIEW_CARD_HEIGHT}px` }}
                                >
                                    <img src={image} alt={`Property preview ${index + 1}`} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollPreviewRow("next")}
                        className="absolute right-0 top-1/2 z-20 flex h-[122.71px] w-14 -translate-y-1/2 items-center justify-center bg-black/35 text-white transition hover:bg-black/55"
                        aria-label="Next previews"
                    >
                        <ChevronRight className="h-10 w-10" strokeWidth={1.8} />
                    </button>
                </div>
            </section>

            {selectedSlide && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-[2px] sm:px-8 lg:px-14" onClick={() => setSelectedSlide(null)}>
                    <div
                        className="relative mx-auto my-4 w-full rounded bg-[#181818] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:max-w-4xl lg:w-[60vw] lg:max-w-none"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="relative h-[15rem] w-full overflow-hidden rounded-t sm:h-[18rem] lg:h-[20rem]">
                            <img src={selectedSlide.image} alt={selectedSlide.title} className="h-full w-full object-cover object-center" />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.24)_48%,rgba(24,24,24,1)_100%)]" />
                            <button
                                type="button"
                                onClick={() => setSelectedSlide(null)}
                                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black sm:right-5 sm:top-5"
                                aria-label="Close details"
                            >
                                <X className="h-5 w-5" strokeWidth={2.2} />
                            </button>
                            <div className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-8 sm:pb-6 lg:px-10">
                                <h2 className="max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[1.7rem]">
                                    {selectedSlide.title}
                                </h2>
                                <div className="mt-3 flex items-center gap-2">
                                    <button type="button" className="inline-flex items-center justify-center rounded bg-white text-[0.85rem] font-semibold text-black transition hover:bg-white/85" style={{ height: "1.7rem", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "10px", paddingRight: "10px", minHeight: "unset", lineHeight: "1.1" }}>
                                        Schedule
                                    </button>
                                    <button type="button" className="inline-flex items-center justify-center rounded-full border border-white/45 text-white transition hover:border-white" aria-label="Info" style={{ height: "1.7rem", width: "1.7rem", paddingTop: "1px", paddingBottom: "1px", minHeight: "unset", lineHeight: "1.1" }}>
                                        <Info className="h-3 w-3" strokeWidth={1.6} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 px-5 pb-6 pt-4 text-[0.92rem] text-white/78 sm:px-8 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.78fr)] lg:px-10 lg:text-sm">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2 text-xs text-white/85 sm:text-sm">
                                    <span className="font-medium text-white">{selectedSlide.status}</span>
                                    <span className="rounded border border-white/20 px-2 py-0.5">{selectedSlide.badge}</span>
                                    <span className="rounded border border-white/20 px-2 py-0.5">{selectedSlide.type}</span>
                                </div>
                                <p className="max-w-2xl text-sm leading-6 text-white/88 sm:text-[0.95rem] sm:leading-7">
                                    {selectedSlide.overview}
                                </p>
                            </div>

                            <div className="space-y-2.5 text-sm leading-6 text-white/78 sm:text-[0.95rem] sm:leading-7">
                                <p><span className="text-white/45">Price: </span><span className="text-white">{selectedSlide.price}</span></p>
                                <p><span className="text-white/45">Location: </span><span className="text-white">{selectedSlide.location}</span></p>
                                <p><span className="text-white/45">Layout: </span><span className="text-white">{selectedSlide.beds}, {selectedSlide.baths}</span></p>
                                <p><span className="text-white/45">Area: </span><span className="text-white">{selectedSlide.area}</span></p>
                                <p><span className="text-white/45">Highlights: </span><span className="text-white">{selectedSlide.highlights}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
