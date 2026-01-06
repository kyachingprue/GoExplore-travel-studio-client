import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async() => {
      const res = await axiosSecure.get("/reviews/admin"); 
      return res.data;
      }
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review deleted successfully!");
      queryClient.invalidateQueries(["allReviews"]);
    },
    onError: () => {
      toast.error("Failed to delete review!");
    },
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this review?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                deleteReviewMutation.mutate(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading reviews...</div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-300 rounded-xl p-4 bg-white shadow hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            {/* Package Info */}
            <div className="flex flex-col items-center mb-3">
              <motion.img
                src={review.packageImage}
                alt="Package"
                className="w-full h-44 rounded-lg object-cover mb-2"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className="font-semibold text-gray-800 text-center">{review.packageTitle}</div>
            </div>

            {/* User Info */}
            <div className="text-sm text-gray-600 text-center">
              <p className="font-bold text-black"> {review.userName}</p>
              <p> {review.userEmail}</p>
              <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Rating */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-xl ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Comment */}
            <p className="text-gray-700 mb-4 text-center">{review.comment}</p>

            {/* Delete Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition-all"
              onClick={() => handleDelete(review._id)}
            >
              <Trash2 size={16} /> Delete
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
