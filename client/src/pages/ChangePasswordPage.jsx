import React, { useState } from "react";
import axios from "axios";

const ChangePasswordPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post("http://localhost:8000/api/users/change-password", {
        username_or_email: usernameOrEmail,
        new_password: newPassword,
      });

      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to change password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="text"
            placeholder="Enter username or email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Change Password
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
