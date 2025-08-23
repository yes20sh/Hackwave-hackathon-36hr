// AppEngine.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "../pages/search.page";
import Main from "../pages/Main.page"

const AppEngine = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={Main} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default AppEngine;
