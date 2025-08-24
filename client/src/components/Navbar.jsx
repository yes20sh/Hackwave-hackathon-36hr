import React, { useState } from "react";
import { FaUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ showMainNavbar, searchQuery, setSearchQuery, onSearchSubmit }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit && searchQuery.trim() !== "") {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Brand */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            <Link to="/">Drobe</Link>
          </div>

          {/* Center: only visible on main navbar */}
          {showMainNavbar && (
            <div className="flex-1 flex justify-center items-center md:justify-center md:space-x-4">
              <form onSubmit={handleSearch} className="flex w-full max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 rounded-r-md text-white hover:bg-blue-600 transition"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          )}

          {/* Right: Wardrobe + User Icon */}
          <div className="flex items-center space-x-4">
            <Link
              to="/wardrobe"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
            >
              Wardrobe
            </Link>

            {/* Hamburger for mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* User Icon */}
            <div className="hidden md:block relative">
              <FaUserCircle
                size={28}
                className="text-gray-700 hover:text-blue-600 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/signup"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/wardrobe"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Wardrobe
          </Link>
        </div>
      )}

      {/* Desktop Dropdown */}
      {menuOpen && (
        <div className="hidden md:block absolute right-4 top-16 bg-white border rounded-md shadow-lg w-40">
          <Link
            to="/signup"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
