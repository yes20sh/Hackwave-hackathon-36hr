// AppEngine.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Search from "../pages/search.page";
import Main from "../pages/Main.page"
import SearchResult from "../pages/SearchResult.page"
import Search from "../pages/Search.page";
import Login from "../pages/Login.page";
import SignUp from "../pages/SignUp.Page";

const AppEngine = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/result" element={<SearchResult/>} />
      </Routes>
    </Router>
  );
};

export default AppEngine;
