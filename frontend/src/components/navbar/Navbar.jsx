// import React from 'react';
// import {NavLink} from 'react-router-dom';
// import Container from '../container/Container'
// const Navbar = () => {
// return (
//     <Container>
//         <nav className="flex flex-row justify-between items-center p-4 bg-gray-800 text-white">
//             <div className="text-lg font-bold">Drobe</div>
//             <div className="space-x-4">
//                 <NavLink to='' className="hover:underline">Home</NavLink>
//                 <NavLink to='/about' className="hover:underline">About</NavLink>
//                 <NavLink to='/contact' className="hover:underline">Contact</NavLink>
//             </div>
//             <div className="text-2xl cursor-pointer">
//                 {/* Account/User Icon */}
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
//                     <path stroke="currentColor" strokeWidth="2" d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
//                 </svg>
//             </div>
//         </nav>
//     </Container>
// )
// }

// export default Navbar

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

        {/* Center - Search Bar (hidden on small screens) */}
        <div className="hidden md:flex items-center w-1/2 bg-white text-gray-700 rounded-full px-4 py-2 shadow-sm">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for items"
            className="w-full bg-transparent outline-none text-sm"
          />
          <button
            type="submit"
            className="ml-2 px-3 py-1 bg-gray-300 text-white rounded-full hover:bg-gray-400 transition-colors text-xs font-medium"
          >
            Search
          </button>
        </div>

        {/* Right - Wardrobe + Account */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/wardrobe"
            className="text-sm bg-gray-500  rounded-2xl p-2 font-medium hover: text-gray-100 hover:bg-gray-600"
          >
            Wardrobe
          </NavLink>

          {/* Simple Account Icon */}
          <User className="h-10 w-10 cursor-pointer bg-gray-500  rounded-[50%] p-1 " />
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
