import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";

export default function Recommendations() {
  const [allCourses, setAllCourses] = useState([]);
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const storedCourses =
        JSON.parse(localStorage.getItem("recommendations")) || [];
      const storedSkills = JSON.parse(localStorage.getItem("skills")) || [];
      const storedGoal = localStorage.getItem("goal") || "";

      if (!storedCourses.length && !storedSkills.length && !storedGoal) {
        // ✅ Redirect back if nothing is stored
        navigate("/upload");
        return;
      }

      setAllCourses(storedCourses);
      setSkills(storedSkills);
      setGoal(storedGoal);
      setLoading(false);
    }, 800);
  }, [navigate]);

  const freeCourses = allCourses.filter(
    (course) => course.price.toLowerCase() === "free"
  );
  const paidCourses = allCourses.filter(
    (course) => course.price.toLowerCase() !== "free"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 px-6 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="ml-3 text-blue-600 font-medium">Loading courses...</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">
              Recommended Courses
            </h1>

            <p className="text-center text-gray-600 mb-10">
              Based on your goal:{" "}
              <span className="font-semibold">{goal || "N/A"}</span>
              <br />
              Extracted Skills:{" "}
              <span className="italic">
                {skills.length > 0 ? skills.join(", ") : "N/A"}
              </span>
            </p>

            {/* Free Courses */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-green-600 text-center">
                Free Courses
              </h2>
              {freeCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {freeCourses.map((course, idx) => (
                    <CourseCard key={idx} {...course} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  No free courses found.
                </p>
              )}
            </section>

            {/* Paid Courses */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">
                Paid Courses
              </h2>
              {paidCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paidCourses.map((course, idx) => (
                    <CourseCard key={idx} {...course} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  No paid courses found.
                </p>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
