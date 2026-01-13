import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  User,
  LogOut,
  MoreVertical,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const { data: userDB, isLoading } = useQuery({
    queryKey: ["mongoUser", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/email/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000,
  });

  const { data: cartCount } = useQuery({
    queryKey: ["cartCount", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myPackage/count/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-6 py-4"
    >
      <div className="h-6 w-32 rounded-md bg-slate-200 animate-pulse" />
      <div className="hidden md:flex items-center gap-6">
        <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
      </div>

      <div className="h-8 w-24 rounded-full bg-slate-200 animate-pulse" />
    </motion.div>
  }

  const handleLogout = async () => {
    await logoutUser();
    navigate('/')
    toast.success("User Logout🏞️")
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-1 pb-1 transition-all duration-300
   ${isActive ? "text-yellow-300" : "text-white"}
   after:absolute after:left-0 after:bottom-0 after:h-[2px]
   after:bg-yellow-300 after:transition-all after:duration-300
   ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
      ${show ? "translate-y-0" : "-translate-y-full"}
      bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-3xl font-extrabold bg-linear-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent"
        >
          GoExplore
        </Link>

        {/* Menu (desktop) */}
        <div className="hidden md:flex items-center gap-6 font-medium text-white">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/packages" className={navLinkClass}>
            Package
          </NavLink>
          <NavLink to="/experience" className={navLinkClass}>
            Experience
          </NavLink>

          {/* Travel Card */}
          {user && <button
            onClick={() => {
            if (userDB?.role === "admin") {
              navigate("/dashboard/admin/analytics");
            } else {
            navigate("/dashboard/overview");
             }}}
            className="relative bg-white/20 hover:bg-white/30 p-2 rounded-xl"
          >
            <LayoutDashboard />
            {cartCount?.count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white
               text-xs px-1.5 rounded-full">
                {cartCount.count}
              </span>
            )}
          </button>}

          {/* Auth desktop */}
          {!user ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <img
                src={userDB?.profileImage || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white"
                onClick={() => setProfileOpen(!profileOpen)}
              />

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-40 py-4 bg-white text-black rounded-xl shadow-lg">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full px-4 py-2 items-center flex gap-2 hover:bg-gray-100"
                  >
                    <User size={16} /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 items-center flex gap-2 hover:bg-gray-100 text-red-600"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-3">
          {/* Travel Card */}
          <button
            onClick={() => {
              if (userDB?.role === "admin") {
                navigate("/dashboard/admin/analytics");
              } else {
                navigate("/dashboard/overview");
              }
            }}
            className="bg-white/20 p-2 rounded-lg"
          >
            <LayoutDashboard size={18} />
            {cartCount?.count > 0 && (
              <span className="absolute -top-1 right-24 bg-red-500 text-white
               text-xs px-1.5 rounded-full">
                {cartCount.count}
              </span>
            )}
          </button>

          {user && (<div className="relative">
            <img
              src={userDB?.profileImage || "/default-avatar.png"}
              className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-white"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-40 py-4 bg-white text-black rounded-xl shadow-lg">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-2 items-center flex gap-2 hover:bg-gray-100"
                >
                  <User size={16} /> Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 items-center flex gap-2 hover:bg-gray-100 text-red-600"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>)}

          {/* 3 dot menu */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <MoreVertical className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white text-black md:px-6 py-4 space-y-3 shadow-lg">
          <NavLink to="/" className="px-2" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="px-2" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/packages" className="px-2" onClick={() => setMenuOpen(false)}>Package</NavLink>
          <NavLink to="/experience" className="px-2" onClick={() => setMenuOpen(false)}>Experience</NavLink>

          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-yellow-400 py-2 mt-3 rounded-lg font-semibold"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
