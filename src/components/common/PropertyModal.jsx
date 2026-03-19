import PropTypes from "prop-types";
import { X, MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";

const PropertyModal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4" onClick={onClose}>
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(24,24,27,1) 0%, transparent 60%)" }}
          />
        </div>

        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-black"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-5 pb-6 pt-3">
          <h3 className="text-xl font-bold text-white">{card.title}</h3>

          <div className="mt-2 flex items-center gap-1 text-sm text-white/60">
            <MapPin className="h-3.5 w-3.5" />
            <span>{card.location || "Nagpur, Maharashtra"}</span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {card.description ||
              "A beautiful property with modern amenities, spacious rooms, and premium fittings. Located in a prime area with easy access to schools, hospitals, and shopping centers."}
          </p>

          <div className="mt-4 flex gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4" />
              <span>{card.beds || "3"} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{card.baths || "2"} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="h-4 w-4" />
              <span>{card.area || "1200"} sq.ft</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-2xl font-bold text-white">Rs {card.price || "85,00,000"}</span>
            <button className="w-full rounded bg-[#E50914] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#c11119] sm:w-auto">
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PropertyModal.propTypes = {
  card: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    beds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    baths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    area: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onClose: PropTypes.func.isRequired,
};

export default PropertyModal;

