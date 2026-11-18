
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

import {
  MapPin,
  Eye,
  Loader2,
  Star,
  Clock,
  Compass,
  CalendarDays,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

import useAxiosPublic from "../../hooks/useAxiosPublic";

const ExperienceCard = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // Fetch Experiences
  const {
    data: experiences = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await axiosPublic.get("/experiences");
      return res.data;
    },
  });

  // Safe Date Formatter
  const formatDate = (date) => {
    if (!date) return "Recently added";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently added";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-100 flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center">
          <Loader2 className="w-9 h-9 animate-spin text-sky-500" />
        </div>

        <p className="text-slate-500 text-base font-medium">
          Loading amazing experiences...
        </p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-100 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
          <Compass className="w-8 h-8 text-red-400" />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
          Unable to Load Experiences
        </h3>

        <p className="text-slate-500 text-sm mb-6 max-w-md">
          Something went wrong while loading experiences.
          Please check your connection and try again.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-sky-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-60"
        >
          <RefreshCw
            className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="relative isolate w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-sky-50 via-white to-cyan-50" />

      {/* Background Decoration */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -z-10 top-10 left-0 w-72 h-72 md:w-96 md:h-96 bg-sky-300/30 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -z-10 bottom-10 right-0 w-72 h-72 md:w-96 md:h-96 bg-cyan-300/30 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="text-center mb-12 md:mb-16"
        >

          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-sky-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 border border-sky-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500" />
            Curated Experiences
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-5">
            Explore Unforgettable

            <br className="hidden sm:block" />

            <span className="bg-linear-to-r from-sky-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Discover handpicked adventures, unique local experiences,
            and curated travel journeys. Each experience offers
            unforgettable moments, expert guides, and memories
            that last a lifetime.
          </p>

          {/* Decorative Line */}
          <div className="flex justify-center items-center gap-3 mt-7">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-sky-400" />
            <Compass className="w-5 h-5 text-sky-500" />
            <div className="w-12 h-px bg-linear-to-l from-transparent to-sky-400" />
          </div>

        </motion.div>

        {/* Experience Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-7">

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Discover Experiences
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Find your next unforgettable adventure.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />

            <span className="text-sm font-semibold text-slate-700">
              {experiences.length} Experiences
            </span>
          </div>

        </div>

        {/* Experience Grid */}
        {experiences.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
          >

            {experiences.map((experience) => {
              const rating = Number(experience.rating) || 0;

              return (
                <motion.article
                  key={experience._id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        ease: "easeOut",
                      },
                    },
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                    transition: {
                      duration: 0.25,
                      ease: "easeOut",
                    },
                  }}
                  whileTap={{
                    scale: 0.995,
                  }}
                  onClick={() =>
                    navigate(`/experience/${experience._id}`)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      navigate(`/experience/${experience._id}`);
                    }
                  }}
                  role="link"
                  tabIndex={0}
                  aria-label={`View ${experience.title} details`}
                  className="group relative flex flex-col min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/4 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/8 transition-[border-color,box-shadow] duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4"
                >

                  {/* Image Section */}
                  <div className="relative h-52 sm:h-56 lg:h-60 w-full overflow-hidden bg-slate-100">

                    <img
                      src={experience.image || "/placeholder.jpg"}
                      alt={`${experience.title || "Travel"} experience`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/10 to-slate-950/10 pointer-events-none" />

                    {/* Top Left Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-sky-600" />
                        Experience
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-sm font-bold shadow-sm">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />

                        {rating > 0 ? rating.toFixed(1) : "New"}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-flex items-center gap-2 max-w-full px-3 py-2 rounded-xl bg-black/35 backdrop-blur-md border border-white/15 text-white text-sm font-medium">

                        <MapPin className="w-4 h-4 text-amber-300 shrink-0" />

                        <span className="truncate">
                          {experience.location || "Beautiful Destination"}
                        </span>

                      </div>
                    </div>

                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">

                    {/* Title */}
                    <div className="mb-4">

                      <h3 className="text-lg sm:text-xl font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-sky-700 transition-colors duration-300">
                        {experience.title || "Untitled Experience"}
                      </h3>

                      {/* Duration and Rating */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">

                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 text-xs sm:text-sm font-semibold">
                          <Clock className="w-4 h-4" />

                          {experience.duration || "Flexible"}
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 text-xs sm:text-sm font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />

                          {rating > 0 ? rating.toFixed(1) : "New"} / 5
                        </span>

                      </div>

                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
                      {experience.shortIntro ||
                        "Discover this amazing travel experience and create unforgettable memories."}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-slate-100 mb-4" />

                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3">

                      {/* Creator and Date */}
                      <div className="min-w-0 space-y-1">

                        <p className="text-xs text-slate-500 truncate">
                          By{" "}
                          <span className="font-semibold text-slate-700">
                            {experience.createdBy || "Travel Expert"}
                          </span>
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <CalendarDays className="w-3.5 h-3.5 shrink-0" />

                          {formatDate(experience.createdAt)}
                        </div>

                      </div>

                      {/* View Details */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-linear-to-r from-sky-600 to-cyan-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-900/10 group-hover:shadow-lg group-hover:shadow-sky-900/15 transition-shadow duration-300">

                        <Eye className="w-4 h-4" />

                        <span>View Details</span>

                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

                      </div>

                    </div>

                  </div>

                </motion.article>
              );
            })}

          </motion.div>
        )}

        {/* Empty State */}
        {experiences.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="text-center py-16 md:py-24 px-4 rounded-3xl bg-white/80 border border-slate-200 shadow-sm"
          >

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-sky-100 to-cyan-100 mb-6">
              <Compass className="w-10 h-10 text-sky-500" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
              No Experiences Yet
            </h3>

            <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Be the first to add an amazing experience
              for travelers to discover!
            </p>

          </motion.div>
        )}

        {/* Bottom Decoration */}
        {experiences.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-12 md:mt-16">

            <div className="w-12 h-px bg-linear-to-r from-transparent to-sky-300" />

            <Sparkles className="w-4 h-4 text-sky-500" />

            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Discover · Explore · Experience
            </span>

            <div className="w-12 h-px bg-linear-to-l from-transparent to-sky-300" />

          </div>
        )}

      </div>
    </section>
  );
};

export default ExperienceCard;
