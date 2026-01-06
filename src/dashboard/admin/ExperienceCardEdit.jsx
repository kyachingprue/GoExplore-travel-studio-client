import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ExperienceCardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axiosSecure.get(`/experiences/${id}`);
        reset(res.data); 
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load experience data", err);
      }
    };
    fetchExperience();
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { _id, ...payload } = data;
      await axiosSecure.patch(`/experiences/${id}`, payload);
      toast.success("Experience updated successfully");
      navigate("/dashboard/admin/blogs");
    } catch (err) {
      toast.error("Failed to update experience",err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading experience data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-300 rounded-2xl p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
           <ArrowLeft/>
          </button>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Edit Experience
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Experience Image URL</label>
            <input
              type="text"
              {...register("image")}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Experience Title</label>
            <input
              type="text"
              {...register("title")}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Location</label>
            <input
              type="text"
              {...register("location")}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Rating (1-5)</label>
            <input
              type="number"
              step="0.1"
              {...register("rating")}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Duration</label>
            <input
              type="text"
              {...register("duration")}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Descriptions */}
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-1 font-medium">Short Intro</label>
            <textarea
              {...register("shortIntro")}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 md:h-20 outline-none"
            />
          </div>

          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-1 font-medium">Full Experience Description</label>
            <textarea
              {...register("description")}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 md:h-20 outline-none"
            />
          </div>

          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-1 font-medium">Story-style Description</label>
            <textarea
              {...register("story")}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 md:h-20 outline-none"
            />
          </div>

          {/* Highlights */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Sunrise View Title</label>
            <input {...register("sunriseTitle")} className="px-4 py-2 rounded-md border border-gray-300" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Sunrise Image URL</label>
            <input {...register("sunriseImage")} className="px-4 py-2 rounded-md border border-gray-300" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Hill Trekking Title</label>
            <input {...register("trekTitle")} className="px-4 py-2 rounded-md border border-gray-300" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Hill Trekking Image URL</label>
            <input {...register("trekImage")} className="px-4 py-2 rounded-md border border-gray-300" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Local Food Title</label>
            <input {...register("foodTitle")} className="px-4 py-2 rounded-md border border-gray-300" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Local Food Image URL</label>
            <input {...register("foodImage")} className="px-4 py-2 rounded-md border border-gray-300" />
          </div>

          {/* Itinerary */}
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-1 font-medium">Day 1</label>
            <textarea {...register("day1")} className="px-4 py-2 rounded-md md:h-20 border border-gray-300" />
          </div>
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-1 font-medium">Day 2</label>
            <textarea {...register("day2")} className="px-4 py-2 md:h-20 rounded-md border border-gray-300" />
          </div>
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-1 font-medium">Day 3</label>
            <textarea {...register("day3")} className="px-4 py-2 md:h-20 rounded-md border border-gray-300" />
          </div>
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-1 font-medium">Day 4</label>
            <textarea {...register("day4")} className="px-4 py-2 md:h-20 rounded-md border border-gray-300" />
          </div>

          {/* Transport & Guide */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Transport Info</label>
            <input {...register("transport")} className="px-4 py-2 rounded-md border border-gray-300" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Guide Info</label>
            <input {...register("guide")} className="px-4 py-2 rounded-md border border-gray-300" />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            disabled={isSubmitting}
            className="md:col-span-2 lg:col-span-3 w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-3 rounded-lg mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Upload size={18} />
                Update Experience
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ExperienceCardEdit;
