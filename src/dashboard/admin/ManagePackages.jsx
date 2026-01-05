import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Edit, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManagePackages = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: packages = [],
    refetch,
  } = useQuery({
    queryKey: ["admin-packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-linear-to-br from-sky-400 to-blue-500 text-white rounded-xl shadow-lg max-w-md">
          <span className="text-white font-semibold text-sm md:text-base">
            Are you sure you want to delete this package?
          </span>

          <div className="flex gap-3 mt-3 md:mt-0">
            {/* Delete Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-600 rounded-lg font-medium shadow hover:bg-red-700"
              onClick={async () => {
                try {
                  await axiosSecure.delete(`/packages/${id}`);
                  toast.success("Package deleted successfully!");
                  refetch(); // refetch your packages data
                } catch {
                  toast.error("Failed to delete package");
                }
                toast.dismiss(t.id);
              }}
            >
              Delete
            </motion.button>

            {/* Cancel Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium shadow hover:bg-gray-200"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  };


  return (
    <div className=" md:p-4 bg-linear-to-br from-sky-50 to-blue-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Packages ({packages.length})</h2>

        <button
          onClick={() => navigate("/dashboard/admin/add-new-package")}
          className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition"
        >
          <Plus size={18} />
          Add New Package
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-sky-200 text-gray-700">
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Country</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="border border-gray-400">
            {packages.map((item) => (
              <motion.tr
                key={item._id}
                whileHover={{ scale: 1.01 }}
                className="hover:bg-sky-100"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <span className="font-medium">{item.title}</span>
                </td>

                <td className="px-4 py-3 font-semibold text-sky-600">
                  ${item.price}
                </td>

                <td className="px-4 py-3">{item.country}</td>

                <td className="px-4 py-3">{item.location}</td>

                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/admin/package-update/${item._id}`
                      )
                    }
                    className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePackages;
