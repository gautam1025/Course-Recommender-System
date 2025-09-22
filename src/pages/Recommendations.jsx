import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center px-6 py-16 w-full">
        {/* Intent & Skills */}
        <div className="mb-6 text-center">
          <p className="text-lg">
            <span className="font-bold text-yellow-300">Intent:</span>{" "}
            {goal === "switch" ? "Domain Change" : "Skill Upgrade"}
          </p>
          <p className="text-lg mt-2">
            <span className="font-bold text-yellow-300">Extracted Skills:</span>{" "}
            {skills}
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
            className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Free Courses */}
        <section className="mb-12 w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-green-300 mb-6">
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
                />
              ))}
            </div>
          ) : (
            <p className="text-white/80 italic">No free courses found.</p>
          )}
        </section>

        {/* Paid Courses */}
        <section className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-yellow-300 mb-6">
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
                />
              ))}
            </div>
          ) : (
            <p className="text-white/80 italic">No paid courses found.</p>
          )}
        </section>

        {error && <p className="text-red-300 mt-6">{error}</p>}
      </main>

      <Footer />
    </div>
  );
}