import React from "react";

export default function HowItWorks() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="glass-card w-full max-w-3xl px-10 py-12 relative z-20">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-10 text-yellow-300 text-center drop-shadow-xl">
          How It Works
        </h2>

        {/* Steps */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <div className="flex gap-6 items-start">
            <span className="text-4xl select-none grayscale opacity-50">1️⃣</span>
            <div>
              <p className="text-white font-medium mb-1">Upload Resume</p>
              <p className="text-sm text-gray-400">Upload your existing resume in PDF format.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <span className="text-4xl select-none grayscale opacity-50">2️⃣</span>
            <div>
              <p className="text-white font-medium mb-1">AI Analysis</p>
              <p className="text-sm text-gray-400">Our AI extracts your skills, tools, and experience instantly.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <span className="text-4xl select-none grayscale opacity-50">3️⃣</span>
            <div>
              <p className="text-white font-medium mb-1">Set Goal</p>
              <p className="text-sm text-gray-400">Choose to either upgrade current skills or switch domains.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <span className="text-4xl select-none grayscale opacity-50">4️⃣</span>
            <div>
              <p className="text-white font-medium mb-1">Get Recommendations</p>
              <p className="text-sm text-gray-400">
                Receive curated courses from YouTube, Udemy, Coursera, etc.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <span className="text-4xl select-none grayscale opacity-50">5️⃣</span>
            <div>
              <p className="text-white font-medium mb-1">Follow Roadmap</p>
              <p className="text-sm text-gray-400">
                Track your progress with a structured learning timeline.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-12 border-t border-white/5 pt-6">
          Simple · Smart · Tailored for You ✨
        </p>
      </div>
    </div>
  );
}
