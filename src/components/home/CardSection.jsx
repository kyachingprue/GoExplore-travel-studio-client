import { useState } from "react";
import { motion } from "motion/react";
import { Plane, MapPin, ShieldCheck, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const accordionData = [
  {
    title: "Handpicked Travel Packages",
    content:
      "Carefully curated travel packages designed by experts to give you unforgettable experiences across the globe.",
    icon: <MapPin className="w-5 h-5 text-sky-500" />,
  },
  {
    title: "Safe & Secure Journey",
    content:
      "Your safety is our priority. We ensure verified guides, secure bookings, and trusted travel partners.",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
  },
  {
    title: "Expert Travel Guidance",
    content:
      "Connect with experienced travel experts and get personalized recommendations for your next adventure.",
    icon: <Plane className="w-5 h-5 text-indigo-500" />,
  },
];

const CardSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="relative py-16 px-4 md:px-10 bg-linear-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              alt="Travel Adventure"
              className="w-full h-105 object-cover scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 bg-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">
            <Plane className="w-5 h-5 text-sky-500" />
            <span className="font-semibold text-slate-700">
              Explore the World
            </span>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            Discover Your Next <br />
            <span className="bg-linear-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              Travel Adventure
            </span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-xl">
            Travel with confidence and comfort. We help you explore breathtaking
            destinations with carefully planned journeys and unforgettable
            experiences.
          </p>

          {/* ACCORDION */}
          <div className="mt-8 space-y-4">
            {accordionData.map((item, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl bg-white shadow-sm"
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-semibold text-slate-700">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === index ? "auto" : 0,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-5"
                >
                  <p className="pb-4 text-slate-600">{item.content}</p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/packages")}
            className="mt-8 inline-flex items-center gap-3 px-7 py-3 rounded-full
                       bg-linear-to-r from-sky-500 via-blue-500 to-indigo-600
                       text-white font-semibold shadow-lg hover:shadow-xl"
          >
            Explore Packages
            <Plane className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CardSection;
