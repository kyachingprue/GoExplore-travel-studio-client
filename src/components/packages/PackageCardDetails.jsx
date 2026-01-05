import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  MapPin,
  Globe,
  Clock,
  Star,
  DollarSign,
  Plane,
  ArrowLeft,
  ShoppingCart,
  Bookmark,
} from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const PackageCardDetails = () => {
  const { _id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: packageData, isLoading } = useQuery({
    queryKey: ["package", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/packages/${_id}`);
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

  //Add To Card API
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/myPackage", {
        userEmail: user.email,
        packageId: _id,
        title: packageData.title,
        price: packageData.price,
        image: packageData.image,
        createdAt: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cartCheck"]);
      queryClient.invalidateQueries(["cartCount"]);
      toast.success("Added to Cart ✅");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add to cart ❌");
    },
  });

  const { data: cartStatus } = useQuery({
    queryKey: ["cartCheck", user?.email, _id],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myPackage/check?email=${user.email}&packageId=${_id}`
      );
      return res.data;
    },
  });

  //Bookmark API
  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/bookmark", {
        userEmail: user.email,
        packageId: _id,
        title: packageData.title,
        image: packageData.image,
        price: packageData.price
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarkCheck"]);
      toast.success("Bookmarked successfully ⭐");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to bookmark ❌");
    },
  });

  const { data: bookmarkStatus } = useQuery({
    queryKey: ["bookmarkCheck", user?.email, _id],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookmark/check?email=${user.email}&packageId=${_id}`
      );
      return res.data;
    },
  });

  const handleAuthRequired = () => {
    if (!user) {
      toast.error("Please login first 🔐");
      navigate("/login", { replace: true });
      return false;
    }
    return true;
  };

  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (!packageData) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Package Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-blue-50 to-cyan-100 px-4 py-10 mt-12 md:mt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-6"
      >
        {/* Left Image */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <img
            src={packageData.image}
            alt={packageData.title}
            className="w-full h-full object-cover md:rounded-l-2xl"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-6 md:p-8 flex flex-col justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-sky-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent animate-pulse">
              {packageData.title}
            </h1>

            <p className="text-sm text-blue-600 font-medium mb-4 flex items-center gap-2">
              <Plane size={18} />
              {packageData.type}
            </p>

            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Globe className="text-sky-500" />
                <span>{packageData.country}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" />
                <span>{packageData.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-indigo-500" />
                <span>{packageData.duration}</span>
              </div>

              <div className="flex items-center gap-3">
                <Star className="text-yellow-500" />
                <span>{packageData.rating} / 5</span>
              </div>

              <div className="flex items-center gap-3 text-lg font-semibold">
                <DollarSign className="text-green-600" />
                <span>${packageData.price}</span>
              </div>
            </div>

            <p className="mt-5 text-gray-600 leading-relaxed">
              Explore the vibrant life of {packageData.location} with our
              carefully designed travel experience. Enjoy culture, food,
              landmarks, and unforgettable moments with expert guidance.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-400 via-blue-500 to-sky-500 text-white font-medium"
            >
              <ArrowLeft size={18} />
              Go Back
            </motion.button>

            <motion.button
              disabled={cartStatus?.exists || addToCartMutation.isLoading || userDB?.role === "admin"}
              onClick={() => {
                if (!handleAuthRequired()) return;
                addToCartMutation.mutate();
              }}
              className={`px-6 py-3 flex items-center gap-2 rounded-xl text-white font-semibold
                  ${cartStatus?.exists || userDB?.role === "admin"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-sky-500 via-blue-500 to-cyan-500"}`}
              whileHover={{ scale: 1.08, y: -2 }} 
              whileTap={{ scale: 0.95 }}        
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ShoppingCart size={18} />
              {userDB?.role === "admin"
                ? "Disabled"
                : cartStatus?.exists
                  ? "Added"
                  : addToCartMutation.isLoading
                    ? "Adding..."
                    : "Add To Cart"}
            </motion.button>

            <motion.button
              disabled={bookmarkStatus?.exists || bookmarkMutation.isLoading || userDB?.role === "admin"}
              onClick={() => {
                if (!handleAuthRequired()) return;
                bookmarkMutation.mutate();
              }}
              className={`px-5 py-2.5 flex items-center gap-2 rounded-xl text-white font-semibold
                  ${ bookmarkStatus?.exists || userDB?.role === "admin"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-sky-500 via-blue-500 to-indigo-600"}`}
              whileHover={{ scale: 1.08, y: -2 }}  // same hover effect
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Bookmark size={18} />
              {userDB?.role === "admin"
                ? "Disabled"
                : bookmarkStatus?.exists
                  ? "Bookmarked"
                  : bookmarkMutation.isLoading
                    ? "Saving..."
                    : "Bookmark"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PackageCardDetails;
