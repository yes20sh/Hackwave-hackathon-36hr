import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "../pages/SignupPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import WardrobePage from "../pages/WardrobePage.jsx";
import HomePage from "../pages/HomePage.jsx";
import Signin from "../pages/SignPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx";
import ChangePasswordPage from "../pages/ChangePasswordPage.jsx";
import ImagePage from "../pages/ImagePage.jsx";
import TryOnPage from "../pages/TryOnPage.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/wardrobe" element={<WardrobePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/Ai-Image" element={<ImagePage />} />
                <Route path="/try-on" element={<TryOnPage />} />

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
