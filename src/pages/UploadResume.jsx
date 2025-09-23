import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function UploadResume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [goal, setGoal] = useState(""); // ✅ Skill Upgrade or Domain Change

  const handleSubmit = async () => {
    if (!resume) {
      setError("Please select a PDF resume first.");
      return;
    }
    if (!goal) {
      setError("Please select your intent (Skill Upgrade or Domain Change).");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ✅ Send PDF + goal directly to Node backend
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("goal", goal);

      const res = await axios.post(
        "http://localhost:5000/api/recommend",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { profile, recommendations } = res.data;

      // ✅ Save to session storage
      sessionStorage.setItem("recommendations", JSON.stringify(recommendations));

      // ✅ Redirect with extracted skills + goal
      window.location.href = `/recommend?skills=${profile.skills.join(",")}&goal=${goal}`;
    } catch (err) {
      console.error("Upload failed", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">Upload Resume</h2>

          {/* Intent Selection - Stylish Cards */}
          <div className="flex justify-center gap-6 mb-6">
            <button
              type="button"
              onClick={() => setGoal("enhance")}
              className={`px-6 py-3 rounded-lg shadow-md border-2 transition 
                ${goal === "enhance"
                  ? "bg-yellow-400 text-black border-yellow-500"
                  : "bg-white/20 border-white/40 text-white hover:bg-white/30"}`}
            >
              Skill Upgrade
            </button>

            <button
              type="button"
              onClick={() => setGoal("switch")}
              className={`px-6 py-3 rounded-lg shadow-md border-2 transition 
                ${goal === "switch"
                  ? "bg-yellow-400 text-black border-yellow-500"
                  : "bg-white/20 border-white/40 text-white hover:bg-white/30"}`}
            >
              Domain Change
            </button>
          </div>

          {/* File Upload */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="block w-full text-sm text-white/80"
            />
            <span className="text-xs text-white/70">PDF only, Max: 5MB</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-md shadow-md 
             transition transform hover:scale-105 hover:animate-pulse
             hover:ring-4 hover:ring-white hover:ring-offset-2 hover:ring-offset-yellow-400"
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          {error && <p className="text-red-300 mt-3">{error}</p>}
        </div>
      </main>

      <Footer />
    </div>
  );
}
