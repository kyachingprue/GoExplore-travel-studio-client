import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔥 Fetch payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  // 🔁 Update payment status
  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/payments/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["payments"]);
      toast.success("Booking status updated successfully!");
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Manage Bookings
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-sky-100 text-gray-700">
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-left">User Email</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-300 hover:bg-sky-50 transition"
              >
                {/* Package */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.packageName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium">
                      {item.packageName}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-4 py-3 break-all">
                  {item.email}
                </td>

                {/* Amount */}
                <td className="px-4 py-3 font-semibold text-sky-600">
                  ${item.amount}
                </td>

                {/* Payment Method */}
                <td className="px-4 py-3 text-gray-600">
                  {item.paymentMethod}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${item.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={
                      item.status === "confirmed" || isPending
                    }
                    onClick={() =>
                      updateStatus({
                        id: item._id,
                        status: "confirmed",
                      })
                    }
                    className={`px-4 py-1.5 rounded-lg text-white text-xs
                      ${item.status === "confirmed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                      }`}
                  >
                    {item.status === "confirmed"
                      ? "Confirmed"
                      : "Confirm"}
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
