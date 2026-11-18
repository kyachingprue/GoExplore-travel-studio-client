
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import {
  Globe2,
  Plane,
  MapPin,
  Star,
  Users,
  ArrowUpRight,
  Compass,
  Camera,
  Clock,
  Sparkles,
  MoveRight,
  Earth,
  ShieldCheck,
} from "lucide-react";

const WorldTourSection = () => {
  const [activeRegion, setActiveRegion] = useState("All");

  // World Tour Data
  const worldTours = [
    {
      id: 1,
      title: "Around the World",
      region: "Global",
      days: 45,
      price: 8999,
      rating: 4.9,
      reviews: 2450,
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85",
      badge: "Ultimate Adventure",
      description:
        "Discover extraordinary destinations, iconic landmarks, and unforgettable cultures across the world.",
      featured: true,
    },
    {
      id: 2,
      title: "Asia Explorer",
      region: "Asia",
      days: 30,
      price: 7499,
      rating: 4.8,
      reviews: 1840,
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=85",
      badge: "Best Seller",
      description:
        "Explore beautiful Asian destinations, ancient temples, tropical beaches, and fascinating traditions.",
      featured: false,
    },
    {
      id: 3,
      title: "European Dream",
      region: "Europe",
      days: 28,
      price: 8299,
      rating: 4.9,
      reviews: 2120,
      image:
        "https://images.unsplash.com/photo-1467269202115-3bb2d4a9e8a6?auto=format&fit=crop&w=1200&q=85",
      badge: "Popular Choice",
      description:
        "Experience European elegance, historic cities, beautiful architecture, and breathtaking landscapes.",
      featured: false,
    },
  ];

  // Statistics
  const stats = [
    {
      icon: Globe2,
      value: "45+",
      label: "Countries",
      description: "Explore worldwide",
    },
    {
      icon: Plane,
      value: "120+",
      label: "Travel Packages",
      description: "Curated adventures",
    },
    {
      icon: Users,
      value: "15k+",
      label: "Happy Travelers",
      description: "Amazing memories",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
      description: "Customer satisfaction",
    },
  ];

  const regions = ["All", "Global", "Asia", "Europe"];

  // Filter Tours
  const filteredTours = useMemo(() => {
    if (activeRegion === "All") return worldTours;

    return worldTours.filter(
      (tour) => tour.region === activeRegion
    );
  }, [activeRegion]);

  return (
    <section className="relative isolate w-full py-20 md:py-28 overflow-hidden bg-linear-to-br from-[#080D25] via-[#111638] to-[#210D3D] text-white">

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.55, 0.3],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-indigo-500/30 blur-[100px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.45, 0.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-purple-500/30 blur-[110px]"
        />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "35px 35px",
          }}
        />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >

          {/* Label */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-xl text-cyan-300 text-xs md:text-sm font-bold uppercase tracking-[0.18em] mb-7 shadow-lg shadow-cyan-950/20">

            <Sparkles className="w-4 h-4" />

            <span>Explore The World With Us</span>

            <Earth className="w-4 h-4" />

          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] mb-7">

            Your Next Journey,

            <br />

            <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Beyond Boundaries
            </span>

          </h2>

          {/* Description */}
          <p className="text-slate-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary destinations and experience
            the beauty of our planet. From breathtaking landscapes
            to unforgettable cultures, your next adventure starts here.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-cyan-400" />
            <Compass className="w-5 h-5 text-cyan-300" />
            <div className="w-12 h-px bg-linear-to-l from-transparent to-cyan-400" />
          </div>

        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                scale: 1.025,
              }}
              className="group relative rounded-2xl md:rounded-3xl bg-white/5.5 backdrop-blur-xl border border-white/10 p-5 md:p-7 text-center overflow-hidden hover:border-cyan-300/40 transition-colors duration-300"
            >

              <div className="absolute inset-0 bg-linear-to-br from-cyan-400/8 to-purple-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">

                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-2xl bg-linear-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center mb-4 border border-cyan-300/20 group-hover:scale-110 transition-transform duration-300">

                  <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-cyan-300" />

                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white mb-1">
                  {stat.value}
                </h3>

                <p className="text-sm md:text-base font-bold text-slate-200">
                  {stat.label}
                </p>

                <p className="text-xs text-slate-500 mt-2">
                  {stat.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

        {/* Tours Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">

          <div>

            <div className="flex items-center gap-2 text-cyan-300 text-sm font-bold uppercase tracking-widest mb-3">

              <Globe2 className="w-4 h-4" />

              Discover Destinations

            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-white">
              Explore Our World Tours
            </h3>

            <p className="text-slate-400 mt-3 max-w-xl">
              Handpicked travel experiences designed to make
              every moment extraordinary.
            </p>

          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap gap-2">

            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                aria-pressed={activeRegion === region}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeRegion === region
                    ? "bg-cyan-400 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                {region}
              </button>
            ))}

          </div>

        </div>

        {/* World Tour Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7"
        >

          <AnimatePresence mode="popLayout">

            {filteredTours.map((tour, index) => (
              <motion.article
                layout
                key={tour.id}
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group relative rounded-3xl overflow-hidden bg-[#171D40]/80 border border-white/10 hover:border-cyan-300/40 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-cyan-950/30 transition-colors duration-300"
              >

                {/* Tour Image */}
                <div className="relative h-64 md:h-72 overflow-hidden">

                  <motion.img
                    src={tour.image}
                    alt={tour.title}
                    loading="lazy"
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="w-full h-full object-cover"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#10152F] via-[#10152F]/20 to-black/20" />

                  {/* Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-lg border border-white/20 text-white text-xs font-bold">

                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />

                    {tour.badge}

                  </div>

                  {/* Rating */}
                  <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 text-slate-900 text-sm font-bold shadow-lg">

                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />

                    {tour.rating}

                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/50 backdrop-blur-lg text-white text-sm font-semibold border border-white/15">

                    <Clock className="w-4 h-4 text-cyan-300" />

                    {tour.days} Days

                  </div>

                  {/* Featured Label */}
                  {tour.featured && (
                    <div className="absolute bottom-5 right-5 px-3 py-2 rounded-xl bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                      Featured
                    </div>
                  )}

                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7">

                  {/* Region */}
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">

                    <MapPin className="w-4 h-4" />

                    {tour.region} · World Tour

                  </div>

                  {/* Title */}
                  <h4 className="text-2xl font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {tour.title}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed min-h-18">
                    {tour.description}
                  </p>

                  {/* Reviews */}
                  <div className="flex items-center gap-2 mt-5 mb-5">

                    <div className="flex items-center -space-x-2">

                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="w-7 h-7 rounded-full border-2 border-[#171D40] bg-linear-to-br from-cyan-300 to-blue-500 flex items-center justify-center text-[9px] font-black text-slate-950"
                        >
                          {item}
                        </div>
                      ))}

                    </div>

                    <span className="text-xs text-slate-400">
                      {tour.reviews.toLocaleString()} traveler reviews
                    </span>

                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 mb-5" />

                  {/* Price and Action */}
                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <p className="text-xs text-slate-500 mb-1">
                        Starting from
                      </p>

                      <div className="flex items-baseline gap-1">

                        <span className="text-2xl md:text-3xl font-black text-white">
                          ${tour.price.toLocaleString()}
                        </span>

                        <span className="text-xs text-slate-500">
                          / person
                        </span>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        // Connect this action to your tour details route.
                        console.log("Selected tour:", tour.id);
                      }}
                      aria-label={`View ${tour.title}`}
                      className="w-12 h-12 shrink-0 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      <ArrowUpRight className="w-6 h-6" />
                    </button>

                  </div>

                </div>

              </motion.article>
            ))}

          </AnimatePresence>

        </motion.div>

        {/* Empty State */}
        {filteredTours.length === 0 && (
          <div className="text-center py-16">
            <Globe2 className="w-12 h-12 mx-auto text-slate-500 mb-4" />

            <h4 className="text-xl font-bold text-white">
              No tours found
            </h4>

            <p className="text-slate-400 mt-2">
              Try selecting another destination.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative mt-20 rounded-4xl overflow-hidden border border-white/15 bg-linear-to-r from-indigo-500/20 via-blue-500/15 to-purple-500/20 p-8 md:p-12 text-center"
        >

          {/* CTA Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-cyan-400/20 blur-[90px] pointer-events-none" />

          <div className="relative z-10">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">

              <Plane className="w-8 h-8 text-cyan-300" />

            </div>

            <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">

              <ShieldCheck className="w-4 h-4" />

              Your Adventure Awaits

            </div>

            <h3 className="text-3xl md:text-5xl font-black text-white mb-5">
              The World Is Waiting For You
            </h3>

            <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Make your travel dreams a reality. Discover
              amazing destinations and create memories
              that last a lifetime.
            </p>

            <motion.button
              type="button"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => {
                // Connect this action to your booking or contact route.
                console.log("Start your world tour");
              }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-shadow duration-300"
            >

              <Camera className="w-5 h-5" />

              Start Your World Tour

              <MoveRight className="w-5 h-5" />

            </motion.button>

          </div>

        </motion.div>

        {/* Bottom Decoration */}
        <div className="flex justify-center items-center gap-3 mt-12 text-slate-500">

          <div className="w-10 h-px bg-white/10" />

          <Globe2 className="w-4 h-4 text-cyan-400" />

          <span className="text-xs tracking-widest uppercase">
            Explore · Discover · Experience
          </span>

          <div className="w-10 h-px bg-white/10" />

        </div>

      </div>
    </section>
  );
};

export default WorldTourSection;
