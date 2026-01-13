import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  useDocumentTitle("User Overview");

  // Fetch user payments
  const { data: payments = [] } = useQuery({
    queryKey: ["overviewPayments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="min-h-[70vh] flex">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full rounded-3xl p-8 md:p-12
                   bg-sky-700
                   shadow-2xl text-white"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4"
        >
          Welcome,
          <span
            className="ml-2 bg-linear-to-r from-yellow-300 via-pink-300 to-white
                       bg-clip-text text-transparent font-bold"
          >
            {user?.displayName || "Traveler"}
          </span>
        </motion.h1>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/90 text-sm sm:text-base leading-relaxed"
        >
          Welcome to <span className="font-semibold">GoExplore</span> — your
          gateway to unforgettable journeys, breathtaking destinations, and
          carefully crafted travel experiences around the world.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-0.5 mt-6 bg-linear-to-r from-white/20 via-white/60 to-white/20"
        />

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-xs sm:text-sm text-white/80"
        >
          Start exploring your bookings, wishlist, and upcoming adventures ✈️🌍
        </motion.p>

        {/* Payment Overview Table */}
        {payments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 bg-blue-950 backdrop-blur-lg rounded-2xl p-5"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">
              Payment Overview
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full text-white">
                <thead className="bg-black/40 text-left">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Package</th>
                    <th className="px-4 py-2">Transaction ID</th>
                    <th className="px-4 py-2">Payment Method</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((pay) => (
                    <motion.tr
                      key={pay._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-white/20 hover:bg-blue-900"
                    >
                      <td className="px-4 py-2">
                        <img
                          src={pay.image}
                          alt={pay.packageName}
                          className="w-20 h-14 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 font-semibold">{pay.packageName}</td>
                      <td className="px-4 py-2 text-white/80">{pay.transactionId}</td>
                      <td className="px-4 py-2 text-white/80">{pay.paymentMethod}</td>
                      <td className="px-4 py-2 font-semibold">${pay.amount}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-semibold
                    ${pay.status === "pending" ? "bg-yellow-500" : "bg-green-500"}`}
                        >
                          {pay.status === "pending" ? "Pending" : "Confirmed"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Overview;
