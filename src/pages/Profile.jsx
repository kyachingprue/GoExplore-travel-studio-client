import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { UploadCloud, Edit3 } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Profile = () => {
  const { user: firebaseUser } = useAuth(); // Firebase user (email, uid)
  const axiosSecure = useAxiosSecure();

  const [user, setUser] = useState(null); // MongoDB user
  const [coverUploading, setCoverUploading] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);

  // Fetch MongoDB user by email
  useEffect(() => {
    if (!firebaseUser?.email) return;

    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/users/email/${firebaseUser.email}`);
        setUser(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user data!");
      }
    };

    fetchUser();
  }, [firebaseUser?.email, axiosSecure]);

  // Handle Cloudinary upload
  const handleUpload = async (file, type) => {
    if (!file || !user?._id) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUD_UPLOAD_PRESET);

    try {
      type === "cover" ? setCoverUploading(true) : setProfileUploading(true);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data.secure_url;

      // Update MongoDB
      const payload = type === "cover"
        ? { coverImage: imageUrl }
        : { profileImage: imageUrl };

      await axiosSecure.patch(`/users/${user._id}`, payload);

      // Update local state
      setUser({ ...user, ...payload });
      toast.success(`${type === "cover" ? "Cover" : "Profile"} image updated!`);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    } finally {
      type === "cover" ? setCoverUploading(false) : setProfileUploading(false);
    }
  };

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-orange-200 via-pink-200 to-blue-200">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-500 rounded-full mb-6 animate-spin" />
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-3 h-3 bg-indigo-600 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 0.6,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <motion.p
          className="text-lg font-semibold text-gray-700 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        >
          Loading profile...
        </motion.p>
      </div>
    );

  return (
    <div className="min-h-screen bg-sky-200 flex justify-center mt-16 pb-24 pt-4">
      <motion.div
        className="w-full max-w-6xl bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cover Image */}
        <div className="relative h-96 w-full">
          <img
            src={user?.coverImage || "/default-cover.jpg"}
            alt="Cover"
            className="object-cover w-full h-full"
          />
          <label className="absolute top-4 right-4 cursor-pointer bg-white/80 p-2 rounded-full hover:bg-white shadow-md flex items-center gap-1">
            <UploadCloud size={20} />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files[0], "cover")}
            />
          </label>
          {coverUploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white font-semibold rounded-lg">
              {/* Spinner Circle */}
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>

              {/* Animated Dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-3 h-3 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>

              <p className="mt-3">Uploading...</p>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-6 p-6">
          {/* Profile Image */}
          <div className="relative -mt-16 md:-mt-24">
            <img
              src={user.profileImage || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover"
            />
            <label className="absolute bottom-0 right-0 cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-100 flex items-center">
              <Edit3 size={18} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0], "profile")}
              />
            </label>
            {profileUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white font-semibold rounded-lg">
                {/* Spinner Circle */}
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>

                {/* Animated Dots */}
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-3 h-3 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>

                <p className="mt-3">Uploading...</p>
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="mt-4 md:mt-0 flex-1">
            <motion.h2
              className="text-3xl font-bold text-gray-800"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {user.name}
            </motion.h2>
            <p className="text-gray-900 mt-1">{user.email}</p>
            <p className="text-gray-700 mt-1 capitalize">Role: {user.role}</p>
            <p className="text-gray-800 mt-1">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
