import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI-Powered Career & Course Recommender
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Upload your resume and discover the best free and paid courses to 
          upgrade your skills, switch domains, or accelerate your career growth.
        </p>
        <Link
          to="/upload"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform duration-200"
        >
          Get Started
        </Link>
      </main>

      {/* Feature Cards */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Helps You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-blue-50 transition transform hover:scale-105">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
            <p className="text-gray-600">
              Easily upload your resume in PDF format (max 5MB).
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-blue-50 transition transform hover:scale-105">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2">Skill Extraction</h3>
            <p className="text-gray-600">
              We identify your key skills and technologies using smart parsing.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-blue-50 transition transform hover:scale-105">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Personalized Courses</h3>
            <p className="text-gray-600">
              Get curated free & paid courses tailored to your career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
