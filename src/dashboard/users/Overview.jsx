import { motion } from "motion/react";
import useAuth from "../../hooks/useAuth";

const Overview = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[70vh] flex">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full rounded-3xl p-8 md:p-12
                   bg-linear-to-br from-sky-500 via-blue-500 to-indigo-600
                   shadow-2xl text-white"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4"
        >
          Welcome,
          <span
            className="ml-2 bg-linear-to-r from-yellow-300 via-pink-300 to-white
                       bg-clip-text text-transparent font-bold"
          >
            {user?.displayName || "Traveler"}
          </span>
        </motion.h1>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/90 text-sm sm:text-base leading-relaxed"
        >
          Welcome to <span className="font-semibold">GoExplore</span> — your
          gateway to unforgettable journeys, breathtaking destinations, and
          carefully crafted travel experiences around the world.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-0.5 mt-6 bg-linear-to-r from-white/20 via-white/60 to-white/20"
        />

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-xs sm:text-sm text-white/80"
        >
          Start exploring your bookings, wishlist, and upcoming adventures ✈️🌍
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Overview;
