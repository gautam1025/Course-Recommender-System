import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Career Recommender</h1>
      <div className="flex gap-6">
        <Link
          to="/"
          className="px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          Home
        </Link>
        <Link
          to="/upload"
          className="px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Resume
        </Link>
        <Link
          to="/recommend"
          className="px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          Recommendations
        </Link>
        <Link 
          to="/about" className="hover:text-blue-600">
            About
        </Link>

      </div>
    </nav>
  );
}

