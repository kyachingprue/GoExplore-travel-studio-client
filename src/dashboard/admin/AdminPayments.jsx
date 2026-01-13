import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const AdminPayment = () => {
  const axiosSecure = useAxiosSecure();
  useDocumentTitle("Admin Payments");

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div
          className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load payment records
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
        className="text-xl sm:text-2xl lg:text-3xl font-bold
                   bg-linear-to-r from-purple-600 via-indigo-500 to-blue-500
                   bg-clip-text text-transparent mb-6"
      >
        All Payments (Admin)
      </motion.h1>

      {payments.length === 0 ? (
        <h2 className="text-center text-gray-600 text-xl py-32">
          No payment records found.
        </h2>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Transaction</th>
                <th className="px-4 py-2 text-left">Method</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Paid At</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((pay) => (
                <motion.tr
                  key={pay._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  {/* Image */}
                  <td className="px-4 py-2">
                    <img
                      src={pay.image}
                      alt="package"
                      className="w-20 h-14 rounded object-cover"
                    />
                  </td>

                  {/* User Email */}
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {pay.email}
                  </td>

                  {/* Transaction ID */}
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {pay.transactionId}
                  </td>

                  {/* Payment Method */}
                  <td className="px-4 py-2 capitalize">
                    {pay.paymentMethod}
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-2 font-semibold">
                    ${pay.amount}
                  </td>

                  {/* Paid At */}
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(pay.paidAt).toLocaleDateString()}
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

export default AdminPayment;
