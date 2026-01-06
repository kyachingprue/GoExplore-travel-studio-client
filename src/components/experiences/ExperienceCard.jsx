import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { MapPin, Eye, Loader2 } from "lucide-react";
import DynamicRating from "../DynamicRating";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ExperienceCard = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch experiences from server
  const { data: experiences = [], isLoading, isError } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await axiosSecure.get("/experiences");
      return res.data;
    },
  });


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-gray-500 text-lg">Loading experiences...</p>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Failed to load experiences</div>;
  }

  return (
    <section className="w-full mx-auto min-h-screen md:p-10">
      <div className="text-center mb-8">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl pt-6 font-bold text-gray-800 mb-5">
          Explore Our Amazing Experiences
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-center px-4 md:px-0 md:w-8/12 md:text-lg mx-auto">
          Discover unforgettable adventures, unique local experiences, and curated travel journeys.
          Each experience card provides you with all the details you need, including highlights,
          itineraries, and expert guides to make your trip memorable.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {experiences.map((experience) => (
          <motion.div
            key={experience._id}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <motion.div
              className="relative h-60 w-full overflow-hidden"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={experience.image}
                alt={experience.title}
                className="h-full w-full object-cover transition-transform duration-500"
              />
            </motion.div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{experience.title}</h3>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} /> {experience.location}
              </div>

              <div className="flex items-center gap-2">
                <DynamicRating rating={experience.rating} />
                <span className="text-gray-500 text-sm">{experience.rating}/5</span>
              </div>

              <div className="text-gray-600 text-sm">Duration: {experience.duration}</div>
              <div className="text-gray-700 text-sm">{experience.shortIntro}</div>

              <div className="text-gray-500 text-xs">
                Created By: {experience.createdBy}
              </div>
              <div className="text-gray-500 text-xs">
                Created At: {new Date(experience.createdAt).toLocaleDateString()}
              </div>

              {/* View Details Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/experience/${experience._id}`)}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-lg"
              >
                <Eye size={16} />
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
   </section>
  );
};

export default ExperienceCard;
