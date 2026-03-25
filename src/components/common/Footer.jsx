
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import redFinixLogo from '../../assets/images/redFinixLogo.png';

const Footer = () => {
    return (
        <footer className="bg-[#141414] pt-16 pb-12 px-4 sm:px-8 lg:px-16 text-[#808080] text-sm">
            <div className="max-w-6xl mx-auto">
                {/* Social Icons */}
                <div className="flex gap-6 mb-8 text-white">
                    <a href="#" className="hover:text-gray-400 transition-colors"><Facebook size={24} fill="currentColor" /></a>
                    <a href="#" className="hover:text-gray-400 transition-colors"><Instagram size={24} /></a>
                    <a href="#" className="hover:text-gray-400 transition-colors"><Twitter size={24} fill="currentColor" /></a>
                    <a href="#" className="hover:text-gray-400 transition-colors"><Linkedin size={24} fill="currentColor" /></a>
                </div>

                {/* Footer Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <img src={redFinixLogo} alt="Redfinix" className="w-28 sm:w-32 lg:w-36 h-auto" />
                        <p className="leading-relaxed text-[#999]">
                            Elevating luxury real estate with exceptional properties and unparalleled service worldwide.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <ul className="space-y-3 font-normal">
                        <li><a href="#" className="hover:underline">Browse Properties</a></li>
                        <li><a href="#" className="hover:underline">Featured Listings</a></li>
                        <li><a href="#" className="hover:underline">Luxury Estates</a></li>
                        <li><a href="#" className="hover:underline">New Developments</a></li>
                        <li><a href="#" className="hover:underline">Sell Your Property</a></li>
                    </ul>

                    {/* Links Column 2 */}
                    <ul className="space-y-3 font-normal">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Our Team</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Press & Media</a></li>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                    </ul>

                    {/* Contact Column */}
                    <ul className="space-y-5 text-[#999]">
                        <li className="flex gap-3">
                            <MapPin size={20} className="shrink-0 text-white/50" />
                            <span className="leading-5">123 Park Avenue, Suite 1000,<br />New York, NY 10017</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={20} className="shrink-0 text-white/50" />
                            <span className="text-white/70">+91 8786532932</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={20} className="shrink-0 text-white/50" />
                            <span className="hover:underline cursor-pointer">info@redfinix.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
