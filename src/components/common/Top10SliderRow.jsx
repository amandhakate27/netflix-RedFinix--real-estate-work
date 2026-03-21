import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Top10SliderRow = ({ title, slides, onSlideClick, onSlideHover, onSlideLeave }) => {
    const [sliderPage, setSliderPage] = useState(0);
    const previewRowRef = useRef(null);
    const isJumping = useRef(false);

    // Triple the slides for seamless infinite loop: [copy][original][copy]
    const loopedSlides = [...slides, ...slides, ...slides];
    const totalSets = 3;
    const setSize = slides.length;

    // Dynamic width calculation for responsive scrolling
    const getCardWidth = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth < 640) return 130;
            if (window.innerWidth < 1024) return 170;
            return 210;
        }
        return 210;
    };

    const getGap = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth < 640) return 16;   // gap-4
            if (window.innerWidth < 1024) return 24;  // gap-6
            return 32;                                  // gap-8
        }
        return 32;
    };

    // Width of one full set of slides
    const getSetWidth = () => {
        const cardWidth = getCardWidth();
        const gap = getGap();
        return setSize * cardWidth + (setSize - 1) * gap;
    };

    // Scroll to the center set on mount (no animation)
    const jumpToCenter = useCallback(() => {
        if (!previewRowRef.current) return;
        const setWidth = getSetWidth();
        previewRowRef.current.scrollLeft = setWidth;
    }, []);

    useEffect(() => {
        const timer = setTimeout(jumpToCenter, 50);
        window.addEventListener("resize", jumpToCenter);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", jumpToCenter);
        };
    }, [jumpToCenter]);

    const handleSliderScroll = useCallback(() => {
        if (!previewRowRef.current || isJumping.current) return;
        const el = previewRowRef.current;
        const { scrollLeft } = el;
        const setWidth = getSetWidth();

        // Track which page (within the original set) we're on for dots
        const posWithinMiddleSet = scrollLeft - setWidth;
        const cardWidth = getCardWidth();
        const gap = getGap();
        const pageProgress = posWithinMiddleSet / (cardWidth + gap);
        setSliderPage(Math.round(((pageProgress % setSize) + setSize) % setSize));

        // When near the end of 3rd set → silently jump back to 2nd (center) set
        if (scrollLeft >= setWidth * 2) {
            isJumping.current = true;
            el.style.scrollBehavior = "auto"; // Disable smooth for instant jump
            el.scrollLeft = scrollLeft - setWidth;
            // Re-enable smooth after a frame
            requestAnimationFrame(() => {
                el.style.scrollBehavior = "";
                isJumping.current = false;
            });
        }
        // When scrolled before start of 1st set → silently jump to 2nd set (center)
        else if (scrollLeft <= 0) {
            isJumping.current = true;
            el.style.scrollBehavior = "auto";
            el.scrollLeft = scrollLeft + setWidth;
            requestAnimationFrame(() => {
                el.style.scrollBehavior = "";
                isJumping.current = false;
            });
        }
    }, [setSize]);

    const scrollRow = (direction) => {
        if (!previewRowRef.current) return;
        const cardWidth = getCardWidth();
        const gap = getGap();
        const scrollAmount = (cardWidth + gap) * 3; // 3 cards per arrow click
        previewRowRef.current.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full relative z-10 mt-6 sm:mt-10">
            <div className="mb-2 sm:mb-4 flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-16 relative z-20">
                <h2 className="text-base font-semibold text-white sm:text-lg lg:text-[1.05rem] tracking-wide">{title}</h2>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <button
                            key={`dot-${title}-${index}`}
                            type="button"
                            onClick={() => {
                                setSliderPage(index);
                                if (previewRowRef.current) {
                                    const cardWidth = getCardWidth();
                                    const gap = getGap();
                                    const setWidth = getSetWidth();
                                    previewRowRef.current.scrollTo({
                                        left: setWidth + index * (cardWidth + gap) * 5,
                                        behavior: "smooth"
                                    });
                                }
                            }}
                            className={`h-[2px] rounded-full transition-all duration-300 ${index === Math.floor(sliderPage / 5) ? "w-8 bg-white/85" : "w-4 bg-white/20"}`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="relative group/slider">
                {/* Left arrow — always visible since it's infinite */}
                <button
                    type="button"
                    onClick={() => scrollRow("prev")}
                    className="absolute left-0 top-0 z-40 flex h-full w-10 sm:w-14 items-center justify-center bg-black/40 text-white opacity-0 transition-opacity duration-300 hover:bg-black/60 group-hover/slider:opacity-100"
                    aria-label="Previous Top 10"
                >
                    <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2} />
                </button>

                <div
                    ref={previewRowRef}
                    onScroll={handleSliderScroll}
                    className="home-preview-scroll overflow-x-auto overflow-y-hidden px-4 sm:px-8 lg:px-16 pb-4 pt-2 relative z-30"
                >
                    <div className="flex min-w-max px-0 items-end gap-4 sm:gap-6 lg:gap-8">
                        {loopedSlides.map((slideObj, loopIndex) => {
                            // The actual rank is based on position within the original set
                            const rank = (loopIndex % setSize) + 1;
                            return (
                                <button
                                    key={`top10-loop-${loopIndex}`}
                                    type="button"
                                    onClick={() => onSlideClick(slideObj)}
                                    onMouseEnter={(e) => onSlideHover && onSlideHover(slideObj, e)}
                                    onMouseLeave={() => onSlideLeave && onSlideLeave()}
                                    className="group relative flex shrink-0 cursor-pointer items-end justify-end transition-transform duration-300"
                                    style={{ width: getCardWidth() + "px" }}
                                >
                                    {/* Wrapper holding both the number and the poster */}
                                    <div
                                        className="relative z-10 w-[70%] sm:w-[65%] lg:w-[60%] flex items-end"
                                        style={{ height: "clamp(140px, 20vw, 200px)" }}
                                    >
                                        {/* Netflix-style Number */}
                                        <span
                                            className={`pointer-events-none absolute top-1/2 -translate-y-[45%] lg:-translate-y-[48%] -z-10 font-black leading-none text-black select-none ${
                                                rank === 10
                                                    ? "right-[44%] sm:right-[50%] lg:right-[58%]"
                                                    : "right-[74%] sm:right-[78%] lg:right-[82%]"
                                            }`}
                                            style={{
                                                fontSize: rank === 10 ? "clamp(120px, 17vw, 175px)" : "clamp(140px, 20vw, 200px)",
                                                WebkitTextStroke: "4px #595959",
                                                lineHeight: "0.75",
                                                letterSpacing: rank === 10 ? "-0.12em" : "-0.05em",
                                            }}
                                        >
                                            {rank}
                                        </span>

                                        {/* Poster Image */}
                                        <div className="relative z-10 w-full pb-[150%] overflow-hidden rounded-md shadow-xl bg-[#141414]">
                                            <img
                                                src={slideObj.image}
                                                alt={slideObj.title || `Top ${rank} Property`}
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                            />
                                            {/* Trending Badge */}
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-[2px] bg-[#E50914] px-2 py-[2px] text-[8px] sm:text-[10px] font-bold text-white whitespace-nowrap tracking-wide z-10 uppercase">
                                                Trending
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right arrow — always visible since it's infinite */}
                <button
                    type="button"
                    onClick={() => scrollRow("next")}
                    className="absolute right-0 top-0 z-40 flex h-full w-10 sm:w-14 items-center justify-center bg-black/40 text-white opacity-0 transition-opacity duration-300 hover:bg-black/60 group-hover/slider:opacity-100"
                    aria-label="Next Top 10"
                >
                    <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2} />
                </button>
            </div>
        </div>
    );
};

export default Top10SliderRow;
