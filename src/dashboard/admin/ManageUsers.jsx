import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users except admin
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?excludeRole=admin");
      return res.data
    }
  });

 
  // Delete user function with toast confirmation
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-linear-to-br from-sky-400 to-blue-500 text-white rounded-xl shadow-lg max-w-md">
          <span className="text-white font-semibold text-sm md:text-base">
            Are you sure you want to delete this user?
          </span>
          <div className="flex gap-3 mt-3 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-600 rounded-lg font-medium shadow hover:bg-red-700"
              onClick={async () => {
                try {
                  await axiosSecure.delete(`/users/${id}`);
                  toast.success("User deleted successfully!");
                  refetch();
                } catch {
                  toast.error("Failed to delete user");
                }
                toast.dismiss(t.id);
              }}
            >
              Delete
            </motion.button>

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 bg-linear-to-br from-sky-50 via-sky-100 to-blue-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-sky-300 animate-pulse"></div>
          <div className="w-48 h-6 rounded bg-sky-300 animate-pulse mt-4"></div>
          <div className="w-64 h-4 rounded bg-sky-200 animate-pulse mt-2"></div>
        </div>

        <div className="w-full max-w-5xl mt-10 space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow animate-pulse"
            >
              <div className="w-10 h-10 rounded-full bg-sky-300"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-sky-300 rounded"></div>
                <div className="h-3 w-2/3 bg-sky-200 rounded"></div>
              </div>
              <div className="w-20 h-6 bg-sky-300 rounded"></div>
            </div>
          ))}
        </div>

        <p className="text-gray-500 mt-6 font-medium">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-br from-sky-50 via-sky-100 to-blue-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 rounded-xl shadow-md">
          <thead className="bg-sky-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Verified</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                className="bg-white hover:bg-sky-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="p-3">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">{user.emailVerified ? "Yes" : "No"}</td>
                <td className="p-3">{user.createdAt?.slice(0, 10)}</td>
                <td className="p-3">
                  <motion.button
                    whileHover={user.role !== "admin" ? { scale: 1.1 } : {}}
                    whileTap={user.role !== "admin" ? { scale: 0.95 } : {}}
                    disabled={user.role === "admin"}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg shadow    font-medium
                      ${user.role === "admin"
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    onClick={() => handleDelete(user._id)}
                  >
                    <Trash2 size={16} /> Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
