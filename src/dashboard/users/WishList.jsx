import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion } from "motion/react"; 
import { Trash2, ShoppingCart } from "lucide-react"; 
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDocumentTitle from "../../hooks/useDocumentTitle";


const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  useDocumentTitle("My Wishlist");

  const { data: bookmarks = [], isLoading, isError } = useQuery({
    queryKey: ["bookmarks", user?.email],
    queryFn: async() => {
      const res = await axiosSecure.get(`/bookmark?email=${user?.email}`);
      return res.data;
  
    }
  });

  // Delete bookmark
  const deleteBookmarkMutation = useMutation({
    mutationFn: async(id) => {
      const res = await axiosSecure.delete(`/bookmark/${id}`);
        return res.data;
    },

    onSuccess: () => {
    toast.success("Bookmark removed!");
    queryClient.invalidateQueries(["bookmarks", user?.email]);
    },
  });

  // Buy bookmark (move to myPackage)
  const buyBookmarkMutation = useMutation({
   mutationFn:  async(bookmark) => {
    await axiosSecure.post("/myPackage", {
    userEmail: user?.email,
    packageId: bookmark.packageId,
    title: bookmark.title,
    price: bookmark.price,
    image: bookmark.image,
    createdAt: new Date(),
  });
  await axiosSecure.delete(`/bookmark/${bookmark._id}`);
},

  onSuccess: () => {
    toast.success("Package purchased!");
    queryClient.invalidateQueries(["bookmarks", user?.email]);
  },
    onError: () => {
      toast.error("Already Booked!");
    },
  });

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="text-lg font-semibold text-gray-600"
        >
          Loading your wishlist...
        </motion.p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <motion.p
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-xl font-semibold text-red-500"
        >
          Failed to load wishlist 😢
        </motion.p>
        <p className="text-gray-500 text-sm">
          Please refresh the page or try again later
        </p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-start font-extrabold mb-6
             text-xl sm:text-2xl pb-2 lg:text-3xl
             bg-linear-to-r from-sky-900 via-purple-600 to-white
             bg-clip-text text-transparent"
      >
        My Wishlist/Saved Packages
      </motion.h1>
      {bookmarks.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-xl text-center rounded-2xl p-10
               bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500
               shadow-2xl"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              No Bookmarks Found
            </motion.h2>

            <p className="text-white/90 mb-8 text-sm md:text-base">
              Save your favorite travel packages and find them here later ✈️
            </p>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-white/90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.187v13.004c0 1.255-1.385 2.015-2.445 1.32L12 16.694l-5.055 3.139c-1.06.695-2.445-.065-2.445-1.32V5.509c0-1.11.807-2.059 1.907-2.187a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Package ID</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookmarks.map((bookmark) => (
                <motion.tr
                  key={bookmark._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">
                    <img
                      src={bookmark.image}
                      alt={bookmark.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 font-medium">{bookmark.title}</td>
                  <td className="py-2 px-4 text-gray-600">{bookmark.packageId}</td>
                  <td className="py-2 px-4 font-semibold">${bookmark.price}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => buyBookmarkMutation.mutate(bookmark)}
                      className="flex items-center gap-1 mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      <ShoppingCart size={18} /> Buy
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteBookmarkMutation.mutate(bookmark._id)}
                      className="flex items-center mt-2 gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} /> Cancel
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

export default WishList;
