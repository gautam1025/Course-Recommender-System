 
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">

      {/* FULL-SCREEN HERO OVER BACKGROUND IMAGE */}
      <section
        className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 
                   bg-gradient-to-br from-[#0D1B2A]/80 via-[#3A0CA3]/70 to-[#4361EE]/60 backdrop-grey-sm"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
            AI-Powered Career &amp; Course Recommender
          </h1>

          <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto text-gray-200 drop-shadow-md">
            Let AI guide your learning — personalized for your skills, goals and future career growth.
          </p>

          <Link
            to="/upload"
            className="inline-block mt-10 px-8 py-3 text-lg font-bold rounded-full
                     bg-blue-400 hover:bg-blue-300 text-black shadow-xl
                     hover:shadow-blue-400/50 hover:scale-105 hover:-translate-y-1
                     transition-all duration-200"
          >
            Get Started
          </Link>

          {/* Scroll prompt */}
          <p className="mt-12 text-white/80 animate-bounce text-sm">
            ↓ Scroll to explore
          </p>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-20 px-8 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 drop-shadow-xl">
            Why Choose Our System?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20 
                            shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
              <p className="text-gray-200">
                Upload resume (PDF/DOCX) — AI extracts skills & experience instantly.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20 
                            shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">Skill Extraction</h3>
              <p className="text-gray-200">
                Detects skill gaps + matches your interests with trending career paths.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20
                            shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Personalized Courses</h3>
              <p className="text-gray-200">
                Smartly recommended courses with structured milestone-based learning.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
