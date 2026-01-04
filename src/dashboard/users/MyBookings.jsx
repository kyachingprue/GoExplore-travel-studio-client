import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Trash2, CreditCard } from "lucide-react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: myPackages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myPackages", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPackage?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete package
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/myPackage/${id}`);
    },
    onSuccess: () => {
      toast.success("Booking deleted successfully!");
      queryClient.invalidateQueries(["myPackages", user?.email]);
    },
    onError: () => {
      toast.error("Failed to delete booking");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div
          className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load bookings
      </p>
    );
  }

  return (
    <div className="p-4">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl lg:text-3xl font-semibold
                   bg-linear-to-r from-sky-600 via-blue-500 to-indigo-600
                   bg-clip-text text-transparent mb-6"
      >
        My Bookings
      </motion.h1>

      {myPackages.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Package ID</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {myPackages.map((pkg) => (
                <motion.tr
                  key={pkg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-20 h-14 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium">{pkg.title}</td>
                  <td className="px-4 py-2 text-gray-500">{pkg.packageId}</td>
                  <td className="px-4 py-2 font-semibold">${pkg.price}</td>
                  <td className="px-4 py-2 flex gap-3">
                    {/* Pay Button (UI only) */}
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 8px 20px rgba(37, 99, 235, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="flex items-center mt-3 gap-1 px-3 py-1 rounded
                      bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <CreditCard size={16} />
                      Pay
                    </motion.button>

                    {/* Delete Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 8px 20px rgba(37, 99, 235, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      onClick={() => deleteMutation.mutate(pkg._id)}
                      className="flex items-center gap-1 mt-3 px-3 py-1 rounded
                                 bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
