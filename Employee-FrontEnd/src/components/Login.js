// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  if (role === "admin" && email === "admin@example.com" && password === "admin123") {
    localStorage.setItem("role", "admin");
    navigate("/dashboard"); // same route
  } else if (role === "user" && email === "user@example.com" && password === "user123") {
    localStorage.setItem("role", "user");
    navigate("/dashboard"); // same route
  } else {
    alert("Invalid credentials or role");
  }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
