// AdminBlogs.jsx
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Plus,
  MapPin,
  Pencil,
  Trash2,
  Clock,
  User,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DynamicRating from "../../components/DynamicRating";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["admin-experiences"],
    queryFn: async () => {
      const res = await axiosSecure.get("/experiences");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="space-y-3">
          <p className="font-medium">
            Are you sure you want to delete this experience?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded-md border"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  await axiosSecure.delete(`/experiences/${id}`);
                  toast.dismiss(t.id);
                  toast.success("Experience data deleted successfully");
                  queryClient.invalidateQueries(["admin-experiences"]);
                } catch {
                  toast.error("Failed to delete experience");
                }
              }}
              className="px-3 py-1 rounded-md bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading experiences...</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">
          Experience / Blogs ({experiences.length})
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            navigate("/dashboard/admin/add-experience-card")
          }
          className="flex text-sm md:text-lg items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Experience Card
        </motion.button>
      </div>

      {/* No Data */}
      {experiences.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No experience data found
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 w-full object-cover"
                />
              </motion.div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} />
                  {item.location}
                </div>

                <DynamicRating rating={item.rating} />

                {/* Extra Data */}
                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    Duration: {item.duration}
                  </div>

                  <div className="flex items-center gap-2">
                    <User size={14} />
                    By: {item.createdBy}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      navigate(
                        `/dashboard/admin/experience-card-edit/${item._id}`
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-600 text-white text-sm"
                  >
                    <Pencil size={14} />
                    Edit
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-600 text-white text-sm"
                  >
                    <Trash2 size={14} />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
