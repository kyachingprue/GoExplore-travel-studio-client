// ExperienceCardDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DynamicRating from "../DynamicRating";

const ExperienceCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axiosSecure.get(`/experiences/${id}`);
        setExperience(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id, axiosSecure]);

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;

  if (!experience)
    return <div className="text-center py-20 text-red-500">Experience not found</div>;

  return (
    <div className="min-h-screen bg-sky-100 p-6 mt-12 md:mt-16 md:p-12">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl md:text-2xl font-bold ml-3 text-gray-800">
          {experience.title}
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-xl hover:shadow-sm p-6"
      >
        {/* Left: Image */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>

        {/* Right: Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">
            {experience.title}
          </h2>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} /> {experience.location}
          </div>

          <div className="flex items-center gap-2">
            <DynamicRating rating={experience.rating} />
            <span className="text-gray-500">{experience.rating}/5</span>
          </div>

          <div className="text-gray-600">Duration: {experience.duration}</div>
          <div className="text-gray-700">{experience.shortIntro}</div>
          <div className="text-gray-500 text-sm">Created By: {experience.createdBy}</div>
          <div className="text-gray-500 text-sm">
            Created At: {new Date(experience.createdAt).toLocaleDateString()}
          </div>
        </div>
      </motion.div>

      {/* Detailed sections */}
      <div className="mt-8 space-y-8">
        {/* Full Description */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Full Experience Description</h3>
          <p className="text-gray-700">{experience.description}</p>
        </div>

        {/* Story */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Story-style Description</h3>
          <p className="text-gray-700">{experience.story}</p>
        </div>

        {/* Highlights */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-sm space-y-4">
          <h3 className="text-xl font-semibold">Highlights</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <img
                src={experience.sunriseImage}
                alt={experience.sunriseTitle}
                className="w-full h-52 object-cover rounded-lg"
              />
              <p className="mt-2 text-gray-700 text-center">{experience.sunriseTitle}</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={experience.trekImage}
                alt={experience.trekTitle}
                className="w-full h-52 object-cover rounded-lg"
              />
              <p className="mt-2 text-gray-700 text-center">{experience.trekTitle}</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={experience.foodImage}
                alt={experience.foodTitle}
                className="w-full h-52 object-cover rounded-lg"
              />
              <p className="mt-2 text-gray-700 text-center">{experience.foodTitle}</p>
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-sm space-y-3">
          <h3 className="text-xl font-semibold">Itinerary</h3>
          <p><span className="font-semibold">Day 1:</span> {experience.day1}</p>
          <p><span className="font-semibold">Day 2:</span> {experience.day2}</p>
          <p><span className="font-semibold">Day 3:</span> {experience.day3}</p>
          <p><span className="font-semibold">Day 4:</span> {experience.day4}</p>
        </div>

        {/* Transport & Guide */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-sm space-y-2">
          <h3 className="text-xl font-semibold">Transport & Guide</h3>
          <p><span className="font-semibold">Transport:</span> {experience.transport}</p>
          <p><span className="font-semibold">Guide:</span> {experience.guide}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCardDetails;
