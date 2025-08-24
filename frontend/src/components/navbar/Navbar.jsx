
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
//yashika
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Brand Name (Left) */}
        <h1
          className="text-white font-serif text-2xl font-medium"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Drobe
        </h1>

        {/* Center Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-white text-gray-800 px-5 py-2 rounded-lg text-sm font-semibold shadow hover:bg-gray-100 transition">
            Search
          </button>
          <button className="text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition">
            Wardrobe
          </button>
        </div>

        {/* Right Side Icon */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            <FaUserCircle />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg py-2">
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Login
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
