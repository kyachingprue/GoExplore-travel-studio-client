import { motion } from "motion/react";
import { ArrowUpRight, MapPin, Clock, Star, Plane } from "lucide-react";
import { Link } from "react-router-dom";

const MotionArticle = motion.article;

const PackageCard = ({ pkg }) => {
  const {
    _id,
    title,
    country,
    location,
    price,
    duration,
    rating,
    image,
    type,
  } = pkg;

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl md:flex-row"
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.4 }}
        className="relative aspect-[16/10] w-full shrink-0 overflow-hidden md:aspect-auto md:min-h-64 md:w-5/12"
      >
        <img
          src={image}
          alt={`${title} tour`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/65 via-transparent to-slate-950/15" />
        <span className="absolute left-3 top-3 inline-flex max-w-[85%] items-center gap-1.5 truncate rounded-full border border-white/30 bg-slate-950/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <Plane aria-hidden="true" size={14} className="shrink-0 text-amber-200" />
          {type || "Travel package"}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-sm font-bold text-slate-900 shadow">
          <Star aria-hidden="true" size={15} className="fill-amber-400 text-amber-400" />
          {Number(rating) > 0 ? Number(rating).toFixed(1) : "New"}
        </span>
      </motion.div>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 sm:text-xl">
            {title}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin aria-hidden="true" size={15} className="shrink-0 text-sky-700" />
            <span className="truncate">{[location, country].filter(Boolean).join(", ")}</span>
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-2.5 py-2 text-xs font-medium text-sky-900 sm:text-sm">
              <Clock aria-hidden="true" size={15} />
              {duration || "Flexible duration"}
            </span>
            {type && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-2 text-xs font-medium text-amber-900 sm:text-sm">
                <Plane aria-hidden="true" size={15} />
                {type}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-4">
          <p className="text-xl font-extrabold text-slate-900">
            ${Number(price).toLocaleString()}
            <span className="ml-1 text-xs font-normal text-slate-500 sm:text-sm">
              / person
            </span>
          </p>

          <Link
            to={`/packages/${_id}`}
            aria-label={`View details for ${title}`}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-800 to-cyan-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-sky-700 hover:to-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            View trip
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </div>
    </MotionArticle>
  );
};

export default PackageCard;
