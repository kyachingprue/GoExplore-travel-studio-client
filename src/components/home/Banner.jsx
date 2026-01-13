import { motion } from "motion/react";
import { Search, PlaneTakeoff, MapPin, Plane } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate()
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mt-12 md:mt-16">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/Pz6DJPkL/nepal-everest-base-camp-everest-travel-photo-20190128094442660-main-image.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/70" />

      {/* Animated floating shapes */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-5xl font-extrabold text-white leading-tight">
            Discover The World <br />
            With{" "}
            <span className="bg-linear-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent">
              GoExplore
            </span>
          </h1>

          <p className="mt-6 text-gray-200 max-w-xl">
            Explore breathtaking destinations, curated travel experiences,
            and unforgettable adventures designed for modern travelers.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/packages">
              <button className="px-8 py-3 rounded-xl flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition">
                <Plane/> Explore Package
              </button>
            </Link>
            <button className="px-8 py-3 rounded-xl border border-white text-white hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Glass Search Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Find Your Next Adventure
          </h3>

          <div className="space-y-4">
            {/* Destination */}
            <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-lg">
              <MapPin className="text-yellow-300" />
              <input
                type="text"
                placeholder="Destination"
                className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full"
              />
            </div>

            {/* Keyword */}
            <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-lg">
              <Search className="text-cyan-300" />
              <input
                type="text"
                placeholder="Search tours"
                className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full"
              />
            </div>

            {/* Button */}
            <button onClick={() => navigate('/packages')} className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-3 rounded-xl transition">
              <PlaneTakeoff />
              Search Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
