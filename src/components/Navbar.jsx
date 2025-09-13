import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
<nav className="bg-purple-600 text-white px-6 py-3 flex justify-between items-center shadow-md">

      {/* Logo / Title */}
      <h1 className="text-xl font-bold">Career Recommender</h1>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? "bg-blue-800" : "hover:bg-blue-700"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? "bg-blue-800" : "hover:bg-blue-700"
            }`
          }
        >
          Upload Resume
        </NavLink>

        <NavLink
          to="/recommend"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? "bg-blue-800" : "hover:bg-blue-700"
            }`
          }
        >
          Recommendations
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? "bg-blue-800" : "hover:bg-blue-700"
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/how-it-works"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? "bg-blue-800" : "hover:bg-blue-700"
            }`
          }
        >
          How It Works
        </NavLink>
      </div>
    </nav>
  );
}
