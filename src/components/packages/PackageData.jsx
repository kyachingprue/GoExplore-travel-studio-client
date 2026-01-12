import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PackageCard from "./PackageCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import { ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const PackageData = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const axiosPublic = useAxiosPublic();
  const [searchText, setSearchText] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const location = useLocation();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });

  useEffect(() => {
    if (!data.length) return;

    setPackages(data);

    const uniqueCountries = [
      "All",
      ...new Set(data.map((item) => item.country)),
    ];
    setCountries(uniqueCountries);

    // 🔥 URL country filter
    const params = new URLSearchParams(location.search);
    const countryFromURL = params.get("country");

    if (countryFromURL) {
      const filtered = data.filter(
        (item) => item.country === countryFromURL
      );
      setFilteredPackages(filtered);
      setActiveCountry(countryFromURL);
    } else {
      setFilteredPackages(data);
      setActiveCountry("All");
    }

    setCurrentPage(1);
  }, [data, location.search]);

  const handleCountryFilter = (country) => {
    setActiveCountry(country);
    applyFilters({ country });
  };

  const applyFilters = ({
    country = activeCountry,
    search = searchText,
    sort = priceSort,
  }) => {
    let result = [...packages];

    // country filter
    if (country !== "All") {
      result = result.filter((item) => item.country === country);
    }

    // search filter
    if (search) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.country.toLowerCase().includes(search.toLowerCase())
      );
    }

    // price sorting
    if (sort === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredPackages(result);
    setCurrentPage(1);
  };



  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load data</div>;
  }

  // pagination logic
  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredPackages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1, "...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 1) pages.push("...", totalPages);
    }
    return pages;
  };

  return (
    <div className="container bg-linear-to-b from-gray-300 via-sky-200 to-white mx-auto px-4 py-10">

      {/* Search & Price Filter */}
      <div className="flex flex-wrap gap-4 justify-evenly mb-10">

        {/* Search */}
        <div className="flex items-center gap-3">
          <h3 className="flex items-center gap-2 text-xl text-blue-950 font-bold">Search <ArrowRight/> </h3>
          <input
            type="text"
            placeholder="Search packages..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              applyFilters({ search: e.target.value });
            }}
            className="px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 w-64"
          />
        </div>

        {/* Price Sort */}
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-medium">Sort Price</h3>
          <select
            value={priceSort}
            onChange={(e) => {
              setPriceSort(e.target.value);
              applyFilters({ sort: e.target.value });
            }}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white"
          >
            <option value="">Default</option>
            <option value="lowToHigh">Low Price → High Price</option>
            <option value="highToLow">High Price → Low Price</option>
          </select>
        </div>
      </div>

      {/* Country Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {countries.map((country, index) => (
          <button
            key={index}
            onClick={() => handleCountryFilter(country)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition
              ${activeCountry === country
                ? "bg-linear-to-r from-gray-700 to-gray-900 text-white"
                : "bg-white hover:bg-gray-200 text-gray-700"
              }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Cards */}
      {currentItems.length === 0 ? (
        <p className="text-center md:py-40 text-gray-500">
          No packages found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentItems.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

              {/* Prev */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 rounded-full bg-white shadow text-gray-600 disabled:opacity-40 hover:bg-gray-100"
              >
                Prev
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="px-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-medium transition
                      ${currentPage === page
                        ? "bg-linear-to-r from-sky-400 to-sky-600 text-white shadow"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 rounded-full bg-white shadow text-gray-600 disabled:opacity-40 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PackageData;
