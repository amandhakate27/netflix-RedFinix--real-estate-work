import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Search, X, ArrowLeft, Heart, Share2, MapPin, Maximize2, CircleUserRound } from "lucide-react";
import Footer from "../components/common/Footer";
import { heroSlides } from "../data/mockData";
import redFinixLogo from "../assets/images/redFinixLogo.png";
import propertyDetail0 from "../assets/images/property-detail-0.png";
import propertyDetail1 from "../assets/images/property-detail-1.jpg";
import propertyDetail2 from "../assets/images/property-detail-2.jpg";
import propertyDetail3 from "../assets/images/property-detail-3.jpg";
import propertyDetail4 from "../assets/images/property-detail-4.jpg";
import backIcon from "../assets/Icons/detail-back.svg";
import locationIcon from "../assets/Icons/detail-location.svg";
import bedIcon from "../assets/Icons/detail-bed.svg";
import bathIcon from "../assets/Icons/detail-bath.svg";
import areaIcon from "../assets/Icons/detail-area.svg";
import poolIcon from "../assets/Icons/facility-pool.svg";
import parkingIcon from "../assets/Icons/facility-parking.svg";
import balconyIcon from "../assets/Icons/facility-balcony.svg";
import kitchenIcon from "../assets/Icons/facility-kitchen.svg";
import cityViewIcon from "../assets/Icons/facility-city-view.svg";
import gymIcon from "../assets/Icons/facility-gym.svg";
import closetIcon from "../assets/Icons/facility-closet.svg";
import securityIcon from "../assets/Icons/facility-security.svg";
import gardenIcon from "../assets/Icons/facility-garden.svg";
import templeIcon from "../assets/Icons/location-temple.svg";
import petrolIcon from "../assets/Icons/location-petrol.svg";
import hospitalIcon from "../assets/Icons/location-hospital.svg";
import highwayIcon from "../assets/Icons/location-highway.svg";
import schoolIcon from "../assets/Icons/location-school.svg";
import cafeIcon from "../assets/Icons/location-cafe.svg";
import garageIcon from "../assets/Icons/location-garage.svg";
import dominosIcon from "../assets/Icons/location-dominos.svg";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Properties", to: "/properties" },
  { label: "Schedule", to: "/schedule" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const facilityItems = [
  { label: "Swimming Pool", icon: poolIcon },
  { label: "Parking", icon: parkingIcon },
  { label: "Balcony", icon: balconyIcon },
  { label: "Modern Kitchen", icon: kitchenIcon },
  { label: "City View", icon: cityViewIcon },
  { label: "Gymnasium", icon: gymIcon },
  { label: "Walk-in Closets", icon: closetIcon },
  { label: "Security", icon: securityIcon },
  { label: "Garden", icon: gardenIcon },
];

const locationAdvantages = [
  { label: "Iskcon Temple", icon: templeIcon },
  { label: "HP Petrol Pump", icon: petrolIcon },
  { label: "Ojas Hospital", icon: hospitalIcon },
  { label: "BRT Highway", icon: highwayIcon },
  { label: "Little Million School", icon: schoolIcon },
  { label: "Kallo Cafe", icon: cafeIcon },
  { label: "Garage", icon: garageIcon },
  { label: "Domino's", icon: dominosIcon },
];

const detailImages = [propertyDetail0, propertyDetail1, propertyDetail2, propertyDetail3, propertyDetail4];

const normalizePrice = (price) => String(price || "?4.50 Cr").replace(/₹/g, "?");

const ShowProperty = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const selectedProperty = useMemo(() => {
    const fallback = heroSlides[0];
    const incoming = location.state?.property || fallback;

    return {
      ...fallback,
      ...incoming,
      price: normalizePrice(incoming?.price || fallback.price),
      beds: incoming?.beds || fallback.beds,
      baths: incoming?.baths || fallback.baths,
      area: incoming?.area || fallback.area,
      location: incoming?.location || fallback.location,
      title: incoming?.title || fallback.title,
      description: incoming?.description || fallback.description,
      overview: incoming?.overview || fallback.overview,
      highlights: incoming?.highlights || fallback.highlights,
      image: incoming?.image || fallback.image,
    };
  }, [location.state]);

  const galleryImages = useMemo(() => [selectedProperty.image, ...detailImages], [selectedProperty.image]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % galleryImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [galleryImages.length]);

  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backPath = location.state?.from || "/properties";

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <header
        className={`sticky top-0 z-40 px-4 py-4 transition-all duration-300 sm:px-8 lg:px-16 ${
          isScrolled
            ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
            : "bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.45)_72%,rgba(0,0,0,0)_100%)]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 lg:gap-8">
            <img src={redFinixLogo} alt="Redfinix" className="w-28 sm:w-32 lg:w-36" />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex items-center gap-1 text-sm font-medium text-white lg:hidden"
            >
              Browse
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) => `text-sm transition-colors duration-200 hover:text-[#b3b3b3] ${isActive ? "font-semibold text-white" : "text-white/80"}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            <button type="button" className="text-white transition hover:text-[#b3b3b3]" aria-label="Search">
              <Search className="h-5 w-5" strokeWidth={2.2} />
            </button>
            <div className="flex items-center gap-2">
              <CircleUserRound className="h-8 w-8 text-white/80 transition-colors hover:text-white" strokeWidth={1.5} />
              <ChevronDown className="h-4 w-4 text-white" strokeWidth={2.2} />
            </div>
          </div>
        </div>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute sm:left-4 left-0 top-[100%] z-40 mt-1 w-[260px] rounded border border-[#141414]/10 bg-white/95 py-2 shadow-2xl backdrop-blur-md lg:hidden">
                <div className="absolute sm:left-[110px] left-[135px] -top-[12px] h-0 w-0 border-b-[12px] border-l-[12px] border-r-[12px] border-b-white/95 border-l-transparent border-r-transparent"></div>
                <div className="absolute sm:left-[109px] left-[134px] -top-[14px] -z-10 h-0 w-0 border-b-[14px] border-l-[13px] border-r-[13px] border-b-[#141414]/20 border-l-transparent border-r-transparent"></div>
                
                <nav className="flex flex-col divide-y divide-[#141414]/10 text-center">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <NavLink
                        key={link.label}
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`py-4 text-[15px] font-medium transition-colors hover:bg-[#141414]/5 ${isActive ? "text-[#141414]" : "text-[#141414]/70"}`}
                      >
                        {link.label}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </>
          )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <button
          type="button"
          onClick={() => navigate(backPath)}
          className="mb-6 inline-flex items-center gap-3 text-sm font-semibold text-white/85 transition hover:text-[#E50914] sm:text-base"
        >
          <img src={backIcon} alt="" className="h-5 w-5 brightness-0 invert" />
          <span>Back to Properties</span>
        </button>

        <section className="space-y-5">
          <div className="mx-auto max-w-4xl">
            <article className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] shadow-[0_18px_40px_rgba(0,0,0,0.3)] sm:h-[22rem] lg:h-[26rem] xl:h-[30rem]">
              <button type="button" onClick={() => setIsLightboxOpen(true)} className="relative h-full w-full cursor-pointer">
                <div className="absolute left-0 right-0 top-4 z-20 flex gap-1.5 px-4 sm:px-6">
                  {galleryImages.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-white" : "bg-white/35"}`}
                      aria-label={`Go to gallery image ${index + 1}`}
                    />
                  ))}
                </div>

                {galleryImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${selectedProperty.title} ${index + 1}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/35" />
              </button>
            </article>

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  navigate("/schedule-booking", {
                    state: { property: selectedProperty, from: "/show-property" },
                  })
                }
                className="inline-flex h-10 items-center justify-center rounded bg-[#E50914] px-5 text-sm font-medium text-white transition hover:bg-[#c11119] sm:h-11 sm:px-6 sm:text-base"
              >
                Schedule
              </button>
            </div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col gap-5 px-5 py-5 sm:px-7 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center justify-center lg:items-start">
              <h1 className="text-center text-2xl font-bold text-[#E50914] sm:text-3xl lg:text-left">{selectedProperty.title}</h1>
              <p className="mt-2 inline-flex items-center gap-2 text-base text-white/75 sm:text-lg">
                <img src={locationIcon} alt="" className="h-4.5 w-4.5 brightness-0 invert" />
                <span>{selectedProperty.location}</span>
              </p>
            </div>
            <div className="flex items-center justify-center h-full">
              <p className="text-2xl font-bold text-[#E50914] sm:text-3xl">{selectedProperty.price}</p>
            </div>
          </div>

          <div className="border-t border-white/10" />

          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex flex-col items-center p-4 text-center sm:p-5">
              <img src={bedIcon} alt="" className="h-4.5 w-4.5" />
              <p className="mt-2 text-xl font-bold text-white">{String(selectedProperty.beds).replace(" Beds", "")}</p>
              <p className="text-sm text-white/55 sm:text-base">Bedrooms</p>
            </div>
            <div className="flex flex-col items-center p-4 text-center sm:p-5">
              <img src={bathIcon} alt="" className="h-4.5 w-4.5" />
              <p className="mt-2 text-xl font-bold text-white">{String(selectedProperty.baths).replace(" Baths", "")}</p>
              <p className="text-sm text-white/55 sm:text-base">Bathrooms</p>
            </div>
            <div className="flex flex-col items-center p-4 text-center sm:p-5">
              <img src={areaIcon} alt="" className="h-4.5 w-4.5" />
              <p className="mt-2 text-xl font-bold text-white">{String(selectedProperty.area).replace(" sq.ft", "")}</p>
              <p className="text-sm text-white/55 sm:text-base">Square Feet</p>
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-14">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Description</h2>
            <p className="mt-5 max-w-5xl text-sm leading-relaxed text-white/65 sm:text-base lg:text-lg">
              {selectedProperty.overview} {selectedProperty.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Top Facilities</h2>
            <div className="mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-3">
              {facilityItems.map((item) => (
                <div key={item.label} className="grid min-h-[44px] grid-cols-[24px_minmax(0,1fr)] items-center gap-3 text-sm text-white/65 sm:text-base">
                  <img src={item.icon} alt="" className="h-7 w-7 shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Location Advantages</h2>
            <div className="mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-3">
              {locationAdvantages.map((item) => (
                <div key={item.label} className="grid min-h-[44px] grid-cols-[24px_minmax(0,1fr)] items-center gap-3 text-sm text-white/65 sm:text-base">
                  <img src={item.icon} alt="" className="h-7 w-7 shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/95 p-5 backdrop-blur-sm sm:p-10"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-6 top-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <div className="relative flex max-w-full flex-col items-center gap-6">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <img src={galleryImages[currentImageIndex]} alt="Property visual full screen" className="max-h-[70vh] w-auto max-w-full object-contain" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 px-4 pb-2 sm:gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-12 w-16 overflow-hidden rounded-lg border-2 ring-1 ring-white/10 transition-all hover:scale-105 sm:h-14 sm:w-20 ${index === currentImageIndex ? "scale-105 border-white" : "border-transparent"}`}
                  >
                    <img src={image} alt={`Property thumb ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ShowProperty;

