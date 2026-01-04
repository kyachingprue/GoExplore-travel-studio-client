import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import GoogleLoginButton from "./GoogleLoginButton";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const { loginUser, loginWithGoogle, } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setBtnLoading(true);

    try {
      // 1️⃣ Login with Firebase
      const loggedUser = await loginUser(data.email, data.password);

      // 2️⃣ Check Firebase email verification
      if (!loggedUser.emailVerified) {
        toast.error("Please verify your email first!");
        navigate("/verify-email"); 
        return;
      }

      // 3️⃣ Get MongoDB user
      const { data: userDB } = await axiosSecure.get(
        `/users/email/${loggedUser.email}`
      );
     
      if (!userDB?.emailVerified) {
        await axiosSecure.put(
          '/users/verify',
          { email: loggedUser?.email },  // body
          { withCredentials: true }     // config
        );
        console.log("MongoDB user updated successfully!");
      }

      // 5️⃣ Login successful
      toast.success("Login successful!");
      navigate("/"); 

    } catch (error) {
      console.error("error message",error);
      toast.error(
        error?.response?.data?.message || error.message || "Login failed!"
      );
    } finally {
      setBtnLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    toast.success("Please input your email")
    navigate('/forget-password')
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/fVVXP81c/happy-new-year.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" /> {/* overlay */}

      <motion.div
        className="relative w-full max-w-md p-4 bg-white/10 backdrop-blur-md rounded-2xl z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-center 
          bg-linear-to-r from-orange-500 via-pink-500 to-blue-500 
          bg-clip-text text-transparent">
            Login to GoExplore
          </h2>


          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="************"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-indigo-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-70"
          >
            {btnLoading && <Loader2 className="animate-spin" size={20} />}
            Login
          </button>

          <p className="text-center text-gray-600 pt-4">
            Don’t have an account? Please{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-800 font-semibold hover:text-indigo-400 hover:underline cursor-pointer transition-all duration-300"
            >
              Sign up
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center my-3 gap-3">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-600">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login */}
          <GoogleLoginButton onClick={loginWithGoogle} />
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
