import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ setAuthMode }) => {
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
        <form className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Email or username"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:outline-none"
          />
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:outline-none"
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
          <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
            Login
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
