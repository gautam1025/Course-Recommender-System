import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  // Wake up Render free tier upon landing
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    axios.get(`${API_URL}/api/health-check`).catch(() => { });
  }, []);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="hero-section text-center relative z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200 animate-fade-in">
            AI-Powered Career <br /> &amp; Course Recommender
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Let AI guide your learning — personalized for your skills, goals, and future career growth.
          </p>

          <Link
            to="/upload"
            className="btn-primary text-lg px-8 py-4 shadow-xl shadow-indigo-500/20 animate-fade-in inline-flex"
            style={{ animationDelay: '0.2s' }}
          >
            Get Started
          </Link>

          {/* Scroll prompt */}
          <div className="mt-16 animate-bounce text-gray-500">
            ↓ Scroll to explore
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="section relative z-20 bg-[#0a0a0f]/40 backdrop-blur-xl border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our System?</h2>
            <p className="text-gray-400">Everything you need to accelerate your career growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover:bg-white/5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl mb-6 ring-1 ring-white/10">
                📄
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Resume</h3>
              <p className="text-gray-400 leading-relaxed">
                Upload your PDF/DOCX resume. Our AI instantly analyzes your profile to extract skills and experience.
              </p>
            </div>

            <div className="glass-card p-8 hover:bg-white/5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl mb-6 ring-1 ring-white/10">
                🧠
              </div>
              <h3 className="text-xl font-semibold mb-3">Skill Extraction</h3>
              <p className="text-gray-400 leading-relaxed">
                Identify skill gaps and match your interests with trending career paths in the industry.
              </p>
            </div>

            <div className="glass-card p-8 hover:bg-white/5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center text-3xl mb-6 ring-1 ring-white/10">
                🎯
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Courses</h3>
              <p className="text-gray-400 leading-relaxed">
                Get smart course recommendations with structured milestone-based learning paths.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
