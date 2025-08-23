import React from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 px-4">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-snug">
        Hi, <span className="capitalize">tushar</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-200 text-base md:text-lg">
        Search an item, or continue shopping your recent finds.
      </p>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-lg md:max-w-2xl bg-white text-gray-700 rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-lg">
        <Search className="h-5 w-5 md:h-6 md:w-6 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Search for your favorite brand"
          className="w-full bg-transparent outline-none text-gray-700 text-sm md:text-base"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors text-sm md:text-base font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
