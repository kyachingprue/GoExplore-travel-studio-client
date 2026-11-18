import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuToggleRef = useRef(null);
  const drawerRef = useRef(null);
  const closeDrawerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY <= lastScrollY || window.scrollY <= 80);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const menuToggle = menuToggleRef.current;
    document.body.style.overflow = "hidden";
    closeDrawerRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }

      if (event.key === "Tab") {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      menuToggle?.focus();
    };
  }, [menuOpen]);

  const { data: userDB } = useQuery({
    queryKey: ["mongoUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000,
  });

  const { data: cartCount } = useQuery({
    queryKey: ["cartCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPackage/count/${user.email}`);
      return res.data;
    },
  });

  const dashboardPath =
    userDB?.role === "admin"
      ? "/dashboard/admin/analytics"
      : "/dashboard/overview";

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
      toast.success("User Logout🏞️");
      setProfileOpen(false);
      setMenuOpen(false);
    } catch (error) {
      toast.error(error?.message || "Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-1 pb-1 transition-colors duration-300 ${
      isActive ? "text-amber-200" : "text-white hover:text-cyan-100"
    } after:absolute after:left-0 after:bottom-0 after:h-[2px]
    after:bg-amber-200 after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        About
      </NavLink>
      <NavLink to="/packages" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Packages
      </NavLink>
      <NavLink to="/experience" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Experience
      </NavLink>
    </>
  );

  const profileMenu = (
    <div className="absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-xl bg-white py-2 text-slate-800 shadow-xl ring-1 ring-slate-900/10">
      <button
        onClick={() => {
          navigate("/profile");
          setProfileOpen(false);
        }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-cyan-50"
      >
        <User size={17} /> Profile
      </button>
      <button
        onClick={() => {
          navigate(dashboardPath);
          setProfileOpen(false);
        }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-cyan-50"
      >
        <LayoutDashboard size={17} /> Dashboard
      </button>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-rose-600 hover:bg-rose-50"
      >
        <LogOut size={17} /> Logout
      </button>
    </div>
  );

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      } bg-linear-to-r from-slate-950 via-cyan-950 to-blue-900 text-white shadow-lg shadow-cyan-950/20`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link
          to="/"
          className="shrink-0 bg-linear-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-xl font-extrabold text-transparent md:text-3xl"
        >
          GoExplore
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 font-medium lg:flex">
          {navLinks}
        </div>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          {user ? (
            <>
              <button
                onClick={() => navigate(dashboardPath)}
                aria-label="Open dashboard"
                className="relative rounded-xl bg-white/10 p-2.5 transition hover:bg-white/20"
              >
                <LayoutDashboard size={20} />
                {cartCount?.count > 0 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-xs text-white">
                    {cartCount.count}
                  </span>
                )}
              </button>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-white/15"
                >
                  {userDB?.profileImage || user.photoURL ? (
                    <img
                      src={userDB?.profileImage || user.photoURL}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={20} />
                  )}
                </button>
                {profileOpen && profileMenu}
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl bg-amber-300 px-5 py-2 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Login
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3 lg:hidden">
          {user ? (
            <>
              <button
                onClick={() => navigate(dashboardPath)}
                aria-label="Open dashboard"
                className="relative rounded-lg bg-white/10 p-2 hover:bg-white/20"
              >
                <LayoutDashboard size={18} />
                {cartCount?.count > 0 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-xs text-white">
                    {cartCount.count}
                  </span>
                )}
              </button>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-white/15"
                >
                  {userDB?.profileImage || user.photoURL ? (
                    <img
                      src={userDB?.profileImage || user.photoURL}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={18} />
                  )}
                </button>
                {profileOpen && profileMenu}
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg bg-amber-300 px-4 py-2 font-semibold text-slate-950"
            >
              Login
            </button>
          )}
          <button
            type="button"
            ref={menuToggleRef}
            aria-label="Open navigation menu"
            aria-controls="mobile-navigation-drawer"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="rounded-lg p-2 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
          >
            <Menu className="text-white" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[55] cursor-default bg-slate-950/65 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              id="mobile-navigation-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-drawer-title"
              initial={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-[60] flex h-[100dvh] w-[min(88vw,24rem)] flex-col overflow-y-auto bg-linear-to-b from-slate-950 via-cyan-950 to-blue-950 px-6 pb-8 pt-5 text-white shadow-2xl ring-1 ring-white/10 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                    GoExplore
                  </p>
                  <h2 id="mobile-drawer-title" className="mt-1 text-xl font-bold">
                    Where to next?
                  </h2>
                </div>
                <button
                  ref={closeDrawerRef}
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
                >
                  <X size={20} />
                </button>
              </div>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-2 py-7 text-lg"
              >
                {navLinks}
              </nav>

              <div className="mt-auto space-y-3 border-t border-white/10 pt-5">
                {user ? (
                  <>
                    <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                      Your account
                    </p>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/10"
                    >
                      <User size={18} /> Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate(dashboardPath);
                        setMenuOpen(false);
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/10"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-rose-200 transition hover:bg-rose-400/10"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                    className="w-full rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
                  >
                    Login to GoExplore
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
