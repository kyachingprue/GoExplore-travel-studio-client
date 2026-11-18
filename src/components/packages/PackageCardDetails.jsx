import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Globe2,
  MapPin,
  Plane,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import PackageReviews from "./PackageReviews";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const PackageCardDetails = () => {
  const { _id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: packageData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["package", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/packages/${_id}`);
      return res.data;
    },
    enabled: Boolean(_id),
  });

  useDocumentTitle(packageData ? packageData.title : "Package Details");

  const { data: userDB } = useQuery({
    queryKey: ["mongoUser", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
    enabled: Boolean(user?.email),
    staleTime: 5 * 60 * 1000,
  });

  const addToCartMutation = useMutation({
    mutationFn: async () =>
      axiosSecure.post("/myPackage", {
        userEmail: user.email,
        packageId: _id,
        title: packageData.title,
        price: packageData.price,
        image: packageData.image,
        payment_status: "pending",
        createdAt: new Date(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartCheck"] });
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      toast.success("Added to cart");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    },
  });

  const { data: cartStatus, isLoading: isCartStatusLoading } = useQuery({
    queryKey: ["cartCheck", user?.email, _id],
    enabled: Boolean(user?.email && _id),
    queryFn: async () => {
      const params = new URLSearchParams({
        email: user.email,
        packageId: _id,
      });
      const res = await axiosSecure.get(`/myPackage/check?${params}`);
      return res.data;
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () =>
      axiosSecure.post("/bookmark", {
        userEmail: user.email,
        packageId: _id,
        title: packageData.title,
        image: packageData.image,
        price: packageData.price,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkCheck"] });
      toast.success("Package bookmarked");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to bookmark");
    },
  });

  const { data: bookmarkStatus, isLoading: isBookmarkStatusLoading } = useQuery({
    queryKey: ["bookmarkCheck", user?.email, _id],
    enabled: Boolean(user?.email && _id),
    queryFn: async () => {
      const params = new URLSearchParams({
        email: user.email,
        packageId: _id,
      });
      const res = await axiosSecure.get(`/bookmark/check?${params}`);
      return res.data;
    },
  });

  const handleAuthRequired = () => {
    if (!user) {
      toast.error("Please log in to save this trip");
      navigate("/login", { state: { from: location } });
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (handleAuthRequired()) addToCartMutation.mutate();
  };

  const handleBookmark = () => {
    if (handleAuthRequired()) bookmarkMutation.mutate();
  };

  if (isLoading) {
    return (
      <main className="min-h-[65vh] bg-slate-50 px-4 pb-16 pt-28">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-8 w-40 rounded-lg bg-slate-200" />
          <div className="h-80 rounded-3xl bg-slate-200 sm:h-[30rem]" />
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-28 rounded-2xl bg-slate-200" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-4 py-20">
        <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <Plane size={26} />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">
            Trip details unavailable
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">
            We couldn’t load this package
          </h1>
          <p className="mt-3 text-slate-600">
            Please try again. If the package has been removed, you can return
            to all available trips.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="min-h-11 rounded-xl bg-sky-800 px-5 font-semibold text-white transition hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
            >
              Try again
            </button>
            <Link
              to="/packages"
              className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-5 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Browse packages
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!packageData) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-4 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Package not found
          </h1>
          <p className="mt-3 text-slate-600">
            This trip may no longer be available.
          </p>
          <Link
            to="/packages"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-800 px-5 font-semibold text-white transition hover:bg-sky-700"
          >
            <ArrowLeft size={17} />
            Back to packages
          </Link>
        </div>
      </main>
    );
  }

  const price = Number(packageData.price);
  const formattedPrice = Number.isFinite(price)
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(price)
    : "Contact us";
  const isAdmin = userDB?.role === "admin";
  const details = [
    {
      icon: MapPin,
      label: "Destination",
      value: packageData.location || packageData.country,
      color: "text-rose-600",
      background: "bg-rose-50",
    },
    {
      icon: Globe2,
      label: "Country",
      value: packageData.country,
      color: "text-sky-700",
      background: "bg-sky-50",
    },
    {
      icon: Clock3,
      label: "Trip length",
      value: packageData.duration,
      color: "text-violet-700",
      background: "bg-violet-50",
    },
  ].filter((detail) => detail.value);

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/packages"
          className="mb-5 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-600 transition hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
        >
          <ArrowLeft size={17} />
          All packages
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative isolate min-h-[24rem] overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl shadow-slate-900/10 sm:min-h-[32rem]"
        >
          <img
            src={packageData.image}
            alt={`${packageData.title} destination`}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                <Sparkles size={15} className="text-amber-300" />
                {packageData.type || "Curated journey"}
              </span>
              {packageData.duration && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                  <Clock3 size={15} />
                  {packageData.duration}
                </span>
              )}
            </div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-100 sm:text-base">
              <MapPin size={17} />
              {[packageData.location, packageData.country]
                .filter(Boolean)
                .join(", ")}
            </p>
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              {packageData.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base">
              Explore {packageData.location || packageData.country || "somewhere new"}{" "}
              with a thoughtfully planned {packageData.type?.toLowerCase() || "travel"}{" "}
              experience.
            </p>
          </div>
        </motion.section>

        <section
          aria-label="Package overview"
          className="relative z-10 -mt-5 grid gap-3 px-3 sm:grid-cols-3 sm:px-6"
        >
          {details.map(({ icon: Icon, label, value, color, background }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${background} ${color}`}
              >
                <Icon size={21} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <p className="mt-1 truncate font-bold text-slate-900">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">
              Your next story starts here
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Discover the journey
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Make time for a new perspective in{" "}
              {packageData.location || packageData.country || "a destination worth discovering"}.
              Review the trip details, then save this package or add it to your
              travel plans when you’re ready.
            </p>
            {packageData.type && (
              <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-950">
                <Plane size={19} className="shrink-0 text-sky-800" />
                <span>
                  Travel style: <strong>{packageData.type}</strong>
                </span>
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7">
            <p className="text-sm font-semibold text-slate-500">
              Starting price
            </p>
            <p className="mt-1 text-4xl font-extrabold tracking-tight text-slate-950">
              {formattedPrice}
              {Number.isFinite(price) && (
                <span className="ml-1 text-sm font-medium text-slate-500">
                  / person
                </span>
              )}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm leading-6 text-slate-600">
              <ShieldCheck size={17} className="shrink-0 text-emerald-700" />
              Save this trip and revisit it whenever you like.
            </p>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                disabled={
                  Boolean(cartStatus?.exists) ||
                  addToCartMutation.isPending ||
                  isCartStatusLoading ||
                  isAdmin
                }
                onClick={handleAddToCart}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-800 to-cyan-700 px-5 font-bold text-white shadow-md shadow-sky-900/15 transition hover:from-sky-700 hover:to-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:bg-none disabled:text-slate-600 disabled:shadow-none"
              >
                {cartStatus?.exists ? (
                  <Check size={19} />
                ) : (
                  <ShoppingCart size={19} />
                )}
                {isAdmin
                  ? "Admin account"
                  : cartStatus?.exists
                    ? "Added to your trips"
                    : addToCartMutation.isPending
                      ? "Adding to trips…"
                      : "Add to my trips"}
              </button>
              <button
                type="button"
                disabled={
                  Boolean(bookmarkStatus?.exists) ||
                  bookmarkMutation.isPending ||
                  isBookmarkStatusLoading ||
                  isAdmin
                }
                onClick={handleBookmark}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 font-bold text-slate-800 transition hover:border-sky-700 hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500"
              >
                {bookmarkStatus?.exists ? (
                  <Check size={19} />
                ) : (
                  <Bookmark size={19} />
                )}
                {isAdmin
                  ? "Admin account"
                  : bookmarkStatus?.exists
                    ? "Saved to bookmarks"
                    : bookmarkMutation.isPending
                      ? "Saving…"
                      : "Save this trip"}
              </button>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              {user
                ? "Your saved trips are available from your dashboard."
                : "You’ll be asked to log in when you save or add this trip."}
            </p>
          </aside>
        </section>

        <PackageReviews
          packageId={packageData._id}
          packageTitle={packageData.title}
          packageImage={packageData.image}
        />
      </div>
    </main>
  );
};

export default PackageCardDetails;
