import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          AI-Powered Career & Course Recommender
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Upload your resume and discover the best free and paid courses to 
          upgrade your skills, switch domains, or accelerate your career growth.
        </p>
        <Link
          to="/upload"
          className="px-6 py-3 bg-green-500/80 backdrop-blur-md text-white font-semibold rounded-full shadow-md hover:bg-green-600/80 transition"
        >
          Get Started
        </Link>
      </main>

      {/* Feature Cards */}
      <section className="py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 text-white">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-bold mb-2">Upload Resume</h3>
            <p>Begin by uploading your resume as a PDF format.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 text-white">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">Skill Extraction</h3>
            <p>We'll identify your core skills and tailor suggestions.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 text-white">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Personalized Courses</h3>
            <p>Get curated free & paid courses matched to your goals.</p>
          </div>
        </div>
      </section>

      {/* Footer - Transparent */}
      <footer className="text-center py-4 text-sm text-white/80">
        © {new Date().getFullYear()} Career Recommender. All rights reserved.
      </footer>
    </div>
  );
}
