import { motion } from "motion/react";
import {
  Map,
  Compass,
  PlaneTakeoff,
} from "lucide-react";

const GoExploreJourneySection = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">

      {/* Background Image */}
      <motion.img
        src="https://i.ibb.co.com/4ZPjWZW2/what-is-the-difference-between-tour-and-travel.jpg"
        alt="GoExplore Journey"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8 }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Center Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 h-full flex flex-col items-center py-24 md:py-20 text-center text-white px-6"
      >
        <span className="uppercase tracking-widest text-sm text-sky-300">
          GoExplore
        </span>

        <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
          Travel Beyond <br />
          <span className="text-sky-400">Boundaries</span>
        </h1>

        <p className="my-6 max-w-2xl text-gray-200">
          Every journey is a story waiting to be told. GoExplore takes you
          deeper into cultures, landscapes, and experiences that stay with you
          forever.
        </p>
      </motion.div>

      {/* Drawer */}
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl z-20"
      >
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">

          <div className="flex items-start gap-4">
            <Compass className="w-8 h-8 text-sky-500" />
            <div>
              <h4 className="text-lg font-semibold">
                Curated Journeys
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Thoughtfully designed routes for unforgettable adventures.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Map className="w-8 h-8 text-sky-500" />
            <div>
              <h4 className="text-lg font-semibold">
                Global Destinations
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Explore iconic places and hidden gems across the world.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PlaneTakeoff className="w-8 h-8 text-sky-500" />
            <div>
              <h4 className="text-lg font-semibold">
                Seamless Experience
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                From planning to travel, we handle every detail smoothly.
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default GoExploreJourneySection;
