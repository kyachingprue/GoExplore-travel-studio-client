import { useMemo, useState } from "react";
import {
  AlertCircle,
  MessageSquareText,
  Send,
  Star,
  UserRound,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MIN_COMMENT_LENGTH = 10;
const MAX_COMMENT_LENGTH = 1000;

const ReviewStars = ({ rating, size = 17 }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        aria-hidden="true"
        size={size}
        className={
          star <= rating
            ? "fill-amber-400 text-amber-400"
            : "fill-slate-100 text-slate-300"
        }
      />
    ))}
  </span>
);

const formatReviewDate = (date) => {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "Recently"
    : new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(parsedDate);
};

const PackageReviews = ({ packageId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reviews", packageId],
    queryFn: async () => {
      const params = new URLSearchParams({ packageId });
      const res = await axiosPublic.get(`/reviews?${params}`);
      if (!Array.isArray(res.data)) {
        throw new Error("The reviews response was not a list");
      }
      return res.data;
    },
    enabled: Boolean(packageId),
  });

  const validReviews = useMemo(
    () =>
      reviews.filter((review) => {
        const score = Number(review.rating);
        return (
          Number.isInteger(score) &&
          score >= 1 &&
          score <= 5 &&
          typeof review.comment === "string"
        );
      }),
    [reviews],
  );

  const ratingSummary = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    let total = 0;
    validReviews.forEach((review) => {
      const score = Number(review.rating);
      counts[score - 1] += 1;
      total += score;
    });

    return {
      count: validReviews.length,
      average: validReviews.length ? total / validReviews.length : 0,
      counts,
    };
  }, [validReviews]);

  const sortedReviews = useMemo(() => {
    const sorted = [...validReviews];
    if (sortOrder === "highest") {
      return sorted.sort((a, b) => Number(b.rating) - Number(a.rating));
    }
    if (sortOrder === "lowest") {
      return sorted.sort((a, b) => Number(a.rating) - Number(b.rating));
    }
    return sorted.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [validReviews, sortOrder]);

  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Thanks for sharing your experience!");
      setComment("");
      setRating(0);
      setAlreadyReviewed(false);
      await queryClient.invalidateQueries({ queryKey: ["reviews", packageId] });
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        setAlreadyReviewed(true);
        toast.error("You’ve already reviewed this trip.");
        return;
      }
      toast.error(
        error?.response?.data?.message || "We couldn’t submit your review. Please try again.",
      );
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("Please log in to share a review");
      navigate("/login", { state: { from: location } });
      return;
    }

    const trimmedComment = comment.trim();
    if (!rating) {
      toast.error("Choose a star rating before submitting");
      return;
    }
    if (trimmedComment.length < MIN_COMMENT_LENGTH) {
      toast.error(`Please write at least ${MIN_COMMENT_LENGTH} characters`);
      return;
    }
    if (trimmedComment.length > MAX_COMMENT_LENGTH) {
      toast.error(`Reviews can be up to ${MAX_COMMENT_LENGTH} characters`);
      return;
    }

    reviewMutation.mutate({
      packageId,
      rating,
      comment: trimmedComment,
    });
  };

  return (
    <section
      aria-labelledby="package-reviews-heading"
      className="mt-16 border-t border-slate-200 pt-12 sm:mt-20 sm:pt-16"
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">
            Traveler stories
          </p>
          <h2
            id="package-reviews-heading"
            className="mt-2 flex items-center gap-3 text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            <MessageSquareText className="shrink-0 text-sky-800" size={27} />
            Reviews & ratings
          </h2>
        </div>
        {ratingSummary.count > 0 && (
          <p className="text-sm font-medium text-slate-600">
            Based on {ratingSummary.count}{" "}
            {ratingSummary.count === 1 ? "review" : "reviews"}
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.7fr)]">
        <div className="min-w-0 space-y-5">
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center sm:p-7">
            <div className="text-center sm:border-r sm:border-slate-200 sm:pr-6">
              <p className="text-5xl font-extrabold tracking-tight text-slate-950">
                {ratingSummary.count ? ratingSummary.average.toFixed(1) : "—"}
              </p>
              <div className="mt-3 flex justify-center">
                <ReviewStars rating={Math.round(ratingSummary.average)} size={18} />
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {ratingSummary.count
                  ? `${ratingSummary.count} traveler ${ratingSummary.count === 1 ? "review" : "reviews"}`
                  : "No ratings yet"}
              </p>
            </div>

            <div className="space-y-2.5" aria-label="Rating distribution">
              {[5, 4, 3, 2, 1].map((score) => {
                const count = ratingSummary.counts[score - 1];
                const percent = ratingSummary.count
                  ? (count / ratingSummary.count) * 100
                  : 0;
                return (
                  <div key={score} className="flex items-center gap-3">
                    <span className="w-8 shrink-0 text-sm font-medium text-slate-600">
                      {score} star
                    </span>
                    <div
                      className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100"
                      role="progressbar"
                      aria-label={`${score} star reviews`}
                      aria-valuemin={0}
                      aria-valuemax={ratingSummary.count}
                      aria-valuenow={count}
                    >
                      <div
                        className="h-full rounded-full bg-amber-400 transition-[width] duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-7 text-right text-xs tabular-nums text-slate-500">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">
              What travelers say
            </h3>
            {validReviews.length > 1 && (
              <label className="flex items-center gap-2 text-sm text-slate-600">
                Sort by
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  className="min-h-10 rounded-lg border border-slate-300 bg-white px-3 font-semibold text-slate-800 outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-700/15"
                >
                  <option value="newest">Most recent</option>
                  <option value="highest">Highest rated</option>
                  <option value="lowest">Lowest rated</option>
                </select>
              </label>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3" aria-label="Loading reviews" aria-live="polite">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex gap-3">
                    <div className="h-11 w-11 rounded-full bg-slate-200" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-36 rounded bg-slate-200" />
                      <div className="h-3 w-full rounded bg-slate-100" />
                      <div className="h-3 w-3/4 rounded bg-slate-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div
              role="alert"
              className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center"
            >
              <AlertCircle className="mx-auto text-rose-600" size={24} />
              <p className="mt-3 font-semibold text-slate-900">
                Reviews are temporarily unavailable
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Your trip details are still available. Please try loading reviews again.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 rounded-lg px-4 py-2 text-sm font-bold text-rose-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
              >
                Try again
              </button>
            </div>
          ) : sortedReviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-800">
                <Star size={22} />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">
                Be the first to share your experience
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
                Your feedback helps other travelers decide if this journey is right for them.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedReviews.map((review) => {
                const displayName = review.userName?.trim() || "Traveler";
                return (
                  <article
                    key={review._id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md sm:p-6"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {review.userImage ? (
                        <img
                          src={review.userImage}
                          alt=""
                          loading="lazy"
                          className="h-11 w-11 shrink-0 rounded-full bg-slate-100 object-cover ring-2 ring-white"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-800"
                        >
                          <UserRound size={20} />
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-slate-900">
                              {displayName}
                            </h4>
                            <time
                              className="mt-0.5 block text-xs text-slate-500"
                              dateTime={
                                Number.isNaN(new Date(review.createdAt).getTime())
                                  ? undefined
                                  : new Date(review.createdAt).toISOString()
                              }
                            >
                              {formatReviewDate(review.createdAt)}
                            </time>
                          </div>
                          <ReviewStars rating={Number(review.rating)} size={15} />
                        </div>
                        <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-24">
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-800">
              Your feedback matters
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Rate this journey
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Share an honest review to help the GoExplore community plan with confidence.
            </p>
          </div>

          {alreadyReviewed ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-semibold text-emerald-950">
                You’ve already reviewed this trip.
              </p>
              <Link
                to="/dashboard/reviews"
                className="mt-3 inline-flex text-sm font-bold text-emerald-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                Manage your review
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-slate-800">
                  Your rating
                </legend>
                <div
                  className="flex items-center gap-1"
                  role="radiogroup"
                  aria-label="Choose a rating from 1 to 5 stars"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      role="radio"
                      aria-checked={rating === score}
                      aria-label={`${score} ${score === 1 ? "star" : "stars"}`}
                      onClick={() => setRating(score)}
                      onMouseEnter={() => setHoverRating(score)}
                      className="rounded-md p-1 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-amber-500"
                    >
                      <Star
                        size={29}
                        aria-hidden="true"
                        className={
                          (hoverRating || rating) >= score
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-100 text-slate-300"
                        }
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-slate-600">
                    {rating ? `${rating}/5` : "Select"}
                  </span>
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="package-review"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Your review
                </label>
                <textarea
                  id="package-review"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  minLength={MIN_COMMENT_LENGTH}
                  maxLength={MAX_COMMENT_LENGTH}
                  rows={5}
                  placeholder="What did you enjoy? What should future travelers know?"
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-700 focus:ring-4 focus:ring-sky-700/10"
                  aria-describedby="review-length"
                />
                <div
                  id="review-length"
                  className="mt-1 flex justify-between gap-2 text-xs text-slate-500"
                >
                  <span>At least {MIN_COMMENT_LENGTH} characters</span>
                  <span className="tabular-nums">
                    {comment.length}/{MAX_COMMENT_LENGTH}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={reviewMutation.isPending}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-800 to-cyan-700 px-5 font-bold text-white shadow-md shadow-sky-900/10 transition hover:from-sky-700 hover:to-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={17} />
                {reviewMutation.isPending ? "Submitting…" : "Submit review"}
              </button>
              <p className="text-center text-xs leading-5 text-slate-500">
                {user
                  ? "Your review will be visible to other travelers."
                  : "Log in to submit your review."}
              </p>
            </form>
          )}
        </aside>
      </div>
    </section>
  );
};

export default PackageReviews;
