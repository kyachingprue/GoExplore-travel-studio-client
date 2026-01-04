import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { loginWithGoogle } = useAuth();

  const { mutateAsync: saveOrUpdateUser } = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosPublic.post("/users/google", userInfo);
      return res.data;
    },
  });

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();

      const userInfo = {
        name: user?.displayName || "Google User",
        email: user?.email,
        coverImage: "https://i.ibb.co.com/SXfYf7VV/Navy-Blue-Geometric-Technology-Linked-In-Banner.png",
        profileImage: user?.photoURL,
        role: "user",
        emailVerified: true,
        lastLogin: new Date(),
      };

      await saveOrUpdateUser(userInfo);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 disabled:opacity-70"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <FcGoogle size={20} />
      )}
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
