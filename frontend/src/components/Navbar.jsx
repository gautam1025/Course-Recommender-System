import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Desktop link classes
  const getLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
      ? "bg-white/10 text-white shadow-lg shadow-purple-500/20 ring-1 ring-white/20"
      : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  // Mobile link classes
  const getMobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${isActive
      ? "bg-white/10 text-white border border-white/10"
      : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-t-0 border-x-0 rounded-none border-b border-white/5 bg-[#0a0a0f]/80">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-10 h-10 bg-[#0a0a0f] rounded-xl border border-white/10 flex items-center justify-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-purple-400 to-blue-400">
                  C
                </span>
              </div>
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-white group-hover:to-white transition-all duration-300">
              Career Recommender
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={getLinkClass} end>Home</NavLink>
            <NavLink to="/upload" className={getLinkClass}>Upload Resume</NavLink>
            <NavLink to="/recommend" className={getLinkClass}>Recommendations</NavLink>
            <NavLink to="/roadmap" className={getLinkClass}>Roadmap</NavLink>
            <NavLink to="/how-it-works" className={getLinkClass}>How It Works</NavLink>
            <NavLink to="/about" className={getLinkClass}>About</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100 border-b border-white/5" : "max-h-0 opacity-0"}`}>
        <div className="px-4 py-4 space-y-1 bg-[#0a0a0f]/95 backdrop-blur-xl">
          <NavLink to="/" className={getMobileLinkClass} end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/upload" className={getMobileLinkClass} onClick={() => setOpen(false)}>Upload Resume</NavLink>
          <NavLink to="/recommend" className={getMobileLinkClass} onClick={() => setOpen(false)}>Recommendations</NavLink>
          <NavLink to="/roadmap" className={getMobileLinkClass} onClick={() => setOpen(false)}>Roadmap</NavLink>
          <NavLink to="/how-it-works" className={getMobileLinkClass} onClick={() => setOpen(false)}>How It Works</NavLink>
          <NavLink to="/about" className={getMobileLinkClass} onClick={() => setOpen(false)}>About</NavLink>
        </div>
      </div>
    </nav>
  );
}
