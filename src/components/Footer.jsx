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
    <footer className="relative w-full overflow-hidden bg-linear-to-br from-slate-950 via-cyan-950 to-blue-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 text-center sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center">
          <h2 className="bg-linear-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-3xl font-extrabold text-transparent">
            GoExplore
          </h2>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
            <Plane size={14} /> Travel WorkHub
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">
            Your travel workhub for discovering new places, planning easier
            journeys, and collecting stories worth sharing.
          </p>
          <div className="mt-6 flex items-center justify-center gap-5">
            <Plane aria-hidden="true" className="text-amber-300" />
            <MapPin aria-hidden="true" className="text-cyan-300" />
            <Globe aria-hidden="true" className="text-blue-300" />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-slate-300">
            <li><Link to="/" className="transition hover:text-amber-200">Home</Link></li>
            <li><Link to="/about" className="transition hover:text-amber-200">About Us</Link></li>
            <li><Link to="/packages" className="transition hover:text-amber-200">Packages</Link></li>
            <li><Link to="/experience" className="transition hover:text-amber-200">Experiences</Link></li>
            <li><Link to="/dashboard/overview" className="transition hover:text-amber-200">Travel Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Popular Destinations</h3>
          <ul className="space-y-3 text-slate-300">
            <li>Bali, Indonesia</li>
            <li>Paris, France</li>
            <li>Maldives</li>
            <li>Dubai, UAE</li>
            <li>Swiss Alps</li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-3 break-words text-sm text-slate-300">
            <li className="flex items-center justify-center gap-2">
              <MapPin aria-hidden="true" size={16} className="shrink-0 text-cyan-300" />
              Dhaka, Bangladesh
            </li>
            <li className="flex items-center justify-center gap-2">
              <Phone aria-hidden="true" size={16} className="shrink-0 text-cyan-300" />
              +880 1234 567 890
            </li>
            <li className="flex items-center justify-center gap-2">
              <Mail aria-hidden="true" size={16} className="shrink-0 text-cyan-300" />
              <span className="break-all">support@goexplore.com</span>
            </li>
          </ul>

          <div className="mt-6 flex justify-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 transition hover:border-cyan-200/50 hover:bg-white/10 hover:text-amber-200"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 transition hover:border-cyan-200/50 hover:bg-white/10 hover:text-amber-200"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 transition hover:border-cyan-200/50 hover:bg-white/10 hover:text-amber-200"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-4 py-6 pb-24 text-center text-sm text-slate-400 sm:pb-6">
        © {new Date().getFullYear()} GoExplore Travel WorkHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
