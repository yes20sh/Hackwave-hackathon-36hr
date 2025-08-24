import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ setAuthMode }) => {
  const [username, setUsername] = useState(""); // match backend schema
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // use username to match FastAPI schema
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        // Handle Pydantic validation errors
        if (Array.isArray(data)) {
          setError(data.map((err) => err.msg).join(", "));
        } else {
          setError(data.detail || "Login failed");
        }
        return;
      }

      console.log("User logged in:", data.user);
      alert("Login successful! Welcome " + data.user.username);

      // Navigate to main page
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex bg-white">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 text-center">
          Sign in to <span className="italic font-light">Drobe</span>
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Find the best deals in one click.
        </p>

        {/* Login Form */}
        <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer links */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create an account for free
          </Link>
        </p>
      </div>

      {/* Right Section (Illustration) */}
      <div className="w-1/2 flex justify-center items-center py-6 px-8">
        <img
          src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?cs=srgb&dl=pexels-kowalievska-1055691.jpg&fm=jpg"
          alt="Illustration"
          className="rounded-2xl shadow-lg max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default LoginForm;
