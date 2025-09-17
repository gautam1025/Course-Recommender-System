import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard"; // ✅ Import reusable component

export default function Recommendations() {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center px-6 py-16">
        {/* Intent & Skills */}
        <div className="mb-6 text-center">
          <p className="text-lg">
            <span className="font-bold text-yellow-300">Intent:</span>{" "}
            {goal === "switch" ? "Domain Change" : "Skill Upgrade"}
          </p>
          <p className="text-lg">
            <span className="font-bold text-yellow-300">Extracted Skills:</span>{" "}
            {skills}
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-yellow-400">
          Recommended Courses
        </h2>

        {error && <p className="text-red-300">{error}</p>}

        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  platform={course.platform}
                  price={course.price}
                  link={course.link}
                  skills={course.skills}
                />
              ))
            ) : (
              <p className="text-white/80">
                No courses found for your skills ({skills}).
              </p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
