import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { ChevronDown, Search, ArrowRight, CircleUserRound, MapPin, ChevronLeft, ChevronRight as ChevronRightIcon, Check } from "lucide-react";
import Footer from "../components/common/Footer";
import redFinixLogo from "../assets/images/redFinixLogo.png";
import { getShuffledSlides, heroSlides } from "../data/mockData";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Properties", to: "/properties" },
  { label: "Schedule", to: "/schedule" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Schedule = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Slider ref for manual scroll buttons
  const sliderRef = useRef(null);

  // Default properties list
  const properties = useMemo(() => getShuffledSlides(), []);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNext = () => {
    if (!selectedProperty) return;
    navigate("/schedule-booking", { state: { property: selectedProperty } });
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 800, behavior: "smooth" });
  };

  // Determine current display background
  const bgImage = selectedProperty ? selectedProperty.image : heroSlides[0].image;

  return (
    <div className="relative min-h-screen bg-[#141414] text-white overflow-hidden">
      {/* VIBRANT DYNAMIC BACKGROUND WITH SPOTLIGHT OVERLAY */}
      <div className="absolute inset-0 top-0 h-[70vh] w-full lg:h-[85vh]">
        {/* We use a key to force animation restart on image change */}
        <img
          key={bgImage}
          src={bgImage}
          alt="Featured Property Background"
          className="h-full w-full object-cover object-center animate-[fadeIn_0.5s_ease-in-out]"
        />
        {/* Left deep gradient so text is perfectly visible */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent sm:w-[70%] lg:w-[60%]" />
        
        {/* Bottom deep gradient to blend seamlessly into the rest of the dark page */}
        <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent pointer-events-none" />
      </div>

      {/* Navbar */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full px-4 py-4 transition-all duration-300 sm:px-8 lg:px-16 ${
          isScrolled
            ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
            : "bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.45)_72%,rgba(0,0,0,0)_100%)]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 lg:gap-8">
            <img src={redFinixLogo} alt="Redfinix" className="w-28 cursor-pointer sm:w-32 lg:w-36 drop-shadow-lg" onClick={() => navigate("/home")} />
            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              className="ml-0 flex items-center gap-1 rounded bg-transparent px-1 py-1 text-base font-normal text-white focus:border-0 focus:outline-none focus:ring-0 lg:hidden"
            >
              Browse
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} strokeWidth={2.2} />
            </button>
            <nav className="hidden lg:flex lg:items-center lg:gap-7 xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm drop-shadow-md transition-colors duration-200 hover:text-[#b3b3b3] ${isActive ? "font-semibold text-white" : "text-white/80"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-5">
            <button type="button" className="shrink-0 text-white transition hover:text-[#b3b3b3]">
              <Search className="h-5 w-5 drop-shadow-md" strokeWidth={2.2} />
            </button>
            <div className="flex items-center gap-2">
              <CircleUserRound className="h-8 w-8 text-white/80 transition-colors drop-shadow-md hover:text-white" strokeWidth={1.5} />
              <ChevronDown className="h-4 w-4 text-white drop-shadow-md" strokeWidth={2.2} />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute left-0 top-[100%] z-40 mt-1 w-[260px] rounded border border-white/20 bg-black/95 py-2 shadow-2xl backdrop-blur-md sm:left-4 lg:hidden">
              <div className="absolute left-[135px] -top-[12px] h-0 w-0 border-b-[12px] border-l-[12px] border-r-[12px] border-b-black/95 border-l-transparent border-r-transparent sm:left-[110px]"></div>
              <div className="absolute left-[134px] -top-[14px] -z-10 h-0 w-0 border-b-[14px] border-l-[13px] border-r-[13px] border-b-white/20 border-l-transparent border-r-transparent sm:left-[109px]"></div>
              <nav className="flex flex-col divide-y divide-white/10 text-center">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <NavLink
                      key={link.label}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`py-4 text-[15px] font-medium transition-colors hover:bg-white/5 ${isActive ? "text-white" : "text-white/70"}`}
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

      <main className="relative z-10 w-full pb-20 pt-28 sm:pt-36">
        
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-16">
          {/* Step Indicator */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-lg">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E50914] text-xs font-bold text-white shadow-lg">1</span>
            <span className="text-sm font-semibold tracking-wide text-white">Select Property</span>
            <span className="h-px w-6 bg-white/30"></span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/50 text-xs font-bold text-white/70">2</span>
            <span className="text-sm font-medium tracking-wide text-white/70">Booking Form</span>
          </div>

          {/* Selected Property Spotlight OR Empty State */}
          <div className="min-h-[220px] max-w-3xl drop-shadow-xl lg:min-h-[280px]">
            {selectedProperty ? (
              <>
                <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
                  {selectedProperty.title || "Luxury Property"}
                </h1>
                <div className="mt-4 flex items-center gap-3 text-lg font-medium text-white/90 sm:text-xl">
                  <MapPin className="h-5 w-5 text-[#E50914]" fill="currentColor" />
                  <p>{selectedProperty.location || "Prime Location"}</p>
                </div>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                  {selectedProperty.description || "Incredible views, modern aesthetics, and top-of-the-line amenities. Book your visit now to experience luxury living."}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <p className="text-3xl font-black text-white lg:text-4xl">
                    {selectedProperty.price || "$ 3,500,000"}
                  </p>
                  <div className="flex items-center gap-3 text-sm font-medium text-white/80 sm:text-base">
                    <span>{selectedProperty.beds || 3} Beds</span>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E50914]"></span>
                    <span>{selectedProperty.baths || 3} Baths</span>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E50914]"></span>
                    <span>{selectedProperty.sqft || "3,200"} Sq.Ft</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col justify-center">
                <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
                  Schedule a Visit
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                  Ready to find your dream home? Browse our catalog of exclusive luxury properties below and click on any property to begin the scheduling process.
                </p>
              </div>
            )}
            
            <div className="mt-10 flex items-center">
              <button
                  type="button"
                  disabled={!selectedProperty}
                  onClick={handleNext}
                  className={`group inline-flex h-14 items-center justify-center gap-3 rounded-md px-10 text-lg font-bold text-white transition-all 
                  ${selectedProperty 
                    ? "bg-[#E50914] hover:bg-[#c11119] hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(229,9,20,0.4)]" 
                    : "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"}`}
                >
                  Proceed to Book
                  <ArrowRight className={`h-5 w-5 transition-transform ${selectedProperty ? 'group-hover:translate-x-1' : ''}`} strokeWidth={2.5} />
                </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider (Home Page Style) */}
        <section className="mt-14 w-full">
          <div className="mb-4 flex items-center justify-between px-4 sm:px-8 lg:px-16">
            <h2 className="text-lg font-semibold text-white sm:text-xl lg:text-[1.05rem] tracking-wide">Available Properties</h2>
          </div>
          
          {/* Full bleed slider with absolute arrows */}
          <div className="relative group/slider">
            {/* Left Scroll Button */}
            <button 
                onClick={scrollLeft}
                className="absolute left-0 top-4 z-20 flex h-[122.71px] w-10 items-center justify-center bg-black/40 text-white transition hover:bg-black/70 opacity-0 group-hover/slider:opacity-100"
                aria-label="Scroll left"
            >
                <ChevronLeft className="h-8 w-8" strokeWidth={2} />
            </button>

            {/* Carousel track wrapper */}
            <div 
              ref={sliderRef}
              className="overflow-x-auto scroll-smooth scrollbar-none px-4 sm:px-8 lg:px-16 py-4"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              <style>{`.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
              
              <div className="flex min-w-max gap-[6px]">
                {properties.map((property, idx) => {
                  // Determine equality by image instead of ID since ID isn't present in mockData.js
                  const isSelected = selectedProperty && selectedProperty.image === property.image;
                  
                  return (
                    <button 
                      key={property.title + idx} 
                      type="button"
                      className={`relative shrink-0 cursor-pointer overflow-hidden rounded-[0.2rem] transition-all duration-300 transform 
                        ${isSelected ? "ring-[2px] ring-[#E50914] ring-offset-2 ring-offset-[#141414] scale-[0.98]" : "hover:ring-[1px] hover:ring-white/40"}`
                      }
                      style={{ width: "217.94px", height: "122.71px" }}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <img
                        src={property.image}
                        alt={property.title}
                        className={`h-full w-full object-cover transition-transform duration-500 hover:scale-110 ${isSelected ? "blur-[2px]" : ""}`}
                      />
                      
                      {/* Dark gradient overlay when selected for the checkmark visibility */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                           <div className="rounded-full bg-[#E50914] p-1.5 shadow-lg">
                             <Check className="h-5 w-5 text-white" strokeWidth={3} />
                           </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Right Scroll Button */}
            <button 
                onClick={scrollRight}
                className="absolute right-0 top-4 z-20 flex h-[122.71px] w-10 items-center justify-center bg-black/40 text-white transition hover:bg-black/70 opacity-0 group-hover/slider:opacity-100"
                aria-label="Scroll right"
            >
                <ChevronRightIcon className="h-8 w-8" strokeWidth={2} />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schedule;
