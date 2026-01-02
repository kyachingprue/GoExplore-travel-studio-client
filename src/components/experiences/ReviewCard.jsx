import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Amazing experience! The trip was perfectly organized and unforgettable.",
  },
  {
    id: 2,
    name: "Sophia Lee",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    text: "Beautiful destinations and very friendly guides. Highly recommended!",
  },
  {
    id: 3,
    name: "Daniel Smith",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
    text: "Best travel experience of my life. Everything was smooth and safe.",
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    text: "Great service and stunning locations. Will travel again!",
  },
  {
    id: 5,
    name: "Donal Trump",
    image: "https://i.ibb.co.com/cKR1MQ0k/computer-scientists-who-made-history-5.jpg",
    rating: 4,
    text: "Excellent planning and smooth travel experience.",
  },
  {
    id: 6,
    name: "Elon Musk",
    image: "https://i.ibb.co.com/LXnmLRdc/elon-musk-royal-society.jpg",
    rating: 5,
    text: "Loved the destinations and the service quality.",
  }
];

const ReviewCard = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* responsive */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* controls */
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  /* auto slide */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* ✅ CORRECT WINDOW LOGIC */
  const getVisibleIndexes = () => {
    if (isMobile) return [index];

    const left = (index - 1 + reviews.length) % reviews.length;
    const right = (index + 1) % reviews.length;

    return [left, index, right];
  };

  const visibleIndexes = getVisibleIndexes();

  return (
    <div className="relative w-full py-16 overflow-hidden bg-linear-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Traveler Experiences
      </h2>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-3 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-3 rounded-full"
      >
        <ChevronRight />
      </button>

      <div className="relative flex justify-center items-center h-95">
        <AnimatePresence>
          {visibleIndexes.map((i) => {
            const review = reviews[i];
            if (!review) return null;

            const position =
              i === index
                ? "center"
                : i === visibleIndexes[0]
                  ? "left"
                  : "right";

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: position === "center" ? 1 : 0.4,
                  scale: position === "center" ? 1 : 0.85,
                  x:
                    position === "center"
                      ? 0
                      : position === "left"
                        ? -260
                        : 260,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-75 md:w-85 bg-white rounded-2xl shadow-xl p-6 text-center"
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-md"
                />

                <h3 className="mt-4 font-semibold text-lg">
                  {review.name}
                </h3>

                <div className="flex justify-center gap-1 my-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={18}
                      className={
                        idx < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm mt-3">
                  {review.text}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewCard;
