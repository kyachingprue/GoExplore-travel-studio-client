import { Link } from "react-router-dom";
import {
  Plane,
  MapPin,
  Globe,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold bg-linear-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent">
            GoExplore
          </h2>
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Discover breathtaking destinations, unforgettable experiences,
            and eco-friendly adventures across the world with GoExplore.
          </p>

          <div className="flex gap-4 mt-6">
            <Plane className="text-yellow-300" />
            <MapPin className="text-cyan-300" />
            <Globe className="text-pink-300" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300">About Us</Link></li>
            <li><Link to="/package" className="hover:text-yellow-300">Packages</Link></li>
            <li><Link to="/experience" className="hover:text-yellow-300">Experiences</Link></li>
            <li><Link to="/dashboard" className="hover:text-yellow-300">Travel Dashboard</Link></li>
          </ul>
        </div>

        {/* Popular Destinations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Bali, Indonesia</li>
            <li>Paris, France</li>
            <li>Maldives</li>
            <li>Dubai, UAE</li>
            <li>Swiss Alps</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234 567 890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@goexplore.com
            </li>
          </ul>

          {/* Social */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:text-yellow-300">
              <Facebook />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Instagram />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-14 border-t border-white/20">
        <p className="text-center text-sm text-gray-300 py-6">
          © {new Date().getFullYear()} GoExplore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
