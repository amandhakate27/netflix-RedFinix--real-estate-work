import PropTypes from "prop-types";

const PropertyCard = ({ card, onClick }) => {
  return (
    <article
      onClick={() => onClick(card)}
      className="group relative w-full cursor-pointer overflow-visible p-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.035] will-change-transform motion-reduce:transform-none"
    >
      <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: "146%" }}>
        <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <span
        className="pointer-events-none absolute bottom-[1.2rem] left-[-0.65rem] z-30 font-black leading-none text-black sm:bottom-[2rem] sm:left-[-1.1rem] lg:left-[-1.2rem]"
        style={{
          fontSize: "clamp(4.1rem, 6.5vw, 6.35rem)",
          WebkitTextStroke: "1.7px #ffffff",
          textShadow: "0 6px 16px rgba(0, 0, 0, 0.55)",
        }}
      >
        {card.id}
      </span>
    </article>
  );
};

PropertyCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PropertyCard;











