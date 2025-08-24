import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:8000/api/search/', { query });
      setResults(res.data.shopping_results || []);
    } catch (err) {
      setError('Failed to fetch results');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Render stars for rating (rounded)
  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span key={i} className={i <= roundedRating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Search Products</h1>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Search
          </button>
        </form>

        {/* Loading & Error */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length === 0 && !loading && !error && (
            <p className="text-center col-span-full text-gray-700">No results found</p>
          )}
          {results.map((item) => (
            <div
              key={item.product_id || item.position}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Thumbnail */}
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h2>
                <p className="text-sm text-gray-500 mb-2">Source: {item.source}</p>

                {/* Price Section */}
                <div className="mb-3">
                  <p className="text-blue-600 font-bold text-lg">{item.price}</p>
                  {item.old_price && (
                    <p className="text-gray-500 text-sm line-through">{item.old_price}</p>
                  )}
                </div>

                {/* Rating */}
                {item.rating ? (
                  <div className="flex items-center mb-3">
                    {renderStars(item.rating)}
                    <span className="ml-2 text-sm text-gray-600">{item.rating.toFixed(1)}</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mb-3">No rating available</p>
                )}

                {/* Link */}
                <a
                  href={item.product_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
