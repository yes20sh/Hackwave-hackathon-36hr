

import React from "react";

const SearchBar = () => {
  return (
    <form className="w-full max-w-3xl px-4">
      <label htmlFor="search" className="sr-only">
        Search for items
      </label>
      <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-blue-500">
        <i className="fas fa-search text-gray-400 text-lg mr-3"></i>
        <input
          id="search"
          type="search"
          placeholder="Search for items"
          className="flex-grow text-gray-500 placeholder-gray-400 text-lg focus:outline-none"
        />
        <div
          aria-hidden="true"
          className="flex items-center space-x-1 text-gray-400 text-xs font-mono border border-gray-300 rounded px-2 py-1 ml-4 select-none"
        >
          <span className="font-semibold">⌘</span>
          <span>K</span>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
