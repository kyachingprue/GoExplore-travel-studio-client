import { motion } from "motion/react";
import { Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryCards = () => {
  const navigate = useNavigate();

  const goToPackages = (country) => {
    navigate(`/packages?country=${country}`);
  };

  return (
    <section>
      <div className="text-center mb-10 px-4">
        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold"
        >
          <span className="bg-linear-to-r from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Explore Your Favorite Country
          </span>
        </motion.h2>

        {/* Sub Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto pb-5"
        >
          Discover unforgettable travel experiences, handpicked destinations,
          and exclusive packages tailored just for you.
        </motion.p>

      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 px-2 mb-24">

        {/* USA */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("USA")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/us.png"
            alt="USA"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">USA</p>
          </div>
        </motion.div>

        {/* Canada */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("Canada")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-red-500 to-rose-600 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/ca.png"
            alt="Canada"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">Canada</p>
          </div>
        </motion.div>

        {/* France */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("France")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-blue-600 to-purple-600 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/fr.png"
            alt="France"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">France</p>
          </div>
        </motion.div>

        {/* Switzerland */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("Switzerland")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-red-600 to-red-800 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/ch.png"
            alt="Switzerland"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">Switzerland</p>
          </div>
        </motion.div>

        {/* Japan */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("Japan")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-pink-500 to-red-500 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/jp.png"
            alt="Japan"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">Japan</p>
          </div>
        </motion.div>

        {/* Australia */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("Australia")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-sky-500 to-blue-700 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/au.png"
            alt="Australia"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">Australia</p>
          </div>
        </motion.div>

        {/* New Zealand */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("New Zealand")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-indigo-500 to-blue-800 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/nz.png"
            alt="New Zealand"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">New Zealand</p>
          </div>
        </motion.div>

        {/* Russia */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("Russia")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-gray-600 to-slate-800 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/ru.png"
            alt="Russia"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">Russia</p>
          </div>
        </motion.div>

        {/* Thailand */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("Thailand")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-emerald-500 to-teal-700 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/th.png"
            alt="Thailand"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">Thailand</p>
          </div>
        </motion.div>

        {/* Italy */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("Italy")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-green-500 to-emerald-700 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/it.png"
            alt="Italy"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">Italy</p>
          </div>
        </motion.div>

        {/* Bangladesh */}
        <motion.div
          whileHover={{ scale: 1.08, y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => goToPackages("Bangladesh")}
          className="cursor-pointer rounded-xl p-3 bg-linear-to-br from-green-600 to-lime-700 text-white shadow-lg"
        >
          <img
            src="https://flagcdn.com/w320/bd.png"
            alt="Bangladesh"
            className="w-full h-20 object-cover rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            <Plane className="w-5 h-5" />
            <p className="text-sm font-semibold mt-1">Bangladesh</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CategoryCards;
