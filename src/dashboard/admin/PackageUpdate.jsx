import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import toast from "react-hot-toast";
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

const PackageUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: pkg = {}, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages/${id}`);
      return res.data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedPackage = {
      title: form.title.value,
      country: form.country.value,
      location: form.location.value,
      price: Number(form.price.value),
      duration: form.duration.value,
      rating: Number(form.rating.value),
      type: form.type.value,
      image: form.image.value,
    };

    try {
      await axiosSecure.patch(`/packages/${id}`, updatedPackage);
      toast.success("Package update successful!");
      navigate("/dashboard/admin/packages");
    } catch (error) {
      toast.error("Package update failed!", error);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-br from-sky-100 via-sky-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 md:p-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Update Package
        </h2>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Package Title
            </label>
            <input
              name="title"
              defaultValue={pkg?.title}
              className="input input-bordered border border-gray-300 py-1.5 px-4 rounded-md w-full"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Country
            </label>
            <select
              name="country"
              defaultValue={pkg?.country}
              className="select select-bordered border border-gray-300 py-1.5 px-4 rounded-md w-full"
              required
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Location
            </label>
            <input
              name="location"
              defaultValue={pkg?.location}
              className="input input-bordered border border-gray-300 py-1.5 px-4 rounded-md w-full"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              defaultValue={pkg?.price}
              className="input input-bordered border border-gray-300 py-1.5 px-4 rounded-md w-full"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Duration
            </label>
            <input
              name="duration"
              defaultValue={pkg?.duration}
              className="input input-bordered border border-gray-300 py-1.5 px-4 rounded-md w-full"
              placeholder="6 days"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              name="rating"
              defaultValue={pkg?.rating}
              className="input input-bordered border border-gray-300 py-1.5 px-4 rounded-md w-full"
              required
            />
          </div>

          {/* Package Type */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Package Type
            </label>
            <input
              name="type"
              defaultValue={pkg?.type}
              className="input input-bordered border border-gray-300 py-1.5 px-4 rounded-md w-full"
              placeholder="Beach / Adventure / Tour"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Image URL
            </label>
            <input
              name="image"
              defaultValue={pkg?.image}
              className="input input-bordered border border-gray-300 py-1.5 px-4 rounded-md w-full"
              required
            />
          </div>

          {/* Image Preview */}
          {pkg?.image && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={pkg.image}
                alt="preview"
                className="h-40 rounded-2xl object-cover border border-sky-300 shadow"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
            >
              Update Package
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PackageUpdate;
