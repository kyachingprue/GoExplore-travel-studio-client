import { useState, useMemo } from "react";
import { Star, MessageSquareText, Send, User } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PackageReviews = ({ packageId, packageTitle, packageImage }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", packageId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?packageId=${packageId}`);
      return res.data;
    },
  });

  const { data: userDB } = useQuery({
    queryKey: ["mongoUser", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/email/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000,
  });

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);


  const { mutate, isLoading: submitting } = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully ⭐");
      setComment("");
      setRating(0);
      queryClient.invalidateQueries(["reviews", packageId]);
    },
    onError: () => toast.error("Failed to submit review"),
  });

  const handleSubmit = () => {
    if (!user) {
      toast.error("Please login to submit a review");
      navigate("/login");
      return;
    }

    if (!comment.trim()) return toast.error("Please write a comment");
    if (!rating) return toast.error("Please give a rating");

    mutate({
      packageId,
      packageTitle,
      packageImage,
      userName: user.displayName,
      userEmail: user.email,
      userImage: userDB.profileImage,
      rating,
      comment,
      createdAt: new Date(),
    });
  };

  return (
    <section className="mt-16 p-6 rounded-xl bg-sky-200">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquareText className="text-primary" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">
              Reviews & Rating
            </h2>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-gray-600 font-semibold text-lg">
                Loading Reviews
              </h3>
              <div className="text-sm text-gray-400">
                Please wait while we fetch traveler experiences...
              </div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center flex flex-col justify-center items-center md:h-80 py-5 border border-gray-300 rounded-xl bg-white">
              <p className="text-gray-600 mb-2">
                No reviews yet. Be the first one 🌟
              </p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="text-gray-300" />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4  h-100 md:h-80 md:px-4 overflow-auto">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-2 md:p-4 rounded-xl shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    {/* User Image */}
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <img src={review?.userImage} className="rounded-full object-cover" alt="Reviews comments" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-semibold text-gray-800">
                          {review.userName}
                        </p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-600"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-600 mt-1">
                        {review.comment}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              Your Rating:
            </span>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={26}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`cursor-pointer transition-all duration-200
                    ${(hoverRating || rating) >= star
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-gray-700"
                    }`}
                />
              ))}
            </div>

            {rating > 0 && (
              <span className="text-sm text-gray-500">
                {rating}/5
              </span>
            )}
          </div>


          {/* Input + Button */}
          <div className="flex flex-col lg:flex-row gap-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your travel experience..."
              className="flex-1 border border-gray-400 rounded-xl px-4 py-1 focus:ring-1 focus:ring-sky-300 outline-none"
            />

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`flex items-center justify-center gap-2 px-6 py-1.5 rounded-xl text-white font-semibold
                transition-all duration-300
                ${submitting
                  ? "bg-sky-800 cursor-not-allowed animate-pulse"
                  : "bg-sky-600 hover:scale-105 hover:shadow-xl"
                }`}
            >
              <Send size={18} />
              {submitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl md:h-96 md:mt-16 shadow-md overflow-hidden">
          <img
            src={packageImage}
            alt={packageTitle}
            className="w-full h-60 object-cover"
          />

          <div className="p-4 text-center space-y-2">
            <h3 className="font-bold text-lg text-gray-800">
              {packageTitle}
            </h3>

            <p className="text-sm text-gray-500">
              {reviews.length} Reviews
            </p>

            <div className="flex justify-center items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={
                    i <= Math.round(avgRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-1 text-sm font-semibold">
                {avgRating || "0.0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageReviews;
