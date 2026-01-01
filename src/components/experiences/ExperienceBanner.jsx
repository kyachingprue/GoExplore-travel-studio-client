import { motion } from "motion/react";
import { Compass, MapPin, ArrowRight } from "lucide-react";

const ExperienceBanner = () => {
  return (
    <section className="relative min-h-[66vh] flex items-center mt-12 md:mt-16 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/1Y6JNXyh/shutterstock-1119685325.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/10" />

      {/* Floating Accent */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-12 left-16 w-28 h-28 bg-cyan-400/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 text-cyan-300 mb-3">
            <Compass size={18} />
            <span className="text-sm uppercase tracking-wide">Experiences</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Explore Unforgettable <br />
            <span className="bg-linear-to-r from-cyan-300 via-white to-yellow-300 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>

          <p className="mt-4 text-gray-200">
            Dive into curated adventures, cultural excursions, and unique experiences
            designed to create memories that last a lifetime.
          </p>

          {/* Breadcrumb / CTA */}
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-300">
            <MapPin size={16} />
            <span>Home</span>
            <ArrowRight size={14} />
            <span className="text-white">Experiences</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceBanner;
