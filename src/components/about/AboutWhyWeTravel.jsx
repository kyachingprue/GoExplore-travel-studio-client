import { motion } from "motion/react";
import {
  Globe,
  Compass,
  Route,
} from "lucide-react";

const AboutWhyWeTravel = () => {
  return (
    <section className="py-24 bg-sky-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sky-500 uppercase tracking-widest text-sm">
            Why We Travel
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Travel Changes the Way
            <br className="hidden sm:block" />
            <span className="text-sky-500"> We See the World</span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Traveling is more than moving between places. It is about
            discovering perspectives, connecting with people, and experiencing
            moments that stay with us forever.
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 h-105 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {/* Large Image */}
          <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden group shadow-xl">
            <img
              src="https://i.ibb.co.com/LDt5zx4N/qgckc648-air-travel-625x300-26-May-25.jpg"
              alt="Mountain Travel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Image 2 */}
          <div className="rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://i.ibb.co.com/JwcT0G3n/1609912605-great-wall.jpg"
              alt="City Travel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Image 3 */}
          <div className="rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Beach Travel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Image 4 */}
          <div className="rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              alt="Forest Travel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Image 5 */}
          <div className="rounded-2xl overflow-hidden group shadow-md">
            <img
              src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef"
              alt="Desert Travel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left">
          {[
            {
              icon: <Compass className="w-7 h-7" />,
              title: "Guided by Curiosity",
              desc: "Every journey starts with curiosity. We follow it to places that inspire and educate.",
            },
            {
              icon: <Route className="w-7 h-7" />,
              title: "Journeys with Purpose",
              desc: "Our trips are thoughtfully designed to create meaningful experiences, not just visits.",
            },
            {
              icon: <Globe className="w-7 h-7" />,
              title: "Connected World",
              desc: "We believe travel connects people, cultures, and stories across the globe.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-sky-50 rounded-2xl p-7 shadow-md"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-sky-100 text-sky-500 rounded-xl mb-5">
                {item.icon}
              </div>

              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h4>

              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutWhyWeTravel;
