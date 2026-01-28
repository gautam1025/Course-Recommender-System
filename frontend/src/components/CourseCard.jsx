import React, { useState } from "react";

export default function CourseCard({
  title,
  platform,
  price,
  link,
  skills,
  score,
  explanation,
  thumbnail,
  channel,
  description
}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="glass-card p-5 hover:bg-white/5 transition-all duration-300 flex flex-col h-full group">
      {/* Thumbnail with Play Badge for YouTube */}
      {thumbnail && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="relative block mb-4 overflow-hidden rounded-lg">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          {platform === "YouTube" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <div className="bg-red-600/90 rounded-full p-3 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </a>
      )}

      {/* Platform Badge */}
      <div className="flex justify-between items-start mb-3">
        <span
          className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${platform === "YouTube"
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : platform === "Udemy"
                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                : platform === "Coursera"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : platform === "FreeCodeCamp"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-gray-500/10 text-gray-400 border-gray-500/20"
            }`}
        >
          {platform}
        </span>

        {/* Score */}
        {score !== undefined && (
          <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md border border-green-400/20">
            {score}% Match
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 leading-tight group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>

      {/* Channel Info (for YouTube etc.) */}
      {channel && (
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <span>By</span>
          <span className="text-gray-300 font-medium">{channel}</span>
        </p>
      )}

      {/* Price */}
      <p className="text-sm mb-3 text-gray-300">
        <span className="text-gray-500 text-xs uppercase tracking-wide">Price:</span> {price}
      </p>

      {/* Explanation with toggle */}
      {explanation && (
        <div className="text-gray-400 text-sm mb-4 bg-black/20 p-3 rounded-lg border border-white/5">
          <p className="line-clamp-3">
            {showMore ? explanation : explanation.slice(0, 80) + (explanation.length > 80 ? "..." : "")}
          </p>
          {explanation.length > 80 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-2 text-indigo-400 hover:text-indigo-300 text-xs font-medium"
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      )}

      {/* Optional Description */}
      {description && !explanation && (
        <p className="text-xs text-gray-400 mb-4 line-clamp-3">
          {description}
        </p>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
        {skills &&
          skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded-md border border-white/10"
            >
              {skill}
            </span>
          ))}
        {skills && skills.length > 3 && (
          <span className="text-xs text-gray-500 px-1 py-1">+{skills.length - 3}</span>
        )}
      </div>

      {/* View Course Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-2 w-full text-center py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10 group-hover:border-indigo-500/50 group-hover:bg-indigo-600/20 group-hover:text-indigo-200"
      >
        View Course
      </a>
    </div>
  );
}
