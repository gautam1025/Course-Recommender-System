import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const baseLinkClasses =
    "px-3 py-2 rounded-md text-sm md:text-base transition";
  const getLinkClass = ({ isActive }) =>
    `${baseLinkClasses} ${
      isActive
        ? "bg-white/25 font-semibold text-white shadow-sm"
        : "hover:bg-white/10 text-gray-100"
    }`;

  return (
    <nav className="w-full bg-black/60 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-spin-slow shadow-lg" />
          <span className="text-lg md:text-xl font-bold tracking-wide">
            Career Recommender
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3 font-medium">
          <NavLink to="/" className={getLinkClass} end>
            Home
          </NavLink>

          <NavLink to="/upload" className={getLinkClass}>
            Upload Resume
          </NavLink>

          <NavLink to="/recommend" className={getLinkClass}>
            Recommendations
          </NavLink>

          <NavLink to="/roadmap" className={getLinkClass}>
            Roadmap
          </NavLink>

          <NavLink to="/how-it-works" className={getLinkClass}>
            How It Works
          </NavLink>

          <NavLink to="/about" className={getLinkClass}>
            About
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-1 bg-black/80 backdrop-blur-md border-t border-white/10">
          <NavLink
            to="/"
            className={getLinkClass}
            end
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/upload"
            className={getLinkClass}
            onClick={() => setOpen(false)}
          >
            Upload Resume
          </NavLink>

          <NavLink
            to="/recommend"
            className={getLinkClass}
            onClick={() => setOpen(false)}
          >
            Recommendations
          </NavLink>

          <NavLink
            to="/roadmap"
            className={getLinkClass}
            onClick={() => setOpen(false)}
          >
            Roadmap
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={getLinkClass}
            onClick={() => setOpen(false)}
          >
            How It Works
          </NavLink>

          <NavLink
            to="/about"
            className={getLinkClass}
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>
        </div>
      )}
    </nav>
  );
}
