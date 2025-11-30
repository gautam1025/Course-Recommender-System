 
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

export default function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [domain, setDomain] = useState("data_science");

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

  // ✅ Filtering & Sorting
  const filteredCourses = courses
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

  // ✅ Split into free vs paid
  const freeCourses = filteredCourses.filter((c) =>
    c.price.toLowerCase().includes("free")
  );
  const paidCourses = filteredCourses.filter(
    (c) => !c.price.toLowerCase().includes("free")
  );

  // ✅ Reset filters
  const resetFilters = () => {
    setPlatformFilter("");
    setSortOrder("");
  };

  return (
    <div className="w-full">
      <section className="min-h-screen px-6 py-16 bg-black/50 backdrop-blur-md flex flex-col items-center">
        <div className="w-full max-w-6xl">
          {/* Top Info Card */}
          <div className="mb-10 rounded-2xl bg-white/10 border border-white/20 shadow-2xl px-6 py-6 md:px-8 md:py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Recommended Courses
            </h1>
            <div className="space-y-2 text-sm md:text-base text-gray-100">
              <p>
                <span className="font-semibold text-yellow-300">Intent:</span>{" "}
                {goal === "switch" ? "Domain Change" : "Skill Upgrade"}
              </p>
              <p>
                <span className="font-semibold text-yellow-300">Extracted Skills:</span>{" "}
                {skills || "Not available"}
              </p>
              {goal === "switch" && (
                <p>
                  <span className="font-semibold text-yellow-300">Target Domain:</span>{" "}
                  {targetDomain || "Not specified"}
                </p>
              )}
            </div>
          </div>

          {/* Filters & Sorting */}
          <div className="mb-10 rounded-2xl bg-white/5 border border-white/15 shadow-lg px-4 py-4 md:px-6 md:py-5">
            <h2 className="text-lg font-semibold mb-3 text-gray-100">
              Filter & Sort
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              {/* Platform Filter */}
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-black/60 border border-white/25 
                           text-sm text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              >
                <option value="">All Platforms</option>
                <option value="YouTube">YouTube</option>
                <option value="Udemy">Udemy</option>
                <option value="Coursera">Coursera</option>
                <option value="FreeCodeCamp">FreeCodeCamp</option>
              </select>

              {/* Sort by Price */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-black/60 border border-white/25 
                           text-sm text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              >
                <option value="">Sort by Price</option>
                <option value="asc">Lowest to Highest</option>
                <option value="desc">Highest to Lowest</option>
              </select>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white 
                           text-sm font-semibold shadow-md transition-transform hover:-translate-y-0.5"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Free Courses */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-green-300 mb-4">
              🎓 Free Courses
            </h2>
            {freeCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeCourses.map((course, index) => (
                  <CourseCard
                    key={index}
                    title={course.title}
                    platform={course.platform}
                    price={course.price}
                    link={course.link}
                    skills={course.skills}
                    score={course.score}
                    explanation={course.explanation}
                    thumbnail={course.thumbnail}
                    channel={course.channel}
                    description={course.description}
                  />
                ))}
              </div>
            ) : (
              <p className="text-white/80 italic text-sm">
                No free courses found for the current filters.
              </p>
            )}
          </section>

          {/* Paid Courses */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">
              💼 Paid Courses
            </h2>
            {paidCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paidCourses.map((course, index) => (
                  <CourseCard
                    key={index}
                    title={course.title}
                    platform={course.platform}
                    price={course.price}
                    link={course.link}
                    skills={course.skills}
                    score={course.score}
                    explanation={course.explanation}
                    thumbnail={course.thumbnail}
                    channel={course.channel}
                    description={course.description}
                  />
                ))}
              </div>
            ) : (
              <p className="text-white/80 italic text-sm">
                No paid courses found for the current filters.
              </p>
            )}
          </section>

          {/* Roadmap navigate button */}
          <div className="flex justify-center">
            <button
              onClick={() =>
                navigate(
                  `/roadmap?skills=${skills}&goal=${goal}&domain=${targetDomain || domain}`
                )
              }
              className="mt-2 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full 
                         shadow-lg shadow-yellow-400/60 hover:scale-105 hover:-translate-y-0.5 
                         transition-transform text-sm md:text-base"
            >
              View My Career Roadmap 🚀
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-300 mt-6 text-center text-sm">{error}</p>
          )}
        </div>
      </section>
    </div>
  );
}
