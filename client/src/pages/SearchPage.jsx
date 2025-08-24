

import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMainNavbar, setShowMainNavbar] = useState(false);
  const [activeFilter, setActiveFilter] = useState(""); // current filter

  const handleSearch = async (searchTerm) => {
    const searchQuery = searchTerm || query;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:8000/api/search/", { query: searchQuery });
      const items = res.data.shopping_results || [];
      setResults(items);
      setFilteredResults(items);
      setShowMainNavbar(true);
      setActiveFilter(""); // reset filter
    } catch (err) {
      setError("Failed to fetch results");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter / sort functionality
  const handleFilter = (filterType) => {
    let tempResults = [...results];
    setActiveFilter(filterType);

    switch (filterType) {
      case "lowToHigh":
        tempResults.sort(
          (a, b) =>
            parseFloat(a.price.replace(/[^0-9.-]+/g, "")) -
            parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
        );
        break;
      case "highToLow":
        tempResults.sort(
          (a, b) =>
            parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
            parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
        );
        break;
      case "ratingHighToLow":
        tempResults.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0) // assuming API returns 'rating' field
        );
        break;
      default:
        tempResults = [...results];
    }

    setFilteredResults(tempResults);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        showMainNavbar={showMainNavbar}
        searchQuery={query}
        setSearchQuery={setQuery}
        onSearchSubmit={handleSearch}
      />

      {!showMainNavbar && (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Search Products
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex w-full max-w-md"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {showMainNavbar && (
        <div className="max-w-5xl mx-auto p-6">
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Show number of results */}
          {!loading && !error && (
            <p className="text-gray-700 mb-4">
              {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => handleFilter("lowToHigh")}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                activeFilter === "lowToHigh"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleFilter("highToLow")}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                activeFilter === "highToLow"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Price: High to Low
            </button>
            <button
              onClick={() => handleFilter("ratingHighToLow")}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                activeFilter === "ratingHighToLow"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Rating: High to Low
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
  {filteredResults.length === 0 && !loading && !error && (
    <p className="text-center col-span-full text-gray-700">No results found</p>
  )}
  {filteredResults.map((item) => (
    <ProductCard key={item.product_id || item.position} item={item} />
  ))}
</div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
