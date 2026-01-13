import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Plane, MapPin, Home } from "lucide-react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ErrorPage = () => {
  useDocumentTitle("404 Not Found");
  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-16 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 right-16 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-xl"
      >
        <Plane className="mx-auto mb-6 text-yellow-300" size={64} />

        <h1 className="text-7xl font-extrabold bg-linear-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Oops! You’re Off the Map
        </h2>

        <p className="mt-3 text-gray-300">
          The destination you’re looking for doesn’t exist.
          Let’s get you back on track and explore something amazing.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            to="/packages"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white hover:bg-white hover:text-black transition"
          >
            <MapPin size={18} />
            Explore Packages
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ErrorPage;
