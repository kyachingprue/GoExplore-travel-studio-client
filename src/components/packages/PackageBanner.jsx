import { motion } from "motion/react";
import { Package, MapPin, ArrowRight } from "lucide-react";

const PackageBanner = () => {
  return (
    <section className="relative min-h-[66vh] flex items-center mt-12 md:mt-16 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/fVVXP81c/happy-new-year.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />

      {/* Floating Accent */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-12 left-16 w-28 h-28 bg-yellow-400/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 text-yellow-300 mb-3">
            <Package size={18} />
            <span className="text-sm uppercase tracking-wide">
              Travel Packages
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Find Your Perfect <br />
            <span className="bg-linear-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent">
              Travel Package
            </span>
          </h1>

          <p className="mt-4 text-gray-200">
            Handpicked travel packages crafted for adventure seekers,
            families, and explorers across the globe.
          </p>

          {/* Breadcrumb / CTA */}
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-300">
            <MapPin size={16} />
            <span>Home</span>
            <ArrowRight size={14} />
            <span className="text-white">Packages</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageBanner;
