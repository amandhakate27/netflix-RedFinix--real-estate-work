import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import PropertyModal from "./PropertyModal";

const TrendingSlider = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(0);
  const [sliderConfig, setSliderConfig] = useState({ cardsPerPage: 5, visibleSlots: 5.5, gap: 28 });
  const [cardWidth, setCardWidth] = useState(150);
  const [viewportWidth, setViewportWidth] = useState(0);
  const viewportRef = useRef(null);

  useEffect(() => {
    const updateSliderConfig = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setSliderConfig({ cardsPerPage: 2, visibleSlots: 2.5, gap: 12 });
        return;
      }

      if (width < 1024) {
        setSliderConfig({ cardsPerPage: 4, visibleSlots: 4.35, gap: 18 });
        return;
      }

      setSliderConfig({ cardsPerPage: 5, visibleSlots: 5.5, gap: 28 });
    };

    updateSliderConfig();
    window.addEventListener("resize", updateSliderConfig);
    return () => window.removeEventListener("resize", updateSliderConfig);
  }, []);

  useEffect(() => {
    const updateMeasurements = () => {
      if (!viewportRef.current) return;

      const computedStyles = window.getComputedStyle(viewportRef.current);
      const paddingLeft = parseFloat(computedStyles.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyles.paddingRight) || 0;
      const outerViewportWidth = viewportRef.current.clientWidth;
      const innerViewportWidth = outerViewportWidth - paddingLeft - paddingRight;
      const visibleGapCount = Math.ceil(sliderConfig.visibleSlots) - 1;
      const nextCardWidth = (innerViewportWidth - visibleGapCount * sliderConfig.gap) / sliderConfig.visibleSlots;

      setViewportWidth(innerViewportWidth);
      setCardWidth(nextCardWidth > 0 ? nextCardWidth : 150);
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, [sliderConfig]);

  const { cardsPerPage, gap } = sliderConfig;
  const stepSize = cardsPerPage * (cardWidth + gap);
  const trackWidth = cards.length * cardWidth + Math.max(0, cards.length - 1) * gap;
  const maxTranslate = Math.max(0, trackWidth - viewportWidth);
  const maxPage = Math.max(0, Math.ceil(maxTranslate / Math.max(stepSize, 1)));
  const canGoPrev = page > 0;
  const canGoNext = page < maxPage;
  const translateX = Math.min(page * stepSize, maxTranslate);

  useEffect(() => {
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [maxPage, page]);

  return (
    <>
      <div className="relative">
        <div ref={viewportRef} className="overflow-hidden pl-3 pr-5 sm:pl-6 sm:pr-7 lg:pl-7 lg:pr-8">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              gap: `${gap}px`,
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {cards.map((card) => (
              <div key={card.id} className="shrink-0" style={{ width: `${cardWidth}px` }}>
                <PropertyCard card={card} onClick={setSelectedCard} />
              </div>
            ))}
          </div>
        </div>

        {canGoPrev && (
          <button
            type="button"
            onClick={() => setPage((prevPage) => Math.max(0, prevPage - 1))}
            className="absolute left-0 top-1/2 z-20 flex h-20 w-5 -translate-y-1/2 items-center justify-center rounded-[0.7rem] bg-[#2d2d2d] text-white transition hover:bg-[#3a3a3a] sm:h-28 sm:w-5 lg:h-32 lg:w-6"
            aria-label="Show previous properties"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.9} />
          </button>
        )}

        {canGoNext && (
          <button
            type="button"
            onClick={() => setPage((prevPage) => Math.min(maxPage, prevPage + 1))}
            className="absolute right-0 top-1/2 z-20 flex h-20 w-5 -translate-y-1/2 items-center justify-center rounded-[0.7rem] bg-[#2d2d2d] text-white transition hover:bg-[#3a3a3a] sm:h-28 sm:w-5 lg:h-32 lg:w-6"
            aria-label="Show next properties"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.9} />
          </button>
        )}
      </div>

      <PropertyModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </>
  );
};

TrendingSlider.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TrendingSlider;
