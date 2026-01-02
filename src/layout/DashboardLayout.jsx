import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  User,
  BookOpen,
  CreditCard,
  Star,
  Heart,
  LogOut,
  BarChart3,
  Package,
  Users,
  MessageSquare,
  PenTool,
  Menu,
  Plane,
} from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // DEFAULT ROLE SYSTEM
  const role = user?.role || "user"; // user | admin
  const isAdmin = role === "admin";

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userRoutes = [
    { name: "Overview", to: "/dashboard/overview", icon: LayoutDashboard },
    { name: "My Bookings", to: "bookings", icon: BookOpen },
    { name: "Payments", to: "payments", icon: CreditCard },
    { name: "Reviews & Ratings", to: "reviews", icon: Star },
    { name: "Wishlist", to: "wishlist", icon: Heart },
    { name: "My Profile", to: "/profile", icon: User },
  ];

  const adminRoutes = [
    { name: "Analytics", to: "analytics", icon: BarChart3 },
    { name: "Manage Packages", to: "packages", icon: Package },
    { name: "Manage Bookings", to: "manage-bookings", icon: BookOpen },
    { name: "Manage Users", to: "users", icon: Users },
    { name: "Payments", to: "payments", icon: CreditCard },
    { name: "Reviews", to: "reviews", icon: MessageSquare },
    { name: "Blogs / Experience", to: "blogs", icon: PenTool },
  ];

  const routes = isAdmin ? adminRoutes : userRoutes;

  const handleUserLogout = async () => {
    await logoutUser()
    navigate('/')
    toast.success("Logout successful!")
  }

  const Sidebar = ({
    collapsed,
    setCollapsed,
    routes,
    isAdmin,
  }) => (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      className="fixed top-0 left-0 h-screen
    bg-linear-to-b from-purple-700 via-indigo-700 to-fuchsia-700
    text-white shadow-2xl z-40"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/20">
        {!collapsed && (
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Plane />
            {isAdmin ? "Admin Panel" : "Dashboard"}
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block"
        >
          <Menu />
        </button>
      </div>

      {/* Routes */}
      <nav className="mt-4 px-2 space-y-1">
        {routes.map(({ name, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${isActive ? "bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 text-white shadow-md" : "hover:bg-white/20"}`
            }
          >
            {Icon && <Icon size={20} />} 
            {!collapsed && <span className="font-medium">{name}</span>}
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={handleUserLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl
        hover:bg-red-500/20 mt-4 w-full"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </motion.aside>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-indigo-50 to-fuchsia-50">
     
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`${mobileOpen ? "block" : "hidden"} md:block`}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
          routes={routes}
          isAdmin={isAdmin}
          logoutUser={logoutUser}
        />
      </div>

      {/* Main Area */}
      <div
        className={`transition-all ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        {/* Top Navbar */}
        <header
          className="h-16 sticky top-0 z-20 flex items-center justify-between px-4
          bg-linear-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white"
        >
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>
            <Link to="/">
              <h2 className="text-xl md:text-3xl font-bold text-white">
                GoExplore
              </h2>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 md:p-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
