import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { registerUser, profileUpdate, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setBtnLoading(true);
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      setBtnLoading(false);
      return;
    }

    try {
      await registerUser(data.email, data.password);
      await profileUpdate({
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL:
          "https://i.ibb.co.com/wFc27jwr/360-F-724597608-pmo5-Bs-Vum-Fc-Fy-HJKl-ASG2-Y2-Kpkkfi-YUU.jpg",
      });
      toast.success("Registration successful! Check your email to verify.");
      navigate("/verify-email", { state: { email: data.email } });
    } catch (error) {
      toast.error(error.message);
    }
    setBtnLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/fVVXP81c/happy-new-year.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" /> 

      <motion.div
        className="relative w-full max-w-lg p-3 bg-white/10 backdrop-blur-md rounded-2xl z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white p-7 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-center
          bg-linear-to-r from-orange-500 via-pink-500 to-blue-500
          bg-clip-text text-transparent">
            Create Your Account
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* First Name */}
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                placeholder="Enter first name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.firstName && (
                <p className="text-red-500 mt-1 text-sm">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Enter last name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.lastName && (
                <p className="text-red-500 mt-1 text-sm">{errors.lastName.message}</p>
              )}
            </div>
          </div>

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

          <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* Password */}
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="********"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", { required: "Confirm password is required" })}
                placeholder="*********"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-70"
          >
            {btnLoading && <Loader2 className="animate-spin" size={20} />}
            Create Account
          </button>

          <p className="text-center text-gray-500 pt-4">Already have an account? please{" "} <Link to="/login" className="text-blue-800 hover:underline hover:text-blue-400">Login</Link></p>

          <div className="flex items-center my-4 gap-3">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-600">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          
          <GoogleLoginButton onClick={loginWithGoogle} />
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
