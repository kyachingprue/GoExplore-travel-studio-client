import React, { useState } from "react";
import { motion } from "motion/react";
import { Plane } from "lucide-react";

// Airport companies data
const companies = [
  {
    name: "Dubai Airports",
    logo: "https://i.ibb.co.com/TMCJsyt2/dubai-airport.png",
  },
  {
    name: "Heathrow Airport",
    logo: "https://i.ibb.co.com/KccgLKDW/depositphotos-278131484-stock-illustration-brisbane-international-airport-logo-airport.webp",
  },
  {
    name: "Singapore Changi",
    logo: "https://i.ibb.co.com/4RXbvBBx/istockphoto-1288682284-612x612.jpg",
  },
  {
    name: "Hartsfield-Jackson Atlanta",
    logo: "https://i.ibb.co.com/mF1K7n9M/hartsfield-jackson-atlanta-stamp-airport-260nw-1860774166.png",
  },
  {
    name: "Tokyo Haneda",
    logo: "https://i.ibb.co.com/LdfH8nsR/tokyo-airport.jpg",
  },
  {
    name: "Incheon Airport",
    logo: "https://i.ibb.co.com/T63K5VG/incheon-airport-seoul-stamp-airport-logo-vector-illustration-seoul-aeroport-country-flag-incheon-air.png",
  },
];

// Function to calculate rotation based on cursor position
const calculateRotation = (e, element) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y / rect.height) - 0.5) * 30; // Top - bottom
  const rotateY = ((x / rect.width) - 0.5) * -30; // Left - right
  return { rotateX, rotateY };
};

const CompanyCard = () => {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  return (
    <div className="w-full h-full md:h-120 bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 p-10">
      <h2 className="text-gray-800 text-2xl md:text-3xl font-bold mb-10 text-center">
        Top Airport Companies
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {companies.map((company, index) => (
          <motion.div
            key={index}
            onMouseMove={(e) => {
              const { rotateX, rotateY } = calculateRotation(e, e.currentTarget);
              setRotation({ rotateX, rotateY });
            }}
            onMouseLeave={() => setRotation({ rotateX: 0, rotateY: 0 })}
            animate={{ rotateX: rotation.rotateX, rotateY: rotation.rotateY }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-linear-to-br from-white via-gray-100 to-gray-200 rounded-xl shadow-lg py-3 flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-full rounded-md full px-3 object-contain mb-4"
            />
            <div className="flex justify-center items-center gap-2">
              <Plane className="w-8 h-8 text-gray-500 mb-2" />
              <h3 className="text-gray-800 font-semibold text-md text-center">
                {company.name}
              </h3>
           </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCard;
