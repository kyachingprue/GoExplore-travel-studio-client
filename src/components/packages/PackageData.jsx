import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";

const ITEMS_PER_PAGE = 8;

const PackageData = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // fetch data
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setFilteredPackages(data);

        const uniqueCountries = [
          "All",
          ...new Set(data.map((item) => item.country)),
        ];
        setCountries(uniqueCountries);
      })
      .catch((error) => console.error("Data fetch error:", error));
  }, []);

  // filter by country
  const handleCountryFilter = (country) => {
    setActiveCountry(country);
    setCurrentPage(1); // reset page

    if (country === "All") {
      setFilteredPackages(packages);
    } else {
      setFilteredPackages(
        packages.filter((item) => item.country === country)
      );
    }
  };

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
        <p className="text-center text-gray-500">
          No packages found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentItems.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
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
