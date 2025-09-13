import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function UploadResume() {
  const [resume, setResume] = useState(null);
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ new state

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setResume(null);
        setError("❌ Only PDF files are allowed.");
      } else if (file.size > 5 * 1024 * 1024) {
        setResume(null);
        setError("❌ File size must be under 5MB.");
      } else {
        setResume(file);
        setError("");
      }
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume) {
      setError("Please upload a valid PDF resume.");
      return;
    }
    if (!goal) {
      setError("Please select your career goal.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("goal", goal);

    setLoading(true); // ✅ start spinner

    axios
      .post("http://localhost:5000/api/recommend", formData)
      .then((res) => {
        // Save response in localStorage
        localStorage.setItem(
          "recommendations",
          JSON.stringify(res.data.recommendations)
        );
        localStorage.setItem("skills", JSON.stringify(res.data.skills));
        localStorage.setItem("goal", goal);

        // Redirect
        window.location.href = "/recommend";
      })
      .catch((err) => {
        console.error("Upload error:", err);
        setError("Something went wrong while uploading resume.");
      })
      .finally(() => setLoading(false)); // ✅ stop spinner
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Upload Your Resume</h1>
        
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload Resume</label>
          <div className="flex items-center gap-4">
            {/* Styled Upload Button */}
            <label
              htmlFor="resumeUpload"
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Choose File
            </label>

            {/* Hidden input */}
            <input
              id="resumeUpload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File info OR helper text */}
            <span className="text-sm text-gray-500">
              {resume ? resume.name : "PDF only, Max size 5MB"}
            </span>
          </div>

          {/* ✅ Error Message */}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              What’s your career goal?
            </label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="upskill"
                  checked={goal === "upskill"}
                  onChange={(e) => setGoal(e.target.value)}
                  className="mr-2"
                />
                Skill Upgrade
              </label>
              <label>
                <input
                  type="radio"
                  value="switch"
                  checked={goal === "switch"}
                  onChange={(e) => setGoal(e.target.value)}
                  className="mr-2"
                />
                Domain Switch
              </label>
            </div>
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                Uploading...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
