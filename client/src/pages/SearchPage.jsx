import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { fetchGeminiResponse } from "../utils/geminiServices"; // 👈 import Gemini

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMainNavbar, setShowMainNavbar] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

  const [trendingWords, setTrendingWords] = useState([]);

  const handleGenderSelect = async (selectedGender) => {
    setGender(selectedGender);
    setTrendingWords([]);
    setLoading(true);
    setError(null);

    try {
      const prompt = `Give me a JSON array of the top 5 trending fashion items for ${selectedGender}. Example: ["Oversized Hoodies", "Smart Sneakers", "Straight-leg Jeans"]`;

      const response = await fetchGeminiResponse(prompt);

      let trends = [];

      if (Array.isArray(response)) {
        trends = response;
      } else if (Array.isArray(response?.text)) {
        trends = response.text;
      } else if (typeof response?.text === "string") {
        trends = response.text.split(",").map((t) => t.trim());
      }

      setTrendingWords(trends);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch trends from Gemini.");
    } finally {
      setLoading(false);
    }
  };
=======
>>>>>>> 83ea4b7 (wardRobe-done)
=======
>>>>>>> d4aff7f (update the code)

  const handleSearch = async (searchTerm) => {
    const searchQuery = searchTerm || query;
    setLoading(true);
    setError(null);

    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const body = { query: searchQuery };
      if (gender) body.gender = gender;

      const res = await axios.post("http://localhost:8000/api/search/", body);
=======
      const res = await axios.post("http://localhost:8000/api/search/", {
        query: searchQuery,
      });
>>>>>>> 83ea4b7 (wardRobe-done)
=======
      const res = await axios.post("http://localhost:8000/api/search/", {
        query: searchQuery,
      });
>>>>>>> d4aff7f (update the code)
      const items = res.data.shopping_results || [];
      setResults(items);
      setFilteredResults(items);
      setShowMainNavbar(true);
      setActiveFilter("");
    } catch (err) {
      setError("Failed to fetch results");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        tempResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
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
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Looking for your next favorite outfit?
=======
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
            Search Products
>>>>>>> 83ea4b7 (wardRobe-done)
=======
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
            Search Products
>>>>>>> d4aff7f (update the code)
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
<<<<<<< HEAD
<<<<<<< HEAD
            className="flex flex-col md:flex-row w-full max-w-xl gap-2 items-center"
          >
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => handleSearch(query)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
=======
=======
>>>>>>> d4aff7f (update the code)
            className="flex flex-col sm:flex-row w-full max-w-md sm:max-w-xl gap-3 sm:gap-0"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-blue-600 transition-colors font-semibold"
<<<<<<< HEAD
>>>>>>> 83ea4b7 (wardRobe-done)
=======
>>>>>>> d4aff7f (update the code)
            >
              <FiArrowUpRight />
            </button>
          </form>

          {/* Gender selection */}
          <div className="flex justify-center gap-4 mt-6">
            {["male", "female", "unisex", "child"].map((g) => (
              <button
                key={g}
                type="button"
                className={`px-6 py-2 rounded-full transition-colors font-semibold ${
                  gender === g
                    ? g === "female"
                      ? "bg-pink-600 text-white"
                      : "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handleGenderSelect(g)}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>

          {/* Trending topic buttons */}
          {gender && trendingWords.length > 0 && (
            <div className="mt-6 w-full max-w-md flex flex-wrap gap-3 justify-center">
              <p className="text-gray-600 mb-2 w-full text-center font-semibold">
                Trending for {gender.charAt(0).toUpperCase() + gender.slice(1)}:
              </p>
              {loading ? (
                <p className="text-gray-500">Loading trends...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                trendingWords.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setQuery(item);
                      handleSearch(item);
                    }}
                    className="cursor-pointer px-4 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-blue-100 transition"
                    type="button"
                  >
                    {item}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {showMainNavbar && (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
<<<<<<< HEAD
<<<<<<< HEAD
            <p className="text-gray-700 mb-4">
=======
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
>>>>>>> 83ea4b7 (wardRobe-done)
=======
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
>>>>>>> d4aff7f (update the code)
              {filteredResults.length} result
              {filteredResults.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* Carousel for trending */}
          {trendingWords.length > 0 && (
            <div className="mt-10 w-full overflow-hidden">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Trending Now
              </h2>
              <div className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-hide">
                {trendingWords.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-[180px] shrink-0 bg-white rounded-xl border border-gray-300 shadow-sm px-4 py-6 text-center hover:shadow-md transition"
                  >
                    <p className="text-lg font-medium text-gray-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4 mt-8">
            <button
              onClick={() => handleFilter("lowToHigh")}
              className={`px-3 py-1 rounded-md text-xs sm:text-sm font-medium ${
                activeFilter === "lowToHigh"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleFilter("highToLow")}
              className={`px-3 py-1 rounded-md text-xs sm:text-sm font-medium ${
                activeFilter === "highToLow"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Price: High to Low
            </button>
            <button
              onClick={() => handleFilter("ratingHighToLow")}
              className={`px-3 py-1 rounded-md text-xs sm:text-sm font-medium ${
                activeFilter === "ratingHighToLow"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Rating: High to Low
            </button>
          </div>

<<<<<<< HEAD
<<<<<<< HEAD
          {/* Product Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
=======
          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
>>>>>>> 83ea4b7 (wardRobe-done)
=======
          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
>>>>>>> d4aff7f (update the code)
            {filteredResults.length === 0 && !loading && !error && (
              <p className="text-center col-span-full text-gray-700">
                No results found
              </p>
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
