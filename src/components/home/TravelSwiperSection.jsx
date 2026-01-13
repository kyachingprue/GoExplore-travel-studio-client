import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react";
import { MapPin, Plane } from "lucide-react";

import "swiper/css";

const travelPlaces = [
  {
    id: 1,
    title: "Eiffel Tower",
    country: "France",
    description: "Feel the romance and beauty of Paris from the iconic Eiffel Tower.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
  {
    id: 2,
    title: "Bali Beach",
    country: "Indonesia",
    description: "Tropical paradise with crystal clear water and peaceful vibes.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 3,
    title: "Mount Fuji",
    country: "Japan",
    description: "Discover nature, culture, and breathtaking mountain views.",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58",
  },
  {
    id: 4,
    title: "Santorini",
    country: "Greece",
    description: "White buildings, blue domes, and stunning sunset views.",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  },
];

const TravelSwiperSection = () => {
  return (
    <section className="py-20 bg-linear-to-b from-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-2 text-sky-600 mb-3">
            <Plane className="w-6 h-6" />
            <span className="uppercase tracking-widest text-sm font-semibold">
              Popular Destinations
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Discover Amazing Places
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Explore the world’s most beautiful travel destinations with smooth
            experiences and unforgettable journeys.
          </p>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {travelPlaces.map((place) => (
            <SwiperSlide key={place.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative h-105 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                {/* Image */}
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-10 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-2">
                    {place.title}
                  </h3>

                  <p className="text-sm text-gray-200 mb-3">
                    {place.description}
                  </p>

                  <div className="flex items-center gap-2 text-sky-300 font-medium">
                    <MapPin className="w-4 h-4" />
                    <span>{place.country}</span>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default TravelSwiperSection;
