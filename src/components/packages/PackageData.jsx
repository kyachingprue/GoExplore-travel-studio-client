import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownWideNarrow,
  Compass,
  LoaderCircle,
  MapPin,
  RotateCw,
  Search,
  SlidersHorizontal,
  WifiOff,
} from "lucide-react";
import PackageCard from "./PackageCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ITEMS_PER_PAGE = 8;

const PackageData = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const [activeCountry, setActiveCountry] = useState(
    () => new URLSearchParams(location.search).get("country") || "All"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [budgetLimit, setBudgetLimit] = useState(null);

  const {
    data: packages = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      if (!Array.isArray(res.data)) {
        throw new Error("The package response was invalid.");
      }
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const countries = useMemo(
    () => ["All", ...new Set(packages.map((pkg) => pkg.country).filter(Boolean))],
    [packages]
  );
  const selectedCountry = countries.includes(activeCountry)
    ? activeCountry
    : "All";

  const maxPackagePrice = useMemo(
    () => Math.max(0, ...packages.map((pkg) => Number(pkg.price) || 0)),
    [packages]
  );

  const filteredPackages = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    const results = packages.filter((pkg) => {
      const matchesCountry =
        selectedCountry === "All" || pkg.country === selectedCountry;
      const searchableText = [
        pkg.title,
        pkg.country,
        pkg.location,
        pkg.type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !search || searchableText.includes(search);
      const matchesBudget =
        budgetLimit === null || (Number(pkg.price) || 0) <= budgetLimit;

      return matchesCountry && matchesSearch && matchesBudget;
    });

    if (priceSort === "lowToHigh") {
      results.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (priceSort === "highToLow") {
      results.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return results;
  }, [packages, selectedCountry, searchText, budgetLimit, priceSort]);

  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);
  const currentItems = filteredPackages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setActiveCountry("All");
    setSearchText("");
    setPriceSort("");
    setBudgetLimit(null);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <section
        aria-label="Loading travel packages"
        className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 md:px-6 lg:grid-cols-[270px_minmax(0,1fr)]"
      >
        <div className="h-72 animate-pulse rounded-2xl bg-white/80 shadow-sm" />
        <div className="space-y-5">
          <div className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-sky-800">
            <LoaderCircle aria-hidden="true" size={18} className="animate-spin" />
            Finding your next journey...
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-2xl bg-white/80 shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError && packages.length === 0) {
    return (
      <section className="flex min-h-[50vh] w-full items-center justify-center bg-linear-to-br from-sky-50 via-white to-cyan-100 px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-white bg-white/90 p-8 text-center shadow-xl shadow-sky-900/10 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
            <WifiOff aria-hidden="true" size={30} />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Travel service unavailable
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            We couldn’t load the packages
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            The travel server may be taking a short break. Your page is still
            here—try loading the packages again in a moment.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-700 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-wait disabled:opacity-70"
          >
            <RotateCw
              aria-hidden="true"
              size={18}
              className={isFetching ? "animate-spin" : ""}
            />
            {isFetching ? "Loading packages..." : "Reload packages"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-linear-to-br from-sky-50 via-white to-cyan-50">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 px-4 py-10 md:px-6 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-8">
        <aside className="h-fit rounded-2xl border border-sky-100 bg-white p-5 shadow-lg shadow-sky-900/5 lg:sticky lg:top-24">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <SlidersHorizontal aria-hidden="true" size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Find your trip</h2>
              <p className="text-sm text-slate-500">Refine your adventure</p>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Search destinations
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100">
                <Search aria-hidden="true" size={18} className="shrink-0 text-slate-400" />
                <input
                  type="search"
                  value={searchText}
                  onChange={(event) => {
                    setSearchText(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="City, country, or tour"
                  className="min-w-0 w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Destination
              </span>
              <span className="relative block">
                <MapPin
                  aria-hidden="true"
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={selectedCountry}
                  onChange={(event) => {
                    setActiveCountry(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label
                  htmlFor="package-budget"
                  className="text-sm font-semibold text-slate-700"
                >
                  Maximum budget
                </label>
                <span className="text-sm font-bold text-sky-800">
                  ${(budgetLimit ?? maxPackagePrice).toLocaleString()}
                </span>
              </div>
              <input
                id="package-budget"
                type="range"
                min="0"
                max={Math.max(maxPackagePrice, 1)}
                step="any"
                value={budgetLimit ?? maxPackagePrice}
                onChange={(event) => {
                  setBudgetLimit(Number(event.target.value));
                  setCurrentPage(1);
                }}
                className="h-2 w-full cursor-pointer accent-sky-700"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>$0</span>
                <span>Up to ${maxPackagePrice.toLocaleString()}</span>
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Sort by price
              </span>
              <span className="relative block">
                <ArrowDownWideNarrow
                  aria-hidden="true"
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={priceSort}
                  onChange={(event) => {
                    setPriceSort(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="">Recommended</option>
                  <option value="lowToHigh">Price: low to high</option>
                  <option value="highToLow">Price: high to low</option>
                </select>
              </span>
            </label>

            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-xl border border-sky-200 px-4 py-2.5 text-sm font-semibold text-sky-800 transition hover:bg-sky-50"
            >
              Reset filters
            </button>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                Curated for you
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Explore travel packages
              </h2>
            </div>
            <p className="flex items-center gap-2 text-sm text-slate-500">
              {isFetching && (
                <LoaderCircle
                  aria-hidden="true"
                  size={15}
                  className="animate-spin text-sky-700"
                />
              )}
              {filteredPackages.length}{" "}
              {filteredPackages.length === 1 ? "journey" : "journeys"}
            </p>
          </div>

          {isError && packages.length > 0 && (
            <div
              role="status"
              className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              <span>We couldn’t refresh the latest packages. Showing saved results.</span>
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center gap-2 font-semibold underline underline-offset-2 disabled:opacity-60"
              >
                <RotateCw size={15} className={isFetching ? "animate-spin" : ""} />
                Try again
              </button>
            </div>
          )}

          {currentItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-sky-200 bg-white/80 px-5 py-14 text-center">
              <Compass aria-hidden="true" size={36} className="mx-auto text-sky-600" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {packages.length === 0
                  ? "No travel packages are available yet"
                  : "No trips match these filters"}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                {packages.length === 0
                  ? "There are no packages to show right now. Reload to check for new journeys."
                  : "Try another destination or increase your budget to see more adventures."}
              </p>
              {packages.length === 0 ? (
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-800 px-5 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
                >
                  <RotateCw
                    size={17}
                    className={isFetching ? "animate-spin" : ""}
                  />
                  Reload packages
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-sky-800 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
                {currentItems.map((pkg) => (
                  <PackageCard key={pkg._id} pkg={pkg} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Package pages"
                  className="mt-10 flex flex-wrap items-center justify-center gap-2"
                >
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        aria-current={currentPage === page ? "page" : undefined}
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${
                          currentPage === page
                            ? "bg-sky-800 text-white shadow"
                            : "bg-white text-slate-700 hover:bg-sky-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageData;
