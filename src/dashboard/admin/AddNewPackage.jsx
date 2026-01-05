import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const countries = [
  "USA",
  "Canada",
  "France",
  "Switzerland",
  "Japan",
  "Australia",
  "New Zealand",
  "Russia",
  "Thailand",
  "Italy",
  "Bangladesh",
];

const AddNewPackage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const newPackage = {
      ...data,
      price: Number(data.price),
      rating: Number(data.rating),
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/packages", newPackage);
      toast.success("Package added successfully!");
      reset();
      navigate("/dashboard/admin/packages");
    } catch (error) {
      toast.error("Failed to add package", error);
    }
  };

  return (
    <div className="min-h-screen md:p-8 bg-linear-to-br from-sky-100 via-sky-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 md:p-10"
      >
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Add New Package
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div>
            <label className="label">Package Title</label>
            <input
             type="text"
              {...register("title", { required: true })}
              className="input input-bordered border border-gray-300 rounded-md py-1.5 px-4 w-full"
              placeholder="package title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="label">Country</label>
            <select
              {...register("country", { required: true })}
              className="select select-bordered border border-gray-300 rounded-md py-1.5 px-4 w-full"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">Country is required</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
             type="text"
              {...register("location", { required: true })}
              className="input input-bordered border border-gray-300 rounded-md py-1.5 px-4 w-full"
              placeholder="travel location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">Location is required</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="label">Price ($)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered border border-gray-300 rounded-md py-1.5 px-4 w-full"
              placeholder="price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Price is required</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="label">Duration</label>
            <input
              type="text"
              {...register("duration", { required: true })}
              className="input input-bordered border border-gray-300 rounded-md py-1.5 px-4 w-full"
              placeholder="days"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">Duration is required</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="label">Rating</label>
            <input
              type="number"
              step="0.1"
              {...register("rating", { required: true })}
              className="input input-bordered border border-gray-300 rounded-md py-1.5 px-4 w-full"
              placeholder="rating number"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">Rating is required</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="label">Package Type</label>
            <input
              {...register("type", { required: true })}
              className="input input-bordered border border-gray-300 rounded-md py-1.5 px-4 w-full"
              placeholder="Beach / Adventure"
            />
            {errors.type && (
              <p className="text-red-500 text-sm">Type is required</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="label">Image URL</label>
            <input
              {...register("image", { required: true })}
              className="input input-bordered border border-gray-300 rounded-md py-1.5 px-4 w-full"
              placeholder="https://image-url.com"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <motion.button
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2
                ${isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700"
                }
              `}
            >
              {isSubmitting && <Loader2 className="animate-spin" size={18} />}
              {isSubmitting ? "Adding Package..." : "Add Package"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddNewPackage;
