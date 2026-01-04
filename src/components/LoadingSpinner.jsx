import { motion } from "motion/react";
import { Plane } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Spinner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: "linear",
          }}
          className="relative w-20 h-20 rounded-full
                     bg-linear-to-tr from-sky-500 via-blue-500 to-cyan-400 p-1"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            {/* Plane Icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="text-sky-500"
            >
              <Plane size={28} />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="text-sm tracking-widest font-semibold
                     bg-linear-to-r from-sky-500 via-blue-600 to-cyan-500
                     bg-clip-text text-transparent"
        >
          LOADING
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
