// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="w-full">
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-black/50 backdrop-blur-md">
        <div className="w-full max-w-3xl bg-white/10 border border-white/25 
                        rounded-2xl shadow-2xl px-8 py-10 text-center">
          
          <h2 className="text-4xl font-bold mb-6 text-yellow-300 drop-shadow-lg">
            About This Project 🎯
          </h2>

          <p className="text-gray-200 text-lg leading-relaxed">
            Career Recommender is a smart system that helps students and professionals
            find the best courses tailored to their career goals. Using AI-based resume
            parsing and skill extraction, it recommends high-impact learning paths and 
            helps users move closer to their dream role.
          </p>

          <div className="mt-8 space-y-3 text-gray-300 text-sm">
            <p>✔ Personalized learning</p>
            <p>✔ Resume-driven recommendations</p>
            <p>✔ Free & paid courses from top platforms</p>
            <p>✔ Skill enhancement & domain switch support</p>
          </div>

          <p className="text-xs mt-8 text-gray-400">
            This project is developed as a Final Year B.Tech initiative 
          </p>
        </div>
      </section>
    </div>
  );
}
