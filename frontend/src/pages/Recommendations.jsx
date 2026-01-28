import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

export default function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const skills = queryParams.get("skills") || "";
  const goal = queryParams.get("goal") || "";
  const targetDomain = queryParams.get("domain") || "";

  useEffect(() => {
    const storedRecs = sessionStorage.getItem("recommendations");
    if (storedRecs) {
      setCourses(JSON.parse(storedRecs));
    } else {
      setError("No recommendations found. Please upload your resume again.");
    }
  }, []);

  // ✅ Filtering & Sorting with memoization for performance
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) =>
        platformFilter ? course.platform === platformFilter : true
      )
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.numericPrice - b.numericPrice;
        } else if (sortOrder === "desc") {
          return b.numericPrice - a.numericPrice;
        }
        return 0;
      });
  }, [courses, platformFilter, sortOrder]);

  // ✅ Split into free vs paid
  const freeCourses = filteredCourses.filter((c) =>
    c.price.toLowerCase().includes("free")
  );
  const paidCourses = filteredCourses.filter(
    (c) => !c.price.toLowerCase().includes("free")
  );

  // ✅ Reset filters with memoization
  const resetFilters = useCallback(() => {
    setPlatformFilter("");
    setSortOrder("");
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
          Recommended Courses
        </h1>
        <div className="inline-flex flex-wrap justify-center gap-4 text-sm text-gray-300 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
          <p>
            <span className="text-yellow-400 font-semibold">Intent:</span>{" "}
            {goal === "switch" ? "Domain Change" : "Skill Upgrade"}
          </p>
          <span className="hidden sm:inline text-white/20">|</span>
          <p>
            <span className="text-yellow-400 font-semibold">Skills:</span>{" "}
            {skills || "Not available"}
          </p>
          {goal === "switch" && (
            <>
              <span className="hidden sm:inline text-white/20">|</span>
              <p>
                <span className="text-yellow-400 font-semibold">Target:</span>{" "}
                {targetDomain || "Not specified"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="glass-card p-4 md:p-6 mb-12 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white mb-3 md:mb-0">Filter & Sort</h2>
          <button
            onClick={resetFilters}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 
                         text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="">All Platforms</option>
              <option value="YouTube">YouTube</option>
              <option value="Udemy">Udemy</option>
              <option value="Coursera">Coursera</option>
              <option value="FreeCodeCamp">FreeCodeCamp</option>
            </select>
          </div>

          <div className="flex-1">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 
                         text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="">Sort by Price</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Free Courses */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400 text-xl">🎓</div>
          <h2 className="text-2xl font-bold text-white">Free Courses</h2>
        </div>

        {freeCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeCourses.map((course, index) => (
              <CourseCard
                key={index}
                {...course}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-gray-400">No free courses found matching your filters.</p>
          </div>
        )}
      </section>

      {/* Paid Courses */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 text-xl">💼</div>
          <h2 className="text-2xl font-bold text-white">Paid Courses</h2>
        </div>

        {paidCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidCourses.map((course, index) => (
              <CourseCard
                key={index}
                {...course}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-gray-400">No paid courses found matching your filters.</p>
          </div>
        )}
      </section>

      {/* Roadmap navigate button */}
      <div className="flex justify-center pb-12">
        <button
          onClick={() =>
            navigate(
              `/roadmap?skills=${skills}&goal=${goal}&domain=${targetDomain}`
            )
          }
          className="btn-primary flex items-center gap-2 group"
        >
          <span>View My Career Roadmap</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-xl backdrop-blur-md animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}
