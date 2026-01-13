import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Save } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  useDocumentTitle("Manage Users");

  // Track selected roles per user
  const [selectedRoles, setSelectedRoles] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle select change (NO API CALL HERE)
  const handleRoleChange = (id, role) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [id]: role,
    }));
  };

  // Update role ONLY on button click
  const handleRoleUpdate = async (user) => {
    const newRole = selectedRoles[user._id];

    // Prevent unnecessary update
    if (!newRole || newRole === user.role) {
      return toast.error("Please change role before updating");
    }

    try {
      setUpdatingId(user._id);
      await axiosSecure.patch(`/users/role/${user._id}`, {
        role: newRole,
      });

      toast.success("User role updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to update user role",error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 md:p-4 bg-linear-to-br from-sky-50 via-sky-100 to-blue-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

      <div className="overflow-x-auto rounded-md">
        <table className="table-auto w-full border border-gray-200 rounded-xl shadow-md">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Verified</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                className="bg-white hover:bg-sky-200 transition-all border-b border-gray-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <td className="p-3">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover border border-sky-300"
                  />
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>

                {/* Role Select */}
                <td className="p-3">
                  <select
                    value={selectedRoles[user._id] ?? user.role}
                    className="px-3 py-1 border border-gray-300 rounded-lg bg-white"
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    disabled={updatingId === user._id}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-3">
                  {user.emailVerified ? "Yes" : "No"}
                </td>

                {/* Update Button */}
                <td className="p-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={updatingId === user._id}
                    onClick={() => handleRoleUpdate(user)}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-lg shadow hover:bg-green-700 disabled:bg-gray-400"
                  >
                    <Save size={16} /> Update
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
