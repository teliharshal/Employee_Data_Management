// src/Pages/Home.js
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Welcome</h1>
      <p className="text-lg text-gray-600 mb-8">Login as User or Admin</p>

      <div className="space-x-4">
        <Link
          to="/login/user"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login as User
        </Link>
        <Link
          to="/login/admin"
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
        >
          Login as Admin
        </Link>
      </div>
    </div>
  );
}
