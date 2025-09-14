import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-md max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <ul className="list-decimal list-inside text-left text-white/90 leading-relaxed space-y-2">
            <li>Upload your resume (PDF format only).</li>
            <li>Our system extracts skills and experience.</li>
            <li>Select your career goal (skill upgrade or domain switch).</li>
            <li>Receive curated course recommendations (YouTube, Udemy, Coursera, etc.).</li>
            <li>Boost your career with tailored learning resources.</li>
          </ul>
        </div>
      </main>

      <Footer />

    </div>
  );
}
