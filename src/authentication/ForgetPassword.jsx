import { useState, useEffect } from "react";
import { MailCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { motion } from "motion/react";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  // Countdown after email sent
  useEffect(() => {
    if (!sent) return;

    if (seconds === 0) {
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [sent, seconds, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await resetPassword(email);
      setSent(true);
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {!sent ? (
        // 🔹 Email input card
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md p-3 rounded-2xl shadow-2xl
            bg-linear-to-br from-orange-500 via-pink-500 to-blue-500">
          {/* Inner Card */}
          <div className="bg-white rounded-xl p-6">
            <h2
              className="text-2xl font-bold text-center mb-3
               bg-linear-to-r from-orange-500 via-pink-500 to-blue-500
               bg-clip-text text-transparent" >
              Forgot Password
            </h2>

            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your email and we’ll send you a password reset link.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Input */}
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 mb-4 rounded-lg
                border border-gray-300 focus:outline-none
                focus:ring-2 focus:ring-pink-400" />

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg text-white font-semibold
                 bg-linear-to-r from-orange-500 via-pink-500 to-blue-500
                 shadow-lg" >
                Send Reset Link
              </motion.button>
            </form>
          </div>
        </motion.div>
      ) : (
        // 🔹 Success card
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg border text-center">
          <MailCheck
            size={56}
            className="mx-auto mb-4 text-green-500 animate-bounce"
          />

          <h2 className="text-2xl font-bold mb-3">
            Please Check Your Email
          </h2>

          <p className="text-sm text-gray-600 mb-5">
            We’ve sent a password reset link to your email address.
            Follow the instructions to reset your password.
          </p>

          <p className="font-semibold">
            Redirecting to login in{" "}
            <span className="text-blue-600 text-xl">{seconds}</span>{" "}
            seconds
          </p>

          {/* Countdown bar */}
          <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${(seconds / 10) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
