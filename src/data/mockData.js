import heroSlide1 from "../assets/images/HeroSlide1.png";
import heroSlide2 from "../assets/images/HeroSlide2.avif";
import heroSlide3 from "../assets/images/HeroSlide3.avif";
import heroSlide4 from "../assets/images/HeroSlide4.avif";
import heroSlide5 from "../assets/images/HeroSlide5.webp";
import villa1Slide1 from "../assets/images/villa1Slide1.png";
import villa2Slide1 from "../assets/images/villa2Slide1.png";
import villa3Slide1 from "../assets/images/villa3Slide1.png";
import villa4Slide1 from "../assets/images/villa4Slide1.png";
import apartment1Slide1 from "../assets/images/apartment1Slide1.png";
import apartment2Slide1 from "../assets/images/apartment2Slide1.png";
import apartment3Slide1 from "../assets/images/apartment3Slide1.png";
import apartment4Slide1 from "../assets/images/apartment4Slide1.png";
import townhouse1Slide1 from "../assets/images/townhouse1Slide1.png";

import luxuryEstate1 from "../assets/images/luxuryEstate1.png";
import luxuryEstate2 from "../assets/images/luxuryEstate2.png";
import luxuryEstate3 from "../assets/images/luxuryEstate3.png";
import luxuryEstate4 from "../assets/images/luxuryEstate4.png";
import luxuryEstate5 from "../assets/images/luxuryEstate5.png";
import luxuryEstate6 from "../assets/images/luxuryEstate6.png";
import luxuryEstate7 from "../assets/images/luxuryEstate7.png";
import luxuryEstate8 from "../assets/images/luxuryEstate8.png";
import luxuryEstate9 from "../assets/images/luxuryEstate9.png";
import luxuryEstate10 from "../assets/images/luxuryEstate10.png";
import townhouse2Slide1 from "../assets/images/townhouse2Slide1.png";
import townhouse3Slide1 from "../assets/images/townhouse3Slide1.png";
import townhouse4Slide1 from "../assets/images/townhouse4Slide1.png";
import townhouse5Slide1 from "../assets/images/townhouse5Slide1.png";
import penthouse1Slide1 from "../assets/images/penthouse1Slide1.png";
import penthouse2Slide1 from "../assets/images/penthouse2Slide1.png";
import penthouse3Slide1 from "../assets/images/penthouse3Slide1.png";
import penthouse4Slide1 from "../assets/images/penthouse4Slide1.png";

export const heroSlides = [
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
        price: "₹14.5 Cr",
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
        price: "₹9.8 Cr",
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
        price: "₹18.2 Cr",
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
        price: "₹12.9 Cr",
        overview:
            "A serene manor residence surrounded by landscaped greens, crafted for calm luxury, family comfort, and refined entertaining.",
        highlights: "Garden court, lounge pavilion, formal dining wing",
    },
    {
        image: heroSlide5,
        title: "Hilltop Glass Pavilion",
        description:
            "A masterclass in modern architecture, offering sweeping valley views, floor-to-ceiling glass, and a seamless indoor-outdoor living experience.",
        location: "Khandala, Maharashtra",
        status: "Just Listed",
        badge: "Architectural Marvel",
        type: "Luxury Pavilion",
        beds: "5 Beds",
        baths: "6 Baths",
        area: "9,200 sq.ft",
        price: "₹16.5 Cr",
        overview:
            "Perched on a serene hilltop, this glass pavilion is designed for the ultimate luxury escape, featuring an infinity pool and private helipad access.",
        highlights: "Glass walls, infinity pool, valley views",
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

const top10Images = [
    luxuryEstate1, luxuryEstate2, luxuryEstate3, luxuryEstate4, luxuryEstate5,
    luxuryEstate6, luxuryEstate7, luxuryEstate8, luxuryEstate9, luxuryEstate10
];

export const getTop10Slides = () => {
    return top10Images.map((img, i) => ({
        image: img,
        title: `India's Finest 00${i + 1}`,
        description: `This highly sought-after estate ranks #${i + 1} in India today. Experience unmatched luxury and global standards in real estate.`,
        location: ["Mumbai", "Delhi", "Bengaluru", "Pune", "Goa", "Chennai", "Kolkata"][i % 7] + ", India",
        beds: (i % 3) + 3,
        baths: (i % 2) + 3,
        area: `${2500 + i * 500} sq.ft`,
        price: `₹${(i * 3 + 10).toFixed(1)} Cr`,
        status: "High Demand",
        badge: `Top ${i + 1}`,
        type: i % 3 === 0 ? "Penthouse" : "Mansion",
        overview: `A masterpiece of architecture currently trending across the nation. Secure your private viewing ASAP.`,
        highlights: "Helipad, Infinity Pool, Smart Automation"
    }));
};

export const getShuffledSlides = () => {
    const generateMockData = (img, i) => ({
        image: img,
        title: `Signature Estate 00${i + 1}`,
        description: `A stunning property featuring premium amenities, modern decor, and a prime location. Perfect for elevated living and entertaining. Property Ref: #RFX-${i * 102 + 50}.`,
        location: ["Mumbai", "Pune", "Goa", "Alibaug", "Lonavala", "Delhi", "Bengaluru"][i % 7] + ", India",
        beds: (i % 4) + 2,
        baths: (i % 3) + 2,
        area: `${1500 + i * 250} sq.ft`,
        price: `₹${(i * 1.5 + 2).toFixed(1)} Cr`,
        status: i % 2 === 0 ? "Ready to Move" : "Just Listed",
        badge: i % 3 === 0 ? "Featured" : "Verified",
        type: i % 4 === 0 ? "Villa" : "Apartment",
        overview: `Experience the best of luxury living in this carefully crafted home designed for comfort and style.`,
        highlights: ["Pool access, gym", "Rooftop terrace, smart home", "Private garden, security", "Sky lounge, concierge"][i % 4]
    });

    const shuffled = Array.from(new Set(previewSlides));
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.map(generateMockData);
};
