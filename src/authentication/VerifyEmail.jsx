import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  // Countdown logic
  useEffect(() => {
    if (seconds === 0) {
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="max-w-md w-full rounded-2xl p-8 text-center shadow-xl
        bg-linear-to-br from-orange-500 via-pink-500 to-blue-500
        text-white animate-fade-in"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <MailCheck size={60} className="animate-bounce" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-3">
          Please Verify Your Email
        </h2>

        {/* Description */}
        <p className="text-sm opacity-90 mb-6 leading-relaxed">
          We have sent a verification link to your email address.
          Please verify your email to continue your travel journey with
          <span className="font-semibold"> GoExplore</span>.
        </p>

        {/* Countdown */}
        <div className="text-lg font-semibold">
          Redirecting to login in{" "}
          <span className="text-yellow-300 text-2xl font-bold">
            {seconds}
          </span>{" "}
          seconds
        </div>

        {/* Progress bar animation */}
        <div className="mt-4 h-2 w-full bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-1000"
            style={{ width: `${(seconds / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
