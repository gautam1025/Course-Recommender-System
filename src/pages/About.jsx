import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 px-6 py-12 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          About This Project
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          The <span className="font-semibold">AI-Powered Career & Course Recommender</span> 
          is a final-year B.Tech project designed to help working professionals 
          and students identify relevant courses for{" "}
          <span className="font-semibold">upskilling, career growth, or domain switching</span>.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Users can upload their resume, and our system automatically extracts key 
          <span className="font-semibold"> skills and technologies</span> using text analysis.
          Based on these skills and the user’s career goals, the system recommends 
          curated <span className="font-semibold">free (YouTube, FreeCodeCamp)</span> and 
          <span className="font-semibold"> paid (Udemy, Coursera)</span> courses.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          The project is built with <span className="italic">React (Frontend)</span>, 
          <span className="italic"> Express.js (Backend)</span>, 
          and a structured database of skills and courses. 
          It is designed to be extensible with future support for 
          APIs (YouTube, Udemy) and databases like MongoDB.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
          <ul className="list-disc list-inside text-left text-gray-700">
            <li>Resume parsing (PDF format)</li>
            <li>Automatic skill extraction</li>
            <li>Course recommendations (Free & Paid)</li>
            <li>Clean and responsive UI with TailwindCSS</li>
            <li>Future-ready (API & DB integration possible)</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
