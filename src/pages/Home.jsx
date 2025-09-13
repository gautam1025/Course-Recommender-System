import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI-Powered Career & Course Recommender
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          Upload your resume and discover the best free and paid courses to 
          upgrade your skills, switch domains, or accelerate your career growth.
        </p>
        <Link
          to="/upload"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
        >
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
