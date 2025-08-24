import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        setSuccessMsg(res.data.message);
        setTimeout(() => {
          navigate("/login"); // redirect to login page after signup
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
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
        <h1 className="text-4xl font-extralight text-center mb-8 tracking-wide">
          Create <span style={{ color: "#669966" }}>Account</span>
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl font-light text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#669966] transition-all"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl font-light text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#669966] transition-all"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl font-light text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#669966] transition-all"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl font-light text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#669966] transition-all"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full shadow-md font-light tracking-wide text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "#669966" }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <p className="text-red-500 text-center mt-4 font-light">{error}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-center mt-4 font-light">
            {successMsg}
          </p>
        )}

        {/* Redirect */}
        <p className="text-center mt-6 text-gray-700 font-extralight">
          Already have an account?{" "}
          <span
            className="cursor-pointer hover:underline"
            style={{ color: "#669966" }}
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
