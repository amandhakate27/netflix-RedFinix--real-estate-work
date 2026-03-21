import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Matches sizing from Home.jsx
const PREVIEW_CARD_WIDTH = 217.94;
const PREVIEW_CARD_HEIGHT = 122.71;
const PREVIEW_CARD_GAP = 6;

const PreviewSliderRow = ({ title, slides, onSlideClick, onSlideHover, onSlideLeave }) => {
    const [sliderPage, setSliderPage] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const previewRowRef = useRef(null);

    const handleSliderScroll = () => {
        if (!previewRowRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = previewRowRef.current;
        const pageWidth = (PREVIEW_CARD_WIDTH * 4) + (PREVIEW_CARD_GAP * 4);
        const newPage = Math.round(scrollLeft / pageWidth);
        setSliderPage((prev) => (prev !== newPage ? newPage : prev));
        setCanScrollLeft(scrollLeft > 0);
        // Slightly offset to avoid floating point bugs
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    };

    const scrollRow = (direction) => {
        if (!previewRowRef.current) return;
        const scrollAmount = (PREVIEW_CARD_WIDTH * 4) + (PREVIEW_CARD_GAP * 4);
        previewRowRef.current.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const initScrollCheck = setTimeout(handleSliderScroll, 100);
        window.addEventListener("resize", handleSliderScroll);
        return () => {
            clearTimeout(initScrollCheck);
            window.removeEventListener("resize", handleSliderScroll);
        };
    }, []);

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-16">
                <h2 className="text-lg font-semibold text-white sm:text-xl lg:text-[1.05rem] tracking-wide">{title}</h2>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    {Array.from({ length: Math.ceil(slides.length / 4) }).map((_, index) => (
                        <button
                            key={`dot-${title}-${index}`}
                            type="button"
                            onClick={() => {
                                setSliderPage(index);
                                if (previewRowRef.current) {
                                    const pageWidth = (PREVIEW_CARD_WIDTH * 4) + (PREVIEW_CARD_GAP * 4);
                                    previewRowRef.current.scrollTo({
                                        left: index * pageWidth,
                                        behavior: "smooth"
                                    });
                                }
                            }}
                            className={`h-[2px] rounded-full transition-all duration-300 ${index === sliderPage ? "w-8 bg-white/85" : "w-6 bg-white/20"}`}
                            aria-label={`Go to slider page ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="relative">
                {canScrollLeft && (
                    <button
                        type="button"
                        onClick={() => scrollRow("prev")}
                        className="absolute left-0 top-1/2 z-20 flex h-[122.71px] w-10 -translate-y-1/2 items-center justify-center bg-black/15 text-white transition hover:bg-black/30"
                        aria-label="Previous previews"
                    >
                        <ChevronLeft className="h-8 w-8" strokeWidth={1.8} />
                    </button>
                )}

                <div
                    ref={previewRowRef}
                    onScroll={handleSliderScroll}
                    className="home-preview-scroll overflow-x-auto overflow-y-hidden px-4 sm:px-8 lg:px-16"
                >
                    <div className="flex min-w-max gap-[6px] px-0">
                        {slides.map((slideObj, index) => (
                            <button
                                key={`slide-${title}-${index}`}
                                type="button"
                                onClick={() => onSlideClick(slideObj)}
                                onMouseEnter={(e) => onSlideHover(slideObj, e)}
                                onMouseLeave={onSlideLeave}
                                className="shrink-0 cursor-pointer overflow-hidden rounded-[0.2rem] transition-transform duration-300"
                                style={{ width: `${PREVIEW_CARD_WIDTH}px`, height: `${PREVIEW_CARD_HEIGHT}px` }}
                            >
                                <img src={slideObj.image} alt={slideObj.title} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {canScrollRight && (
                    <button
                        type="button"
                        onClick={() => scrollRow("next")}
                        className="absolute right-0 top-1/2 z-20 flex h-[122.71px] w-10 -translate-y-1/2 items-center justify-center bg-black/15 text-white transition hover:bg-black/30"
                        aria-label="Next previews"
                    >
                        <ChevronRight className="h-8 w-8" strokeWidth={1.8} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PreviewSliderRow;
