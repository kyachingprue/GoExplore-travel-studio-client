
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  CalendarDays,
  User,
  Sun,
  Mountain,
  Utensils,
  Sparkles,
  BookOpen,
  Route,
  Bus,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import LoadingSpinner from "../LoadingSpinner";

const ExperienceCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosPublic.get(`/experiences/${id}`);

        if (isMounted) {
          setExperience(res.data);
        }
      } catch (err) {
        console.error("Experience fetching error:", err);

        if (isMounted) {
          setExperience(null);
          setError(
            err.response?.data?.message ||
              "Failed to load experience. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchExperience();
    } else {
      setError("Experience ID is missing.");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id, axiosPublic]);

  useDocumentTitle(
    experience?.title || "Experience Details"
  );

  // Loading State
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
          <Sparkles className="w-10 h-10 text-red-400" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Something went wrong!
        </h2>

        <p className="text-slate-500 mb-6 max-w-md">
          {error}
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-all"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/experience")}
            className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all"
          >
            Back to Experiences
          </button>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!experience) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-sky-100 to-cyan-100 flex items-center justify-center mb-6">
          <Sparkles className="w-10 h-10 text-sky-400" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Experience not found
        </h2>

        <p className="text-slate-500 mb-6 text-center">
          The experience you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/experience")}
          className="px-6 py-3 rounded-xl bg-linear-to-r from-sky-600 to-cyan-600 text-white font-semibold shadow-lg hover:from-sky-700 hover:to-cyan-700 transition-all"
        >
          Back to Experiences
        </button>
      </div>
    );
  }

  const ratingValue = Number(experience.rating) || 0;

  // Safe Date Formatting
  const formattedDate = experience.createdAt
    ? new Date(experience.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )
    : "N/A";

  // Highlights
  const highlights = [
    {
      image: experience.sunriseImage,
      title: experience.sunriseTitle,
      icon: Sun,
      label: "Sunrise",
    },
    {
      image: experience.trekImage,
      title: experience.trekTitle,
      icon: Mountain,
      label: "Trek",
    },
    {
      image: experience.foodImage,
      title: experience.foodTitle,
      icon: Utensils,
      label: "Food",
    },
  ].filter((item) => item.image);

  // Dynamic Itinerary
  const itinerary = [
    { day: 1, content: experience.day1 },
    { day: 2, content: experience.day2 },
    { day: 3, content: experience.day3 },
    { day: 4, content: experience.day4 },
  ].filter((item) => item.content);

  // Quick Stats
  const stats = [
    {
      icon: Clock,
      label: "Duration",
      value: experience.duration || "N/A",
    },
    {
      icon: Star,
      label: "Rating",
      value: `${ratingValue.toFixed(1)} / 5`,
    },
    {
      icon: User,
      label: "By",
      value: experience.createdBy || "Unknown",
    },
    {
      icon: CalendarDays,
      label: "Date",
      value: formattedDate,
    },
  ];

  return (
    <div className="relative min-h-screen bg-linear-to-b from-sky-50 via-white to-cyan-50 pt-16 md:pt-20 overflow-hidden">

      {/* Background Gradient Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-12 w-96 h-96 bg-sky-400/25 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-20 right-12 w-80 h-80 bg-blue-400/25 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-12">

        {/* Back Button + Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2"
        >
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-3 rounded-xl bg-white shadow-sm shadow-slate-900/5 border border-slate-200 hover:border-slate-300 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>

          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Route className="w-3 h-3 text-slate-400" />
            Experience Details
          </span>
        </motion.div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-950/10 h-95 md:h-130 mb-8"
        >
          <img
            src={experience.image || "/placeholder.jpg"}
            alt={experience.title || "Experience"}
            loading="eager"
            className="h-full w-full object-cover object-center transition-opacity duration-1000"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">

            {/* Badges */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">

              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-xs font-bold shadow-sm backdrop-blur">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {ratingValue.toFixed(1)} / 5
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 text-slate-700 text-xs font-medium backdrop-blur">
                <Clock className="w-3 h-3" />
                {experience.duration || "N/A"}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 text-slate-700 text-xs font-medium backdrop-blur">
                <MapPin className="w-3 h-3" />
                {experience.location || "Unknown Location"}
              </span>

            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              {experience.title}
            </h1>

            <p className="text-slate-200 text-lg md:text-xl max-w-2xl line-clamp-2 leading-relaxed">
              {experience.shortIntro}
            </p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative -mt-10 z-10 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 px-2 md:px-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-sm shadow-sky-900/5 flex flex-col items-center text-center min-w-0"
            >
              <stat.icon className="w-5 h-5 text-sky-500 mb-2" />

              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>

              <span className="text-sm md:text-base font-bold text-slate-800 mt-1 wrap-break-word">
                {stat.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-3 gap-8 py-10"
        >

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100/50 shadow-sm shadow-sky-900/5">
              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-100 to-cyan-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-sky-600" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  About This Experience
                </h3>

              </div>

              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {experience.description || "No description available."}
              </p>
            </div>

            {/* Story */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100/50 shadow-sm shadow-sky-900/5">
              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  Story & Journey
                </h3>

              </div>

              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {experience.story || "No story available."}
              </p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100/50 shadow-sm shadow-sky-900/5">

                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Sun className="w-6 h-6 text-amber-500" />
                  Highlights
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="relative h-48 rounded-2xl overflow-hidden mb-3">

                        <img
                          src={highlight.image}
                          alt={highlight.title || highlight.label}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 to-transparent" />

                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                          <highlight.icon className="w-5 h-5" />
                          <span className="font-semibold">
                            {highlight.label}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-700 font-medium text-center text-sm">
                        {highlight.title || highlight.label}
                      </p>
                    </motion.div>
                  ))}

                </div>
              </div>
            )}

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100/50 shadow-sm shadow-sky-900/5">

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-100 to-cyan-100 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-sky-600" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Trip Itinerary
                  </h3>
                </div>

                <div className="space-y-5">
                  {itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="flex gap-4 items-start"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                        {item.day}
                      </div>

                      <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <h4 className="font-bold text-slate-800 mb-2">
                          Day {item.day}
                        </h4>

                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Transport & Guide */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-100/50 shadow-sm shadow-sky-900/5">

              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Transport & Guide
              </h3>

              <div className="space-y-5">

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-sky-100 flex items-center justify-center">
                    <Bus className="w-5 h-5 text-sky-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Transport
                    </p>

                    <p className="text-slate-800 font-medium">
                      {experience.transport || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Tour Guide
                    </p>

                    <p className="text-slate-800 font-medium">
                      {experience.guide || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Experience Status
                    </p>

                    <p className="text-emerald-600 font-semibold">
                      Available
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceCardDetails;
