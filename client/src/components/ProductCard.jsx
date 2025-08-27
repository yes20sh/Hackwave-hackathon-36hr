import React, { useState, useEffect } from "react";
import { PiCoatHangerFill } from "react-icons/pi";

// Render stars for rating
const renderStars = (rating) => {
  const stars = [];
  const maxStars = 5;
  const roundedRating = Math.round(rating);
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        className={i <= roundedRating ? "text-emerald-500" : "text-gray-300"}
      >
        ★
      </span>
    );
  }
  return stars;
};

// Highlight search keywords
const highlightKeyword = (text, keyword) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200">{part}</span>
    ) : (
      part
    )
  );
};

const ProductCard = ({ item, keyword }) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await fetch("http://localhost:8000/api/products/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add product to a selected category
  const handleCategorySelect = async (categoryName) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/products/category/${encodeURIComponent(categoryName)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: categoryName,
            position: 0,
            title: item.title || "Untitled",
            product_link: item.product_link || "",
            product_id: item.product_id || "",
            serpapi_product_api: item.serpapi_product_api || "",
            immersive_product_page_token: item.immersive_product_page_token || "",
            serpapi_immersive_product_api: item.serpapi_immersive_product_api || "",
            source: item.source || "",
            source_icon: item.source_icon || "",
            multiple_sources: item.multiple_sources || false,
            price: item.price || "",
            extracted_price: item.extracted_price || 0,
            old_price: item.old_price || "",
            extracted_old_price: item.extracted_old_price || 0,
            rating: item.rating || 0,
            reviews: item.reviews || 0,
            thumbnail: item.thumbnail || "",
            thumbnails: item.thumbnails || [],
            serpapi_thumbnails: item.serpapi_thumbnails || [],
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to add product");

      const saved = await res.json();
      console.log("✅ Product added to wardrobe:", saved);
      alert(`Added "${item.title}" to ${categoryName}`);
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product");
    } finally {
      setShowCategoryMenu(false);
    }
  };

  return (
    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      {/* Add to Wardrobe Button */}
      <button
        onClick={() => setShowCategoryMenu(!showCategoryMenu)}
        className="absolute top-2 right-2 bg-white/90 hover:bg-emerald-50 p-2 rounded-full shadow-md text-emerald-600 hover:text-emerald-700 transition-colors"
        title="Add to Wardrobe"
      >
        <PiCoatHangerFill size={20} />
      </button>

      {/* Category Selection Popup */}
      {showCategoryMenu && (
        <div className="absolute top-10 right-2 bg-white shadow-lg rounded-lg p-3 w-56 z-10 flex flex-col gap-2 border border-gray-100">
          {loadingCategories ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <button
                key={cat.id || cat.name}
                className="text-left px-2 py-1 rounded hover:bg-emerald-50 text-gray-700"
                onClick={() => handleCategorySelect(cat.name)}
              >
                {cat.name}
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No categories found</p>
          )}
        </div>
      )}

      {/* Thumbnail */}
      {item.thumbnail && (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-48 object-contain bg-emerald-50"
        />
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800">
          {highlightKeyword(item.title, keyword)}
        </h2>

        {item.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-3">
            {highlightKeyword(item.description, keyword)}
          </p>
        )}

        <p className="text-sm text-gray-500 mb-2">Listed at: {item.source}</p>

        <div className="mb-3">
          <p className="text-emerald-600 font-bold text-lg">{item.price}</p>
          {item.old_price && (
            <p className="text-gray-400 text-sm line-through">{item.old_price}</p>
          )}
        </div>

        {item.rating ? (
          <div className="flex items-center mb-3">
            {renderStars(item.rating)}
            <span className="ml-2 text-sm text-gray-600">
              {item.rating.toFixed(1)}
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-3">No rating available</p>
        )}

        {/* Button sticks to bottom */}
        <a
          href={item.product_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block w-full text-center bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 py-2 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-colors font-medium shadow-md"
        >
          View Product
        </a>
      </div>
    </div>
  );
};

export default ProductCard;


