import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { FiArrowUpRight, FiSearch, FiFilter, FiTrendingUp } from "react-icons/fi";
import { fetchGeminiResponse } from "../utils/geminiServices";

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

  const handleSearch = async (searchTerm) => {
    const searchQuery = searchTerm || query;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:8000/api/search/", {
        query: searchQuery,
        ...(gender && { gender }),
      });

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
    <div className="min-h-screen font-sans text-slate-800 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar
        showMainNavbar={showMainNavbar}
        searchQuery={query}
        setSearchQuery={setQuery}
        onSearchSubmit={handleSearch}
      />

      {!showMainNavbar && (
        <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-40 blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-100 rounded-full opacity-40 blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-200 rounded-full opacity-30 blur-lg"></div>

          {/* Hero Section */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <FiTrendingUp className="mr-2 h-4 w-4" />
                Discover Fashion Trends
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-slate-800 leading-tight tracking-tight">
              Find Your{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl transform rotate-1"></span>
                <span className="relative px-6 py-2 text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg">
                  Style
                </span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover the latest fashion trends and find products that match your unique style
            </p>

            {/* Enhanced Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="relative w-full max-w-2xl mx-auto mb-12"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="flex items-center justify-center pl-6">
                    <FiSearch className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for fashion items, brands, styles..."
                    className="flex-1 px-4 py-5 text-lg text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="m-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium transition-all duration-300 hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:scale-105 flex items-center gap-2"
                  >
                    Search
                    <FiArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Enhanced Gender Selection */}
            <div className="mb-8">
              <p className="text-slate-600 mb-6 font-medium">Choose your category</p>
              <div className="flex flex-wrap justify-center gap-4">
                {["male", "female", "unisex", "child"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`group relative px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      gender === g
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-200"
                        : "bg-white/80 text-slate-700 shadow-lg border border-slate-200 hover:bg-white hover:shadow-xl"
                    }`}
                    onClick={() => handleGenderSelect(g)}
                  >
                    <span className="relative z-10">
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </span>
                    {gender !== g && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Trending Words */}
            {gender && trendingWords.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <FiTrendingUp className="h-5 w-5 text-emerald-600" />
                  <p className="text-slate-700 font-medium text-lg">
                    Trending for {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </p>
                </div>
                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600">{error}</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 justify-center">
                    {trendingWords.map((item, index) => (
                      <button
                        key={item}
                        onClick={() => {
                          setQuery(item);
                          handleSearch(item);
                        }}
                        className="group px-6 py-3 bg-white rounded-xl border border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                        type="button"
                      >
                        <span className="font-medium">{item}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Results Section */}
      {showMainNavbar && (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-500 border-t-transparent"></div>
                <div className="absolute inset-0 rounded-full border-2 border-emerald-200"></div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-slate-800 mb-1">
                  Search Results
                </h2>
                <p className="text-slate-600">
                  {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
          )}

          {/* Enhanced Trending Carousel */}
          {trendingWords.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <FiTrendingUp className="h-6 w-6 text-emerald-600" />
                <h2 className="text-3xl font-light text-slate-800">
                  Trending Now
                </h2>
              </div>
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {trendingWords.map((item, index) => (
                    <div
                      key={index}
                      className="group min-w-[200px] shrink-0 bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 text-center transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 border border-emerald-100 cursor-pointer"
                      onClick={() => {
                        setQuery(item);
                        handleSearch(item);
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                      <p className="relative text-lg font-medium text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {item}
                      </p>
                      <div className="mt-3 w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Filters */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <FiFilter className="h-5 w-5 text-slate-600" />
              <span className="text-slate-700 font-medium">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { key: "lowToHigh", label: "Price: Low to High" },
                { key: "highToLow", label: "Price: High to Low" },
                { key: "ratingHighToLow", label: "Rating: High to Low" }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilter(filter.key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredResults.length === 0 && !loading && !error && (
              <div className="col-span-full text-center py-16">
                <div className="bg-slate-50 rounded-2xl p-12 max-w-md mx-auto">
                  <FiSearch className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-slate-600 mb-2">
                    No results found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              </div>
            )}
            {filteredResults.map((item) => (
              <div key={item.product_id || item.position} className="group">
                <div className="transform transition-all duration-300 group-hover:scale-105">
                  <ProductCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;