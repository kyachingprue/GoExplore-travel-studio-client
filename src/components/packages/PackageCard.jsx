import { motion } from "motion/react";
import { MapPin, Clock, Star, Plane } from "lucide-react";

const PackageCard = ({ pkg }) => {
  const {
    title,
    country,
    location,
    price,
    duration,
    rating,
    image,
    type,
  } = pkg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row"
    >
      {/* Image Section */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="md:w-2/4 w-full h-56 md:h-auto overflow-hidden relative"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Floating Plane Icon */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-full shadow"
        >
          <Plane size={18} className="text-gray-700" />
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">

        {/* Top Content */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            {location}, {country}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star
                    size={16}
                    className={
                      i < Math.round(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating}
            </span>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock size={16} /> {duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {type}
            </span>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">
            ${price}
            <span className="text-sm font-normal text-gray-500">
              {" "} / person
            </span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-full text-sm font-medium bg-linear-to-r from-gray-700 to-gray-900 text-white flex items-center gap-2"
          >
            <Plane size={16} />
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
