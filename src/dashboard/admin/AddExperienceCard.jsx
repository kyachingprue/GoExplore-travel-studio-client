import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddExperienceCard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const experienceData = {
      ...data,
      rating: Number(data.rating),
      createdBy: user?.email,
      createdAt: new Date(),
      highlights: [
        { title: data.sunriseTitle, image: data.sunriseImage },
        { title: data.trekTitle, image: data.trekImage },
        { title: data.foodTitle, image: data.foodImage },
      ],
      itinerary: [
        { day: 1, plan: data.day1 },
        { day: 2, plan: data.day2 },
        { day: 3, plan: data.day3 },
        { day: 4, plan: data.day4 },
      ],
    };

    try {
      await axiosSecure.post("/experiences", experienceData);
      toast.success("Experience uploaded successfully");
      navigate("/dashboard/admin/blogs");
    } catch (error) {
      toast.error("Failed to upload experience", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 w-full bg-sky-300 rounded-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className=" text-xl md:text-2xl font-bold text-black">
          Add New Experience
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 bg-sky-50 px-10 py-7 rounded-lg gap-4"
      >
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Experience Image URL
          </label>
          <input
          type="url"
            {...register("image", { required: true })}
            placeholder="https://image-url"
            className="w-full px-4 py-1.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Experience Title
          </label>
          <input
          type="text"
            {...register("title", { required: true })}
            placeholder="Experience title"
            className="w-full px-4 py-1.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Location
          </label>
          <input
          type="text"
            {...register("location", { required: true })}
            placeholder="Location"
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Rating (1–5)
          </label>
          <input
          type="number"
            {...register("rating", { required: true })}
            placeholder="4.8"
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
          type="text"
            {...register("duration", { required: true })}
            placeholder="4 Days"
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Short Intro
          </label>
          <textarea
            {...register("shortIntro", { required: true })}
            rows={2}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300 resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Full Experience Description
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={3}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300 resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Story-Style Description
          </label>
          <textarea
            {...register("story", { required: true })}
            rows={3}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300 resize-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Sunrise View Title
          </label>
          <input
          type="text"
            {...register("sunriseTitle", { required: true })}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Sunrise Image URL
          </label>
          <input
          type="url"
            {...register("sunriseImage", { required: true })}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Hill Trekking Title
          </label>
          <input
          type="text"
            {...register("trekTitle", { required: true })}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Hill Trekking Image URL
          </label>
          <input
          type="url"
            {...register("trekImage", { required: true })}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Local Food Title
          </label>
          <input
          type="text"
            {...register("foodTitle", { required: true })}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Local Food Image URL
          </label>
          <input
          type="url"
            {...register("foodImage", { required: true })}
            className="w-full px-4 py-1.5 rounded-md border border-gray-300"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Day 1 – Arrival & Activities
          </label>
          <textarea {...register("day1", { required: true })} className="w-full px-4 py-1.5 rounded-md border border-gray-300" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Day 2 – Main Experience
          </label>
          <textarea {...register("day2", { required: true })} className="w-full px-4 py-1.5 rounded-md border border-gray-300" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Day 3 – Experience Activities
          </label>
          <textarea {...register("day3", { required: true })} className="w-full px-4 py-1.5 rounded-md border border-gray-300" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Day 4 – Return
          </label>
          <textarea {...register("day4", { required: true })} className="w-full px-4 py-1.5 rounded-md border border-gray-300" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Transport
          </label>
          <input type="text" {...register("transport", { required: true })} className="w-full px-4 py-1.5 rounded-md border border-gray-300" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Guide
          </label>
          <input type="text" {...register("guide", { required: true })} className="w-full px-4 py-1.5 rounded-md border border-gray-300" />
        </div>

        <div className="md:col-span-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Experience Card
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddExperienceCard;
