import React, { useEffect, useState, useRef } from "react";
import { Calendar, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

const HoverPropertyCard = ({ slide, rect, onClose, onClick }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        // Use a small timeout to ensure the initial layout is painted
        // before triggering the CSS transition to make it smooth.
        const timer = setTimeout(() => setIsAnimating(true), 30);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        if (isClosing) return;
        setIsClosing(true);
        setIsAnimating(false); // Triggers scale-down transition
        // Wait for the transition to finish before unmounting
        setTimeout(() => onClose(), 350); 
    };

    if (!rect || !slide) return null;

    // Expand mostly from the center, but adjust if too close to screen edges
    const originX = rect.left < window.innerWidth * 0.15 ? "left" : rect.right > window.innerWidth * 0.85 ? "right" : "center";

    return (
        <div
            ref={cardRef}
            className={`fixed z-[100] cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isAnimating ? "scale-[1.35] opacity-100 shadow-[0_15px_50px_rgba(0,0,0,0.9)]" : "scale-100 opacity-0"
            }`}
            style={{
                top: rect.top - (isAnimating ? 30 : 0),
                left: rect.left,
                width: rect.width,
                transformOrigin: `${originX} center`,
            }}
            onMouseLeave={handleClose}
            onClick={() => { handleClose(); onClick(slide); }}
        >
            <div className="flex w-full flex-col overflow-hidden rounded-md bg-[#141414]">
                {/* Image Section */}
                <div className="relative w-full" style={{ height: rect.height }}>
                    <img src={slide.image || slide} alt={slide.title || "Luxury Property"} className="absolute inset-0 h-full w-full object-cover" />
                    {/* Shadow at bottom of image for blending with dark background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-90" />
                    <h3 className="absolute bottom-2 left-3 text-[0.85rem] font-bold text-white tracking-wide" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}>
                        {slide.title || "Luxury Property"}
                    </h3>
                    {/* "TOP 10" badge in the top-right corner, only for Top 10 cards */}
                    {slide.badge && slide.badge.startsWith("Top") && (
                        <div className="absolute right-0 top-0 flex flex-col items-center justify-center bg-[#E50914] px-1.5 py-1 rounded-bl-md shadow-lg" style={{ minWidth: "36px" }}>
                            <span className="text-[0.45rem] font-black text-white uppercase tracking-widest leading-tight">TOP</span>
                            <span className="text-[1.1rem] font-black text-white leading-tight">{slide.badge.replace("Top ", "")}</span>
                        </div>
                    )}
                </div>

                {/* Content Section - Hidden initially, reveals during scaling */}
                <div 
                    className={`flex flex-col px-3 pb-3 transition-opacity duration-[400ms] ${isAnimating ? "opacity-100" : "opacity-0"}`}
                >
                    {/* Action Buttons */}
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <button className="flex h-6 sm:h-7 items-center justify-center gap-1 rounded bg-white pl-2 pr-2.5 text-[0.6rem] sm:text-[0.65rem] font-bold text-black transition hover:bg-white/80"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                                Schedule
                            </button>
                            <button className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/40 bg-[#2b2b2b]/60 text-white transition hover:border-white hover:bg-white/20"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                            </button>
                            <button className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/40 bg-[#2b2b2b]/60 text-white transition hover:border-white hover:bg-white/20"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ThumbsUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                            </button>
                        </div>
                        <button className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/40 bg-[#2b2b2b]/60 text-white transition hover:border-white hover:bg-white/20"
                            onClick={(e) => { e.stopPropagation(); onClick(slide); }}
                        >
                            <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Metadata Row */}
                    <div className="mt-2.5 flex items-center gap-2 text-[0.55rem] sm:text-[0.6rem] font-bold text-white">
                        <span className="text-[#46d369]">{slide.status || "98% Match"}</span>
                        {slide.beds && <span>{slide.beds} Beds, {slide.baths} Baths</span>}
                        {slide.price && <span className="text-white/70">{slide.price}</span>}
                    </div>

                    {/* Tags Row */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.55rem] sm:text-[0.6rem] text-white/80">
                        {slide.location ? (
                            <>
                                <span>{slide.location}</span>
                                <span className="h-[3px] w-[3px] rounded-full bg-white/40" />
                                <span>{slide.type || "Luxury"}</span>
                                {slide.area && <>
                                    <span className="h-[3px] w-[3px] rounded-full bg-white/40" />
                                    <span>{slide.area}</span>
                                </>}
                            </>
                        ) : (
                            <>
                                <span>Luxury</span>
                                <span className="h-[3px] w-[3px] rounded-full bg-white/40" />
                                <span>Spacious</span>
                                <span className="h-[3px] w-[3px] rounded-full bg-white/40" />
                                <span>Premium</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

HoverPropertyCard.propTypes = {
    slide: PropTypes.any.isRequired,
    rect: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default HoverPropertyCard;
