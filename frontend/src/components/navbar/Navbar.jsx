import React from "react";
import { Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import Container from "../container/Container";

const Navbar = () => {
  return (
    <Container>
      <nav className="flex items-center justify-between p-4 text-white">
        {/* Left - Logo */}
        <div className="text-2xl font-serif tracking-wide font-bold">Drobe</div>
        <div className="hidden md:flex items-center w-1/2 bg-zinc-800 text-white text-2xl rounded-full px-5 py-2 shadow-sm">
          <Search className="h-5 w-5 text-white mr-2" />
          <input
            type="text"
            placeholder="Search for items"
            className="w-full bg-transparent outline-none text-sm"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors text-xs font-medium"
          >
            Search
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <NavLink
            to="/wardrobe"
            className="text-sm bg-zinc-900 shadow-sm rounded-2xl py-3 px-5 font-medium hover:text-zinc-100 hover:bg-zinc-700"
          >
            Wardrobe
          </NavLink>
          <User className="h-10 w-10 cursor-pointer bg-zinc-900 shadow-sm rounded-[50%] p-2 " />
        </div>
      </nav>

      {/* Search bar visible only on mobile (below navbar) */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-white text-gray-700 rounded-full px-4 py-2 shadow-sm">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for items"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
