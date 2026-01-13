import { motion } from "motion/react";
import {
  Globe,
  Compass,
  Camera,
} from "lucide-react";

const TravelExperienceSection = () => {
  return (
    <section className="relative w-full bg-white pb-12 overflow-hidden">

      {/* Hero Image */}
      <motion.div
        className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Travel Experience"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white text-center max-w-3xl leading-tight"
          >
            Experience the World Like Never Before
          </motion.h1>
        </div>
      </motion.div>

      {/* Highlights / Experience Sections */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {/* Experience 1 */}
        <div className="flex flex-col bg-sky-100 hover:shadow-2xl p-4 items-center text-center border-b-4 border-sky-300 rounded-md gap-4">
          <Globe className="w-12 h-12 text-sky-500" />
          <h3 className="text-xl font-semibold text-gray-900">
            Global Exploration
          </h3>
          <p className="text-gray-600">
            Discover hidden gems and iconic landmarks across the globe, every journey unique and unforgettable.
          </p>
        </div>

        {/* Experience 2 */}
        <div className="flex flex-col bg-sky-100 hover:shadow-2xl items-center p-4 border-b-4 border-sky-300 rounded-md text-center gap-4">
          <Compass className="w-12 h-12 text-sky-500" />
          <h3 className="text-xl font-semibold text-gray-900">
            Guided Adventures
          </h3>
          <p className="text-gray-600">
            Curated experiences led by local experts, ensuring safety and authentic connections with culture.
          </p>
        </div>

        {/* Experience 3 */}
        <div className="flex flex-col bg-sky-100 hover:shadow-2xl items-center border-b-4 border-sky-300 rounded-md p-4 text-center gap-4">
          <Camera className="w-12 h-12 text-sky-500" />
          <h3 className="text-xl font-semibold text-gray-900">
            Capture Memories
          </h3>
          <p className="text-gray-600">
            From stunning landscapes to intimate moments, make every journey picture-perfect.
          </p>
        </div>
      </motion.div>

      {/* Immersive Image Strip */}
      <motion.div
        className="relative mt-12 flex md:h-80 overflow-x-auto gap-4 px-6"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1493558103817-58b2924bce98"
          alt="City Travel"
          className="w-1/3 rounded-2xl object-cover shadow-lg"
        />
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
          alt="Mountain Travel"
          className="w-1/3 rounded-2xl object-cover shadow-lg"
        />
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="Beach Travel"
          className="w-1/3 rounded-2xl object-cover shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default TravelExperienceSection;
