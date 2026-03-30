import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Info, Menu, Search, X, Heart, Calendar, Plus } from "lucide-react";
import HoverPropertyCard from "../components/common/HoverPropertyCard";
import PreviewSliderRow from "../components/common/PreviewSliderRow";
import Top10SliderRow from "../components/common/Top10SliderRow";
import Footer from "../components/common/Footer";
import redFinixLogo from "../assets/images/redFinixLogo.png";
import profilePhotoRed from "../assets/images/profilePhotoRed.jpg";
import { heroSlides, getTop10Slides, getShuffledSlides } from "../data/mockData";

const navLinks = [
    { label: "Home", to: "/home" },
    { label: "Properties", to: "/properties" },
    { label: "Schedule", to: "/schedule" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];
const SLIDE_DURATION = 7000;
const CONTENT_FADE_DELAY = 600;
const PREVIEW_CARD_WIDTH = 217.94;
const PREVIEW_CARD_HEIGHT = 122.71;
const PREVIEW_CARD_GAP = 6;

const contentBaseClass =
    "transform-gpu transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";
const navBaseClass = "text-sm transition-colors duration-200 hover:text-[#b3b3b3]";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(1);
    const [contentVisible, setContentVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const moreLikeThisSlides = useMemo(() => selectedSlide ? getShuffledSlides().slice(0, 9) : [], [selectedSlide]);

    const [randomizedSlides] = useState(getShuffledSlides);
    const [trendingSlides] = useState(getShuffledSlides);
    const [slider3Slides] = useState(getShuffledSlides);
    const [slider4Slides] = useState(getShuffledSlides);
    const [slider5Slides] = useState(getShuffledSlides);
    const [slider6Slides] = useState(getShuffledSlides);
    const [slider7Slides] = useState(getShuffledSlides);
    const [slider8Slides] = useState(getShuffledSlides);
    const [top10Slides] = useState(getTop10Slides);
    const [top10Slides2] = useState(getTop10Slides);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRefDesktop = useRef(null);
    const searchRefMobile = useRef(null);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const hoverTimerRef = useRef(null);

    useEffect(() => {
        const handleWindowScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        // Initial checks
        handleWindowScroll();

        window.addEventListener("scroll", handleWindowScroll);
        return () => window.removeEventListener("scroll", handleWindowScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const deskNode = searchRefDesktop.current;
            const mobNode = searchRefMobile.current;
            if (
                (!deskNode || !deskNode.contains(event.target)) &&
                (!mobNode || !mobNode.contains(event.target))
            ) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentSlide = useMemo(() => heroSlides[activeIndex], [activeIndex]);

    const openShowProperty = (property) => {
        if (!property) return;
        setSelectedSlide(null);
        navigate("/show-property", { state: { property, from: location.pathname } });
    };

    const handleCardMouseEnter = (slideObj, event) => {
        const target = event.currentTarget;
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

        hoverTimerRef.current = setTimeout(() => {
            const rect = target.getBoundingClientRect();
            setHoveredCard({ slide: slideObj, rect });
        }, 750);
    };

    const handleCardMouseLeave = () => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
    };

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
                        scroll-behavior: smooth;
                        -webkit-overflow-scrolling: touch;
                    }

                    .home-preview-scroll::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>

            <section className="relative h-screen overflow-x-clip bg-black text-white">
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
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.4)_55%,rgba(20,20,20,1)_100%)]" />
                </div>

                <header
                    className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 sm:px-8 lg:px-16 ${isScrolled ? "bg-[#141414] px-4 py-3 shadow-md" : "bg-transparent px-4 pt-4 sm:pt-5 lg:pt-6"}`}
                >
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
                            <div
                                ref={searchRefDesktop}
                                className={`flex items-center transition-all duration-300 ease-[ease] ${isSearchOpen ? "w-[260px] border border-white bg-black/80 px-2 py-1.5" : "w-[26px] border border-transparent bg-transparent"
                                    }`}
                                style={{ overflow: "hidden" }}
                            >
                                <button
                                    type="button"
                                    className="shrink-0 text-white transition hover:text-[#b3b3b3]"
                                    aria-label="Search"
                                    onClick={() => setIsSearchOpen(true)}
                                >
                                    <Search className="h-5 w-5" strokeWidth={2.2} />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Properties, locations, builders"
                                    className={`bg-transparent pb-0 pl-2.5 pt-0.5 text-[0.85rem] text-white placeholder:text-white/60 focus:outline-none transition-opacity duration-300 ${isSearchOpen ? "opacity-100 w-full" : "opacity-0 w-0"
                                        }`}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={profilePhotoRed} alt="Profile" className="h-8 w-8 rounded object-cover" />
                                <ChevronDown className="h-4 w-4 text-white" strokeWidth={2.2} />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 lg:hidden">
                            <div
                                ref={searchRefMobile}
                                className={`hidden sm:flex items-center transition-all duration-300 ease-[ease] ${isSearchOpen ? "w-[220px] border border-white bg-black/80 px-2 py-1.5" : "w-[26px] border border-transparent bg-transparent"
                                    }`}
                                style={{ overflow: "hidden" }}
                            >
                                <button
                                    type="button"
                                    className="shrink-0 text-white transition hover:text-[#b3b3b3]"
                                    aria-label="Search"
                                    onClick={() => setIsSearchOpen(true)}
                                >
                                    <Search className="h-5 w-5" strokeWidth={2.2} />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Properties, locations, builders"
                                    className={`bg-transparent pb-0 pl-2 pt-0.5 text-[0.85rem] text-white placeholder:text-white/60 focus:outline-none transition-opacity duration-300 ${isSearchOpen ? "opacity-100 w-full" : "opacity-0 w-0"
                                        }`}
                                />
                            </div>
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

                <div className="relative z-10 flex h-full items-center px-4 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-16 lg:pb-28 lg:pt-24">
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
                                        case 4: return "Glass Pavilion";
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

                <div className="absolute bottom-0 left-0 right-0 z-30 w-full translate-y-1/4">
                    <PreviewSliderRow
                        title="Gems for You"
                        slides={randomizedSlides}
                        onSlideClick={setSelectedSlide}
                        onSlideHover={handleCardMouseEnter}
                        onSlideLeave={handleCardMouseLeave}
                    />
                </div>
            </section>

            <section className="relative bg-[#141414] px-0 pb-10 pt-16 text-white sm:pt-20 lg:pt-28 space-y-10 sm:space-y-16">
                <PreviewSliderRow
                    title="Trending Searches"
                    slides={trendingSlides}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
                <Top10SliderRow
                    title="Top Trending Properties"
                    slides={top10Slides}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
                <PreviewSliderRow
                    title="New Arrivals"
                    slides={slider3Slides}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
                <Top10SliderRow
                    title="Top Trending Luxury Homes"
                    slides={top10Slides2}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
                <PreviewSliderRow
                    title="Because You Viewed Luxury Homes"
                    slides={slider4Slides}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
                <PreviewSliderRow
                    title="Editor's Picks"
                    slides={slider5Slides}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
                <PreviewSliderRow
                    title="Premium Villas"
                    slides={slider6Slides}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
                <PreviewSliderRow
                    title="Waterfront Properties"
                    slides={slider7Slides}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
                <PreviewSliderRow
                    title="High ROI Investments"
                    slides={slider8Slides}
                    onSlideClick={setSelectedSlide}
                    onSlideHover={handleCardMouseEnter}
                    onSlideLeave={handleCardMouseLeave}
                />
            </section>

            {selectedSlide && (
                <div 
                    id="property-modal-overlay"
                    className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-[2px] sm:px-8 lg:px-14" 
                    onClick={() => setSelectedSlide(null)}
                >
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
                                    <button type="button" onClick={() => openShowProperty(selectedSlide)} className="inline-flex items-center justify-center rounded bg-white text-[0.85rem] font-semibold text-black transition hover:bg-white/85" style={{ height: "1.7rem", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "10px", paddingRight: "10px", minHeight: "unset", lineHeight: "1.1" }}>
                                        View
                                    </button>
                                    <div className="relative flex flex-col items-center">
                                        <button type="button" className="peer inline-flex items-center justify-center rounded-full border border-white/45 text-white transition hover:border-white" aria-label="Favourite" style={{ height: "1.7rem", width: "1.7rem", paddingTop: "1px", paddingBottom: "1px", minHeight: "unset", lineHeight: "1.1" }}>
                                            <Heart className="h-3 w-3" strokeWidth={1.6} />
                                        </button>
                                        <span className="absolute -top-9 z-10 whitespace-nowrap rounded bg-white px-2.5 py-1 text-[11px] font-bold text-black opacity-0 transition-opacity peer-hover:opacity-100 pointer-events-none shadow-md">Favourite</span>
                                    </div>
                                    <div className="relative flex flex-col items-center">
                                        <button type="button" className="peer inline-flex items-center justify-center rounded-full border border-white/45 text-white transition hover:border-white" aria-label="Schedule" style={{ height: "1.7rem", width: "1.7rem", paddingTop: "1px", paddingBottom: "1px", minHeight: "unset", lineHeight: "1.1" }}>
                                            <Calendar className="h-3 w-3" strokeWidth={1.6} />
                                        </button>
                                        <span className="absolute -top-9 z-10 whitespace-nowrap rounded bg-white px-2.5 py-1 text-[11px] font-bold text-black opacity-0 transition-opacity peer-hover:opacity-100 pointer-events-none shadow-md">Schedule</span>
                                    </div>
                                    <div className="relative flex flex-col items-center">
                                        <button type="button" className="peer inline-flex items-center justify-center rounded-full border border-white/45 text-white transition hover:border-white" aria-label="Wishlist" style={{ height: "1.7rem", width: "1.7rem", paddingTop: "1px", paddingBottom: "1px", minHeight: "unset", lineHeight: "1.1" }}>
                                            <Plus className="h-4 w-4" strokeWidth={1.6} />
                                        </button>
                                        <span className="absolute -top-9 z-10 whitespace-nowrap rounded bg-white px-2.5 py-1 text-[11px] font-bold text-black opacity-0 transition-opacity peer-hover:opacity-100 pointer-events-none shadow-md">Wishlist</span>
                                    </div>
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

                        <div className="px-5 pb-8 sm:px-8 lg:px-10">
                            <h3 className="mb-4 text-xl font-semibold text-white">More Like This</h3>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-3">
                                {moreLikeThisSlides.map((slide, idx) => (
                                    <div 
                                        key={idx} 
                                        className="group relative cursor-pointer overflow-hidden rounded bg-[#2f2f2f] transition hover:bg-[#333]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedSlide(slide);
                                            document.getElementById("property-modal-overlay")?.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                    >
                                        <div className="relative aspect-video w-full">
                                            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                                            <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white shadow-sm">{slide.type}</span>
                                        </div>
                                        <div className="p-3">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-sm font-semibold text-white">{slide.price}</span>
                                                <div className="relative flex flex-col items-center">
                                                    <button type="button" className="peer flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-white hover:bg-white/10">
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                    <span className="absolute -top-10 z-10 whitespace-nowrap rounded bg-white px-2.5 py-1 text-[11px] font-bold text-black opacity-0 transition-opacity peer-hover:opacity-100 pointer-events-none shadow-md">Add to list</span>
                                                </div>
                                            </div>
                                            <p className="line-clamp-3 text-xs text-[#d2d2d2]">{slide.overview}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {hoveredCard && (
                <HoverPropertyCard
                    slide={hoveredCard.slide}
                    rect={hoveredCard.rect}
                    onClose={() => setHoveredCard(null)}
                    onClick={(slide) => {
                        setHoveredCard(null);
                        setSelectedSlide(slide);
                    }}
                />
            )}
            <Footer />
        </>
    );
};

export default Home;






