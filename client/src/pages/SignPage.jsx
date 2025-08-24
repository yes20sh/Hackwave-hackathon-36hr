import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post("http://localhost:8000/api/users/login", form);
      setMessage(res.data.message);

      // Optional: save token / user
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      // navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Login failed");
      } else {
        setError("Network error");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#C8D7C8" }}
    >
      <div
        className="rounded-3xl p-10 w-full max-w-md shadow-lg backdrop-blur-sm border border-white/30"
        style={{ backgroundColor: "#ffffffcc" }}
      >
        {/* Heading */}
        <h2 className="text-4xl font-extralight text-center mb-8 tracking-wide text-black">
          Welcome <span style={{ color: "#669966" }}>Back</span>
        </h2>

        {/* Success / Error Messages */}
        {message && (
          <p className="text-green-600 text-center mb-4 font-light">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-center mb-4 font-light">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl font-light text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#669966] transition-all"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl font-light text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#669966] transition-all"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full shadow-md font-light tracking-wide text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "#669966" }}
          >
            Sign In
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center mt-6 text-gray-700 font-extralight">
          Don’t have an account?{" "}
          <span
            className="cursor-pointer hover:underline"
            style={{ color: "#669966" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
