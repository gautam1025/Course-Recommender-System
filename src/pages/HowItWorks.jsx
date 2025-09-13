import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Upload Resume",
      desc: "Upload your resume in PDF format (max 5MB). Our system extracts text for analysis.",
      icon: "📄"
    },
    {
      step: "2",
      title: "Skill Extraction",
      desc: "We identify key skills and technologies from your resume using text analysis.",
      icon: "🧠"
    },
    {
      step: "3",
      title: "Get Recommendations",
      desc: "Receive curated free and paid courses (YouTube, Udemy, Coursera, etc.) tailored to your skills and goals.",
      icon: "🎯"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">How It Works</h1>
        <p className="text-lg text-gray-700 mb-12">
          Our recommender system helps you upgrade your skills or switch domains 
          with ease. Here’s how it works in 3 simple steps:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
