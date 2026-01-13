import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Users,
  Package,
  DollarSign,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDocumentTitle from "../../hooks/useDocumentTitle";


const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  useDocumentTitle("Admin Analytics Dashboard");

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const { data: bookmarks = [] } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookmarks");
      return res.data;
    },
  });
 
  const { data: myPackages = [] } = useQuery({
    queryKey: ["myPackages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/myPackages");
      return res.data;
    },
  });

  // 🔥 NEW: payments data
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  // 🔢 Total bookings from payments
  const totalBookings = payments.length;

  // 💰 Total revenue from payments
  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const analyticsChartData = [
    {
      name: "Users",
      value: users.length,
    },
    {
      name: "Bookings",
      value: totalBookings,
    },
    {
      name: "Revenue",
      value: totalRevenue,
    },
    {
      name: "Packages",
      value: packages.length,
    },
  ];

 
  const StatCard = ({ icon: Icon, title, value }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md flex items-center gap-4"
    >
      <div className="p-3 rounded-xl bg-sky-100 text-sky-600">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen rounded-md md:p-4 bg-linear-to-br from-sky-100 via-sky-50 to-blue-100">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Admin Analytics Dashboard
      </h1>

      {/* 🔥 Updated cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={Users} title="Total Users" value={users.length} />
        <StatCard icon={BookOpen} title="Total Bookings" value={totalBookings} />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${totalRevenue}`}
        />
        <StatCard
          icon={Package}
          title="Total Packages"
          value={packages.length}
        />
      </div>

      <div className="flex flex-col mx-auto gap-6 mb-10">
        {/* Popular Packages / Bookmarks */}
        <div className=" bg-white/80  backdrop-blur-md rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Popular Packages (Bookmarks)
          </h2>

          <div className="overflow-x-auto w-full h-100 overflow-y-auto rounded-2xl border border-sky-100">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-linear-to-r from-sky-100 to-blue-100 text-gray-700">
                  <th className="px-4 py-3 text-left">Package</th>
                  <th className="px-4 py-3 text-left">User Email</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody className="border border-gray-300">
                {bookmarks.map((item, idx) => (
                  <tr
                    key={idx}
                    className="group transition-all duration-300 hover:bg-sky-100 hover:shadow-md"
                  >
                    {/* Package Info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item?.image}
                          alt={item?.title}
                          className="w-12 h-12 rounded-xl object-cover border border-sky-200 group-hover:scale-105 transition"
                        />
                        <span className="font-medium text-gray-800">
                          {item?.title}
                        </span>
                      </div>
                    </td>

                    {/* User Email */}
                    <td className="px-4 py-3 text-gray-600 break-all">
                      {item?.userEmail}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 font-semibold text-sky-600">
                      ${item?.price}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-gray-500">
                      {item?.createdAt?.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* User Purchased Packages */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Users Package Purchase
          </h2>

          <div className="overflow-x-auto w-full h-100 overflow-y-auto rounded-2xl border border-sky-100">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-linear-to-r from-sky-100 to-blue-100 text-gray-700">
                  <th className="px-4 py-3 text-left">Package</th>
                  <th className="px-4 py-3 text-left">User Email</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody className="border border-gray-300">
                {myPackages.map((item, idx) => (
                  <tr
                    key={idx}
                    className="group transition-all duration-300 hover:bg-sky-100 hover:shadow-md"
                  >
                    {/* Package Info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item?.image}
                          alt={item?.title}
                          className="w-12 h-12 rounded-xl object-cover border border-sky-200 group-hover:scale-105 transition"
                        />
                        <span className="font-medium text-gray-800">
                          {item?.title}
                        </span>
                      </div>
                    </td>

                    {/* User Email */}
                    <td className="px-4 py-3 text-gray-600 break-all">
                      {item?.userEmail}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 font-semibold text-sky-600">
                      ${item?.price}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-gray-500">
                      {item?.createdAt?.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* 📈 Analytics Overview Chart */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Analytics Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
