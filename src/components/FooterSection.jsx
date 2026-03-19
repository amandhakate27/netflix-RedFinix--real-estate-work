const footerColumns = [
    [
        { label: "Browse Properties", href: "#" },
        { label: "Featured Listings", href: "#" },
        { label: "Luxury Estates", href: "#" },
        { label: "New Developments", href: "#" },
    ],
    [
        { label: "Sell Your Property", href: "#" },
        { label: "About Us", href: "#" },
        { label: "Our Team", href: "#" },
        { label: "Careers", href: "#" },
    ],
    [
        { label: "Press & Media", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "+91 8786532932", href: "tel:+918786532932" },
        { label: "info@redfinix.com", href: "mailto:info@redfinix.com" },
    ],
    [
        { label: "123 Park Avenue, Suite 1000", href: "#" },
        { label: "New York, NY 10017", href: "#" },
        { label: "Schedule a Visit", href: "#" },
        { label: "Only on Redfinix", href: "#" },
    ],
];

const FooterSection = () => {
    return (
        <footer className="bg-black px-4 pb-20 pt-2 text-white/70 sm:px-8 md:px-12 lg:px-16">
            <div className="mx-auto w-full max-w-7xl">
                <p className="text-[1rem] leading-7 text-white/70 sm:text-[1.08rem]">
                    Questions? Call {" "}
                    <a className="underline transition hover:text-white" href="tel:+918786532932">
                        +91 8786532932
                    </a>
                </p>

                <div className="mt-8 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-10 md:mt-9 md:grid-cols-3 lg:grid-cols-4">
                    {footerColumns.map((column, index) => (
                        <div key={index} className="flex flex-col gap-3 text-[0.98rem] leading-7 sm:text-[1rem]">
                            {column.map(({ label, href }) => (
                                <a key={label} href={href} className="underline transition hover:text-white">
                                    {label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-[1rem] text-white/70">Redfinix India</p>

                <p className="mt-8 max-w-[52rem] text-[0.95rem] leading-7 text-white/45 sm:text-[1rem]">
                    Redfinix helps you discover verified listings, trusted agents, and premium real estate opportunities with confidence. {" "}
                    <a href="#" className="text-[#448ef4] transition hover:text-[#6aa5ff]">
                        Explore more.
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default FooterSection;
