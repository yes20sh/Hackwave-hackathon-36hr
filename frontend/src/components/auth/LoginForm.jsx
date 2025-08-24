import React from "react";

// ✅ Login Form
const LoginForm = ({ setAuthMode }) => (
  <div className="min-h-screen flex items-center justify-center">
    <form className="w-full max-w-sm space-y-4 p-6 rounded-2xl">
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black/80 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black/80 focus:outline-none"
      />
      <button className="w-full py-3 bg-blue-300  text-white rounded-xl font-medium hover:opacity-90 transition duration-300 hover:bg-blue-400">
        Login
      </button>

      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <button
          type="button"
          onClick={() => setAuthMode("forgot")}
          className="hover:underline"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={() => setAuthMode("signup")}
          className="hover:underline"
        >
          Create Account
        </button>
      </div>
    </form>
  </div>
);

export default LoginForm;
