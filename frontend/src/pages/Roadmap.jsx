import React, { useEffect, useState, useMemo } from "react";
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
  }, [queryParams]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-amber-500">
          Your Career Roadmap
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A step-by-step guide tailored to your specific goals and skills gap.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-indigo-200">Generating your personalized path...</p>
        </div>
      ) : roadmap.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-white/70 italic text-lg">
            No roadmap found for your profile. Please try generating again.
          </p>
        </div>
      ) : (
        <div className="relative pl-8 md:pl-10 space-y-12 before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-transparent">
          {roadmap.map((step, index) => (
            <div key={step.step || index} className="relative animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              {/* Timeline marker */}
              <div className="absolute -left-[39px] md:-left-[41px] top-6 flex items-center justify-center w-10 h-10 rounded-full bg-[#0a0a0f] border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 text-xs font-bold text-white">
                {index + 1}
              </div>

              {/* Step card */}
              <div className="glass-card p-6 md:p-8 hover:bg-white/5 transition-colors group">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Suggested courses */}
                {step.courses && step.courses.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4 flex items-center gap-2">
                      Recommended Resources
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.courses.map((course, idx) => (
                        <a
                          key={idx}
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col p-4 rounded-xl bg-black/40 border border-white/5 hover:border-indigo-500/50 hover:bg-black/60 transition-all group/card"
                        >
                          <p className="font-semibold text-white mb-1 line-clamp-2 group-hover/card:text-indigo-300 transition-colors">
                            {course.title}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-2">
                            <span className="text-xs text-gray-500">{course.platform}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                              {course.price}
                            </span>
                          </div>
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
  );
}
