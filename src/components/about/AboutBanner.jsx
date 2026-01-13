import { motion } from "motion/react";
import {
  Globe,
  Compass,
  Leaf,
  Users,
  Award,
  MapPin,
  ArrowRight,
} from "lucide-react";
import StatsCounterSection from "./StatsCounterSection";

const AboutBanner = () => {
  return (
    <section className="bg-linear-to-b from-slate-950 via-indigo-950 to-purple-950 text-white mt-12 md:mt-16 overflow-hidden">

      <section className="relative min-h-[66vh] flex items-center overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/Ps09zNHJ/caption.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/80" />

        {/* Floating Accent */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-12 left-16 w-28 h-28 bg-yellow-400/20 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-yellow-300 mb-3">
              <MapPin size={18} />
              <span className="text-sm uppercase tracking-wide">About</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Discover Our <br />
              <span className="bg-linear-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent">
                Story
              </span>
            </h1>

            <p className="mt-4 text-gray-200">
              We believe travel should be inspiring, responsible, and unforgettable.
              GoExplore connects travelers with experiences that matter.
            </p>

            {/* Breadcrumb / CTA */}
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-300">
              <MapPin size={16} />
              <span>Home</span>
              <ArrowRight size={14} />
              <span className="text-white">About</span>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            GoExplore was born from a passion for discovering the world in a
            meaningful way. We curate eco-friendly tours, cultural journeys,
            and adventure experiences that connect travelers with nature and people.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            From mountain treks to ocean escapes, our mission is to make travel
            seamless, safe, and enriching for everyone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-6"
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center">
            <Globe className="mx-auto text-yellow-300" size={32} />
            <h4 className="mt-3 font-semibold">Global Reach</h4>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center">
            <Compass className="mx-auto text-cyan-300" size={32} />
            <h4 className="mt-3 font-semibold">Expert Guides</h4>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center">
            <Leaf className="mx-auto text-green-300" size={32} />
            <h4 className="mt-3 font-semibold">Eco Friendly</h4>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center">
            <MapPin className="mx-auto text-pink-300" size={32} />
            <h4 className="mt-3 font-semibold">Unique Destinations</h4>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <StatsCounterSection/>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users size={32} />,
              title: "Community First",
              desc: "Supporting local communities through responsible tourism.",
            },
            {
              icon: <Award size={32} />,
              title: "Excellence",
              desc: "Delivering high-quality experiences with trusted partners.",
            },
            {
              icon: <Leaf size={32} />,
              title: "Sustainability",
              desc: "Protecting nature for future generations.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{
                y: -12,
                scale: 1.04,
                boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
              }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center cursor-pointer"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 8, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-yellow-300 mx-auto mb-5 w-fit"
              >
                {item.icon}
              </motion.div>

              {/* Title */}
              <h4 className="text-xl font-semibold">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-gray-300 mt-3 leading-relaxed">
                {item.desc}
              </p>

              {/* Accent Line */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "40%" }}
                transition={{ duration: 0.4 }}
                className="h-0.5 bg-yellow-300 mx-auto mt-6"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
