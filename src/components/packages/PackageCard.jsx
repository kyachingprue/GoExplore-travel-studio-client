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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-sky-950/10"
    >
      <div className="relative h-52 w-full overflow-hidden sm:h-60">
        <motion.img
          src={image}
          alt={`${title} tour`}
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/65 via-slate-950/5 to-slate-950/20" />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          <span className="inline-flex max-w-[75%] items-center gap-2 truncate rounded-full border border-white/30 bg-slate-950/45 px-3 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
            <Plane
              aria-hidden="true"
              size={14}
              className="shrink-0 text-amber-200"
            />
            <span className="truncate">{type || "Travel package"}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-2 text-sm font-bold text-slate-900 shadow-md">
            <Star
              aria-hidden="true"
              size={15}
              className="fill-amber-400 text-amber-400"
            />
            {Number(rating) > 0 ? Number(rating).toFixed(1) : "New"}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 flex max-w-[90%] items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-medium text-slate-800 shadow-md backdrop-blur">
          <MapPin
            aria-hidden="true"
            size={16}
            className="shrink-0 text-sky-700"
          />
          <span className="truncate">
            {[location, country].filter(Boolean).join(", ")}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-sky-800 sm:text-2xl">
            {title}
          </h3>
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-sm font-medium text-sky-900">
            <Clock aria-hidden="true" size={17} className="text-sky-700" />
            <span>{duration || "Flexible duration"}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Starting from
            </p>
            <p className="mt-0.5 text-2xl font-extrabold text-slate-900">
              ${Number(price).toLocaleString()}
              <span className="ml-1 text-sm font-normal text-slate-500">
                / person
              </span>
            </p>
          </div>

          <Link
            to={`/packages/${_id}`}
            aria-label={`View details for ${title}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-800 to-cyan-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-sky-700 hover:to-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
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
