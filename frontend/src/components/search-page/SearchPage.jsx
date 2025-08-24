

import React from "react";
import SearchBar from "../searchbox/SearchBox";
import Navbar from "../navbar/Navbar";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background Image */}
      <img
        src="https://storage.googleapis.com/a1aa/image/a89ef11e-426c-4134-7575-b5e5abad08a7.jpg"
        alt="Blurred gradient background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

  

      {/* Content Section */}
<div className="flex flex-col items-center justify-center text-center px-6 flex-1">
  {/* Heading */}
  <motion.h1
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-white font-serif text-5xl md:text-6xl font-light mb-4"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    Hi, Yashika
  </motion.h1>

  {/* Subtext */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-white text-lg md:text-xl mb-8 max-w-2xl"
  >
    Search an item, or continue shopping your recent finds.
  </motion.p>

  {/* Search Bar Component */}
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.7 }}
    className="w-full max-w-lg"
  >
    <SearchBar />
  </motion.div>
</div>


      {/* Discover Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 
         px-6 py-3 
       text-base font-semibold 
        flex items-center space-x-2"
      >
        <span>Discover</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default SearchPage;
