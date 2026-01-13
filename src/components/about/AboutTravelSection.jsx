import { motion } from "motion/react";
import {
  Globe,
  Compass,
  Plane,
  HeartHandshake,
} from "lucide-react";

const AboutTravelSection = () => {
  return (
    <section className="py-20 bg-linear-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-sky-600 mb-4">
            <Compass className="w-6 h-6" />
            <span className="uppercase tracking-widest text-sm font-semibold">
              About Our Journey
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            We Create Meaningful Travel Experiences Across the World
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Our travel company was founded with a passion for exploration and a
            belief that travel should be more than just visiting places. We help
            travelers connect with cultures, nature, and unforgettable moments.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            From breathtaking landscapes to immersive local experiences, we
            design journeys that inspire, refresh, and create lifelong memories.
          </p>

          {/* Highlights */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-sky-500" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Worldwide Destinations
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Carefully curated destinations across multiple continents.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Plane className="w-8 h-8 text-sky-500" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Seamless Travel Planning
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Stress-free planning from booking to final destination.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <HeartHandshake className="w-8 h-8 text-sky-500" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Trusted by Travelers
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Thousands of happy travelers around the globe.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Compass className="w-8 h-8 text-sky-500" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Authentic Experiences
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Local culture, food, and traditions at the heart of every trip.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Images */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://i.ibb.co.com/r2SgRKH2/new-world-travel.jpg"
            alt="Travel"
            className="rounded-2xl shadow-xl w-full h-105 object-cover"
          />

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute -bottom-10 -left-10 bg-white rounded-xl shadow-lg p-5 hidden md:block"
          >
            <h4 className="text-2xl font-bold text-sky-600">10+ Years</h4>
            <p className="text-sm text-gray-600">
              of travel experience
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutTravelSection;
