import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <h2 className="text-4xl font-bold mb-6 text-yellow-300">Recommended Courses</h2>

        {error && <p className="text-red-300">{error}</p>}

        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md hover:scale-105 transition-transform"
                >
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Platform:</span>{" "}
                    {course.platform}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Price:</span> {course.price}
                  </p>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                      className="inline-block mt-3 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full 
                                shadow-md transition transform hover:scale-105 
                                hover:ring-4 hover:ring-white hover:ring-offset-2 hover:ring-offset-yellow-400 
                                hover:shadow-yellow-300/80">
                        View Course
                      </a>
                      
                </div>
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
