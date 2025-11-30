// src/pages/HowItWorks.jsx
import React from "react";

export default function HowItWorks() {
  return (
    <div className="w-full">
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-black/50 backdrop-blur-md">
        <div className="w-full max-w-3xl bg-white/10 border border-white/25 
                        rounded-2xl shadow-2xl px-10 py-12">

          {/* Heading */}
          <h2 className="text-4xl font-bold mb-8 text-yellow-300 text-center drop-shadow-xl">
            How It Works ⚙️
          </h2>

          {/* Steps */}
          <div className="space-y-6 text-gray-200 text-lg leading-relaxed">
            <div className="flex gap-4 items-start">
              <span className="text-yellow-300 text-2xl">1️⃣</span>
              <p>Upload your resume (PDF format only).</p>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-yellow-300 text-2xl">2️⃣</span>
              <p>AI analyzes and extracts skills, tools, and experiences.</p>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-yellow-300 text-2xl">3️⃣</span>
              <p>Select your goal — Skill Upgrade or Domain Switch.</p>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-yellow-300 text-2xl">4️⃣</span>
              <p>
                Receive personalized course suggestions from YouTube, Udemy, Coursera,
                FreeCodeCamp, and more!
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-yellow-300 text-2xl">5️⃣</span>
              <p>
                Follow a structured learning roadmap📍 and boost your career 🚀
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-10">
            Simple · Smart · Tailored for You ✨
          </p>
        </div>
      </section>
    </div>
  );
}
