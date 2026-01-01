import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = ({ onClick }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await onClick(); 
      navigate('/')
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 disabled:opacity-70"
    >
      {loading && <Loader2 className="animate-spin" size={20} />}
      {!loading && <FcGoogle size={20} />}
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
