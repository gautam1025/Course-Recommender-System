import React from "react";

export default function CourseCard({ title, platform, link, price, skills }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col justify-between">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Platform badge */}
      <span
        className={`inline-block px-3 py-1 text-sm rounded-full mb-3 ${
          platform === "YouTube"
            ? "bg-red-100 text-red-700"
            : platform === "Udemy"
            ? "bg-purple-100 text-purple-700"
            : platform === "Coursera"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {platform}
      </span>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {skills &&
          skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
      </div>

      {/* Price */}
      <p
        className={`font-bold mb-4 ${
          price.toLowerCase() === "free" ? "text-green-600" : "text-blue-600"
        }`}
      >
        {price}
      </p>

      {/* Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition"
      >
        View Course
      </a>
    </div>
  );
}
