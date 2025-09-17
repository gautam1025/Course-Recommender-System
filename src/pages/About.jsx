import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-md max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-4 text-yellow-300">About This Project</h2>
          
          <p className="text-white/80 leading-relaxed">
            The Career Recommender is a final-year project designed to help working
            professionals discover the best courses (free & paid) based on their
            resumes, skills, and career goals. It uses resume parsing, skill
            extraction, and personalized recommendations to guide users in upgrading
            their careers.
          </p>
          
        </div>

      </main>

      <Footer />

    </div>
  );
}
