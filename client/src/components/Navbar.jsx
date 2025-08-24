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
    <nav
      className="sticky top-0 z-50 backdrop-blur-sm border-b border-white/30"
      style={{ backgroundColor: "#C8D7C8cc" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Brand */}
          <div className="flex-shrink-0 text-2xl font-extralight tracking-widest">
            <Link to="/" className="flex items-center">
              <span style={{ color: "#669966" }}>d</span>robe
            </Link>
          </div>

          {/* Center: Search Bar (only when showMainNavbar true) */}
          {showMainNavbar && (
            <div className="flex-1 flex justify-center items-center">
              <form
                onSubmit={handleSearch}
                className="flex w-full max-w-md shadow-sm"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your style..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full font-light focus:outline-none focus:ring-2 focus:ring-[#669966]"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-r-full text-white transition"
                  style={{ backgroundColor: "#669966" }}
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          )}

          {/* Right: Links + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/wardrobe"
              className="px-3 py-2 rounded-full text-sm font-light text-gray-800 hover:bg-[#66996622] hover:text-[#669966] transition"
            >
              Wardrobe
            </Link>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-[#669966] focus:outline-none"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Desktop User Icon */}
            <div className="hidden md:block relative">
              <FaUserCircle
                size={28}
                className="text-gray-700 hover:text-[#669966] cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 shadow-md px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/signup"
            className="block px-3 py-2 rounded-md text-base font-light text-gray-800 hover:bg-[#66996622] hover:text-[#669966] transition"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-light text-gray-800 hover:bg-[#66996622] hover:text-[#669966] transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/wardrobe"
            className="block px-3 py-2 rounded-md text-base font-light text-gray-800 hover:bg-[#66996622] hover:text-[#669966] transition"
            onClick={() => setMenuOpen(false)}
          >
            Wardrobe
          </Link>
        </div>
      )}

      {/* Desktop Dropdown (User Menu) */}
      {menuOpen && (
        <div className="hidden md:block absolute right-4 top-16 bg-white/95 border rounded-xl shadow-lg w-44">
          <Link
            to="/signup"
            className="block px-4 py-2 text-gray-800 font-light hover:bg-[#66996622] hover:text-[#669966] transition"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 text-gray-800 font-light hover:bg-[#66996622] hover:text-[#669966] transition"
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
