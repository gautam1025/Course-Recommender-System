 // src/pages/Roadmap.jsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize URL parameter parsing for performance
  const queryParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      skills: params.get("skills")?.split(",") || [],
      goal: params.get("goal") || "upskill",
      domain: params.get("domain") || "data_science"
    };
  }, []);

  useEffect(() => {
    const { skills, goal, domain } = queryParams;

    axios
      .post("http://localhost:5000/api/roadmap", { skills, goal, domain })
      .then((res) => {
        setRoadmap(res.data.roadmap || []);
      })
      .catch((err) => {
        console.error("❌ Roadmap fetch failed:", err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full">
      <section className="min-h-screen px-6 py-16 bg-black/50 backdrop-blur-md flex justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-10 text-yellow-300 text-center drop-shadow-xl">
           Your Career Roadmap
          </h1>

          {loading ? (
            <p className="text-center text-gray-200">Loading roadmap...</p>
          ) : roadmap.length === 0 ? (
            <p className="text-center text-white/70 italic">
              No roadmap found for your profile. Please try generating again.
            </p>
          ) : (
            <div className="relative pl-6 border-l-2 border-yellow-400/80 space-y-10">
              {roadmap.map((step) => (
                <div key={step.step} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-yellow-400 shadow-yellow-300 shadow-lg border-2 border-black" />

                  {/* Step card */}
                  <div className="bg-white/10 border border-white/25 rounded-2xl shadow-xl px-5 py-4 md:px-6 md:py-5">
                    <h2 className="text-xl font-semibold text-yellow-300 mb-2">
                      {step.title}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base mb-4">
                      {step.description}
                    </p>

                    {/* Suggested courses */}
                    {step.courses && step.courses.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-100 mb-2">
                          Suggested Courses:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {step.courses.map((course, idx) => (
                            <a
                              key={idx}
                              href={course.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block bg-black/50 border border-white/20 rounded-lg px-3 py-3 
                                         hover:border-yellow-400 hover:shadow-lg hover:-translate-y-0.5 
                                         transition-transform text-sm"
                            >
                              <p className="font-semibold text-white mb-1 line-clamp-2">
                                {course.title}
                              </p>
                              <p className="text-xs text-gray-300">
                                {course.platform} • {course.price}
                              </p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
