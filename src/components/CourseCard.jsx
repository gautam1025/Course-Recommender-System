import React, { useState } from "react";

export default function CourseCard({ title, platform, price, link, skills, score, explanation }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
      {/* Platform Badge */}
      <span
        className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${
          platform === "YouTube"
            ? "bg-red-100 text-red-700"
            : platform === "Udemy"
            ? "bg-purple-100 text-purple-700"
            : platform === "Coursera"
            ? "bg-blue-100 text-blue-700"
            : platform === "FreeCodeCamp"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {platform}
      </span>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Price */}
      <p className="text-sm mb-2">
        <span className="font-semibold">Price:</span> {price}
      </p>

      {/* Score */}
      {score !== undefined && (
        <p className="text-green-400 font-bold mb-2">
          Relevance Score: {score}%
        </p>
      )}

      {/* Explanation with toggle */}
      {explanation && (
        <div className="text-gray-200 italic text-sm mb-3">
          {showMore ? explanation : explanation.slice(0, 80) + (explanation.length > 80 ? "..." : "")}
          {explanation.length > 80 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="ml-2 text-yellow-300 underline hover:text-yellow-400 text-xs"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {skills &&
          skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-yellow-800 font-bold text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
      </div>

      {/* View Course Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full transition transform hover:scale-105 hover:ring-4 hover:ring-white hover:ring-offset-2 hover:ring-offset-yellow-400 hover:shadow-yellow-300/80"
      >
        View Course
      </a>
    </div>
  );
}