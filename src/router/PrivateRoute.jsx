import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    toast.error("Please Login!!");
    return (
      <Navigate
      to="/login"
      state={{ from: location.pathname }}
      replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
