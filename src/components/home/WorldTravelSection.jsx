import { motion } from "motion/react";
import {
  Plane,
  Globe,
  MapPin,
  Compass,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  {
    id: 1,
    title: "Paris, France",
    desc: "Experience romance, culture, and iconic architecture.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Bali, Indonesia",
    desc: "Relax in tropical beaches and peaceful nature.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    icon: <Compass className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Tokyo, Japan",
    desc: "Discover modern life blended with tradition.",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58",
    icon: <Globe className="w-5 h-5" />,
  },
];

const WorldTravelSection = () => {
  return (
    <section className="py-20 bg-linear-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex justify-center items-center gap-2 text-sky-600 mb-3">
            <Plane className="w-6 h-6" />
            <span className="uppercase tracking-widest text-sm font-semibold">
              Explore the World
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Beautiful Places Around the World
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Travel to breathtaking destinations, discover new cultures,
            and create unforgettable memories with us.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-full text-sky-600">
                  {place.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {place.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {place.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <Star className="w-4 h-4" />
                  </div>

                  <Link to="/packages">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sky-600 font-semibold hover:underline"
                    >
                      Explore →
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldTravelSection;
