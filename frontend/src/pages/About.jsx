import React from "react";

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="glass-card w-full max-w-3xl px-8 py-10 text-center relative z-20">
        <h2 className="text-4xl font-bold mb-6 text-yellow-300 drop-shadow-lg">
          About This Project 🎯
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Career Recommender is a smart system that helps students and professionals
          find the best courses tailored to their career goals. Using AI-based resume
          parsing and skill extraction, it recommends high-impact learning paths and
          helps users move closer to their dream role.
        </p>

        <div className="space-y-3 text-gray-400 text-sm border-t border-white/5 pt-6">
          <p className="flex items-center justify-center gap-2">
            <span className="text-green-400">✔</span> Personalized learning
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="text-green-400">✔</span> Resume-driven recommendations
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="text-green-400">✔</span> Free & paid courses from top platforms
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="text-green-400">✔</span> Skill enhancement & domain switch support
          </p>
        </div>

        <p className="text-xs mt-8 text-gray-500">
          This project is developed as a Final Year B.Tech initiative
        </p>
      </div>
    </div>
  );
}
