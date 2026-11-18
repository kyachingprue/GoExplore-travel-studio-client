import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";
import TravelCard from '../components/home/TravelCard';
import CompanyCard from '../components/home/CompanyCard';
import CardSection from '../components/home/CardSection';
import CategoryCards from '../components/home/CategoryCards';
import WorldTravelSection from '../components/home/WorldTravelSection';
import TravelSwiperSection from '../components/home/TravelSwiperSection';
import Banner from '../components/home/Banner';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  const [scrollState, setScrollState] = useState({ visible: false, progress: 0 });
  const shouldReduceMotion = useReducedMotion();

  useDocumentTitle("Home");

  useEffect(() => {
    let frameId;

    const updateScrollState = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollableHeight > 0
            ? Math.min((window.scrollY / scrollableHeight) * 100, 100)
            : 0;

        setScrollState({
          visible: window.scrollY > 420,
          progress,
        });
      });
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const revealProps = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: shouldReduceMotion ? 0 : 0.65, ease: "easeOut" },
  };

  const scrollToTop = () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <div className="relative overflow-hidden bg-slate-50">
      <Banner/>
      <motion.div {...revealProps}><CompanyCard /></motion.div>
      <motion.div {...revealProps}><CategoryCards /></motion.div>
      <motion.div {...revealProps}><WorldTravelSection /></motion.div>
      <motion.div {...revealProps}><CardSection /></motion.div>
      <motion.div {...revealProps}><TravelSwiperSection/></motion.div>
      <motion.div {...revealProps}><TravelCard /></motion.div>

      <AnimatePresence>
        {scrollState.visible && (
          <motion.button
            type="button"
            aria-label="Scroll back to top"
            title="Back to top"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl shadow-slate-950/25 ring-1 ring-white/20 transition-colors hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600"
          >
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeWidth="2"
              />
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={Math.PI * 50}
                strokeDashoffset={Math.PI * 50 * (1 - scrollState.progress / 100)}
                strokeLinecap="round"
              />
            </svg>
            <ArrowUp aria-hidden="true" size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;