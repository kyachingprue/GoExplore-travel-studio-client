import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  MapPin,
  Globe,
  Clock,
  Star,
  DollarSign,
  Plane,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";

const PackageCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([])

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPackages(data)
    })
  },[])

  const packageData = packages.find(
    (item) => item.id === Number(id)
  );

  if (!packageData) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Package Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-blue-50 to-cyan-100 px-4 py-10 mt-12 md:mt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-6"
      >
        {/* Left Image */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <img
            src={packageData.image}
            alt={packageData.title}
            className="w-full h-full object-cover md:rounded-l-2xl"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-6 md:p-8 flex flex-col justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-sky-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent animate-pulse">
              {packageData.title}
            </h1>

            <p className="text-sm text-blue-600 font-medium mb-4 flex items-center gap-2">
              <Plane size={18} />
              {packageData.type}
            </p>

            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Globe className="text-sky-500" />
                <span>{packageData.country}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" />
                <span>{packageData.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-indigo-500" />
                <span>{packageData.duration}</span>
              </div>

              <div className="flex items-center gap-3">
                <Star className="text-yellow-500" />
                <span>{packageData.rating} / 5</span>
              </div>

              <div className="flex items-center gap-3 text-lg font-semibold">
                <DollarSign className="text-green-600" />
                <span>${packageData.price}</span>
              </div>
            </div>

            <p className="mt-5 text-gray-600 leading-relaxed">
              Explore the vibrant life of {packageData.location} with our
              carefully designed travel experience. Enjoy culture, food,
              landmarks, and unforgettable moments with expert guidance.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-gray-200 to-gray-300 text-gray-800 font-medium"
            >
              <ArrowLeft size={18} />
              Go Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-linear-to-r from-sky-500 via-blue-500 to-cyan-500 shadow-lg"
            >
              <ShoppingCart size={18} />
              Add To Cart
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PackageCardDetails;
