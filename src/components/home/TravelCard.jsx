import { motion } from "motion/react";

const travelData = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://i.ibb.co.com/21kZ4xMV/1-1100x700.jpg",
    desc: "The city of love and lights with Eiffel Tower.",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "https://i.ibb.co.com/zVfM5CDT/Bali.jpg",
    desc: "Beautiful beaches, temples and tropical adventures.",
  },
  {
    id: 3,
    name: "Maldives",
    image: "https://i.ibb.co.com/b58QR0Wt/TAL-conrad-maldives-rangali-island-MALDIVESHOTELS1024-6dfdeac00fec4f69893e7576b5896da9.jpg",
    desc: "Crystal clear waters and luxury island resorts.",
  },
  {
    id: 4,
    name: "Swiss Alps, Switzerland",
    image: "https://i.ibb.co.com/RpR5Vn6H/Zermatt-town-Matterhorn-mountain-Valais-canton-Switzerland.jpg",
    desc: "Snowy mountains, scenic trails and adventure sports.",
  },
  {
    id: 5,
    name: "Dubai, UAE",
    image: "https://i.ibb.co.com/vx9R7tmL/Dubai-1080x675.jpg",
    desc: "Luxury shopping, modern architecture, desert safari.",
  },
  {
    id: 6,
    name: "Rome, Italy",
    image: "https://i.ibb.co.com/B54ZVvxQ/italy-city.jpg",
    desc: "Historical landmarks, art and amazing cuisine.",
  },
  {
    id: 7,
    name: "Kyoto, Japan",
    image: "https://i.ibb.co.com/900FcDV/temple-kyoto-japan-16x9.jpg",
    desc: "Ancient temples, cherry blossoms, rich culture.",
  },
  {
    id: 8,
    name: "New York, USA",
    image: "https://i.ibb.co.com/mrfCPsX9/pierre-blache-VMNG8-BYFQfs-unsplash.jpg",
    desc: "City that never sleeps, iconic skyline and lifestyle.",
  },
  {
    id: 9,
    name: "Santorini, Greece",
    image: "https://i.ibb.co.com/kVVtCt20/Santorini-Evening-in-Santorini-Thira-town-and-Aegean-sea-at-sundown-Greece-Landscape-1000x640.jpg",
    desc: "Blue domes, white houses, stunning sunsets.",
  },
  {
    id: 10,
    name: "Sydney, Australia",
    image: "https://i.ibb.co.com/rK3NgQ7R/Australia-Sydney-1536x922.jpg",
    desc: "Harbour bridge, Opera house and beautiful beaches.",
  },
  {
    id: 11,
    name: "Machu Picchu, Peru",
    image: "https://i.ibb.co.com/Wvvp4bkC/Machu-Picchu-Peru-737091554300988.jpg",
    desc: "Ancient Inca city in the mountains.",
  },
  {
    id: 12,
    name: "Istanbul, Turkey",
    image: "https://i.ibb.co.com/bg2WT28n/istanbul-gezilecek-yerler.jpg",
    desc: "Blend of Asia and Europe, historical mosques and bazaars.",
  },
];

const TravelCard = () => {
  return (
    <section className="py-16 bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-7 text-center">
          Explore Our Top Destinations
        </h2>
        <p className="text-gray-300 text-center max-w-2xl pb-16 mx-auto">
          Discover breathtaking destinations around the world. From pristine beaches to majestic mountains, vibrant cities to hidden gems, embark on unforgettable journeys crafted for every traveler.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {travelData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
            >
              <div
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelCard;
