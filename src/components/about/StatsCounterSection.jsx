import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const CounterItem = ({ value, label, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl md:text-4xl font-bold text-yellow-300">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-300 mt-1">{label}</p>
    </motion.div>
  );
};

const StatsCounterSection = () => {
  return (
    <div className="bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        <CounterItem label="Destinations" value={120} suffix="+" />
        <CounterItem label="Happy Travelers" value={50} suffix="K+" />
        <CounterItem label="Experiences" value={300} suffix="+" />
        <CounterItem label="Awards" value={25} suffix="+" />

      </div>
    </div>
  );
};

export default StatsCounterSection;
