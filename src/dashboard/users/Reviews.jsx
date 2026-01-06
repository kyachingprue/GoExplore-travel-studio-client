import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Reviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);

  /* ---------------- Fetch User Reviews ---------------- */
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["userReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?userEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  /* ---------------- Delete Review ---------------- */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries(["userReviews", user?.email]);
    },
    onError: () => toast.error("Failed to delete review"),
  });

  /* ---------------- Edit Review ---------------- */
  const editMutation = useMutation({
    mutationFn: async ({ id, comment, rating }) => {
      const res = await axiosSecure.put(`/reviews/${id}`, { comment, rating });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review updated successfully");
      setEditingId(null);
      queryClient.invalidateQueries(["userReviews", user?.email]);
    },
    onError: () => toast.error("Failed to update review"),
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-lg w-80">
          <p className="text-gray-700 font-semibold">
            Are you sure you want to delete this review?
          </p>
          <div className="flex justify-end gap-2">
            {/* Cancel Button */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteMutation.mutate(id, {
                  onSuccess: () => {
                    toast.success("Review deleted successfully!");
                  },
                  onError: () => {
                    toast.error("Failed to delete review");
                  },
                });

                // Close the toast after clicking delete
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity } 
    );
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleEditSubmit = (id) => {
    if (!editComment.trim()) return toast.error("Comment cannot be empty");
    if (editRating < 1 || editRating > 5) return toast.error("Invalid rating");

    editMutation.mutate({ id, comment: editComment, rating: editRating });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-3">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-gray-600 font-semibold">Loading your reviews...</div>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="text-center py-20 text-gray-500 font-semibold">
        You have not submitted any reviews yet.
      </div>
    );
  }

  return (
    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {reviews.map((review) => (
        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border border-gray-300 h-80 overflow-auto rounded-xl p-5 bg-sky-100 shadow hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          {/* User Info */}
          <div className="flex justify-between items-center gap-3 mb-3">
            <div className="flex flex-col items-center md:items-start gap-2">
              <motion.img
                src={review?.packageImage}
                alt="Review"
                className="w-28 h-24 rounded-lg object-cover cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-yellow-100 text-yellow-700 font-semibold shadow hover:shadow-md transition-all duration-200"
                onClick={() => handleEdit(review)}
              >
                <Edit size={16} /> Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15, rotate: -5 }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-100 text-red-600 font-semibold shadow hover:shadow-md transition-all duration-200"
                onClick={() => handleDelete(review._id)}
              >
                <Trash2 size={16} /> Delete
              </motion.button>
            </div>
          </div>

          {/* Review Content */}
          {editingId === review._id ? (
            <div className="space-y-3">
              {/* Edit Textarea */}
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-1 focus:ring-sky-300 outline-none"
                rows={3}
              />

              {/* Edit Rating */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl ${star <= editRating ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setEditRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-sky-700 text-white px-4 py-2 rounded-xl font-semibold"
                onClick={() => handleEditSubmit(review._id)}
              >
                Save
              </motion.button>
            </div>
          ) : (
              <div>
                <div className="font-semibold text-gray-800 py-2 text-left">{review.packageTitle}</div>
                <div className="text-sm pb-2 text-gray-600">Date:{new Date(review.createdAt).toLocaleDateString()}</div>
              <div className="text-gray-700 mb-2">{review.comment}</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-xl ${star <= review.rating ? "text-yellow-400" : "text-gray-500"}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

      ))}
    </div>
  );
};

export default Reviews;
