import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-transparent text-white px-6 py-3 shadow-none">

      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-spin-slow"></div>
          <span className="text-xl font-bold">Career Recommender</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white/20 font-bold text-white shadow-sm"
                  : "hover:bg-white/10 text-gray-100"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white/20 font-bold text-white shadow-sm"
                  : "hover:bg-white/10 text-gray-100"
              }`
            }
          >
            Upload Resume
          </NavLink>
          <NavLink
            to="/recommend"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white/20 font-bold text-white shadow-sm"
                  : "hover:bg-white/10 text-gray-100"
              }`
            }
          >
            Recommendations
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white/20 font-bold text-white shadow-sm"
                  : "hover:bg-white/10 text-gray-100"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white/20 font-bold text-white shadow-sm"
                  : "hover:bg-white/10 text-gray-100"
              }`
            }
          >
            How It Works
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
