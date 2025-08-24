import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from "../pages/SignupPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import WardrobePage from "../pages/WardrobePage.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Signin />} /> */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/wardrobe" element={<WardrobePage />} />
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-red-500 text-xl">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
