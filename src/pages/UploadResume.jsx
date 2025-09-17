import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function UploadResume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!resume) {
      setError("Please select a PDF resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("goal", sessionStorage.getItem("goal") || "enhance");

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:5000/api/recommend", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { skills, goal, recommendations } = res.data;

      sessionStorage.setItem("recommendations", JSON.stringify(recommendations));

      window.location.href = `/recommend?skills=${skills.join(",")}&goal=${goal}`;
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>

          {/* Intent Selection */}
          <div className="flex justify-center gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="goal"
                value="enhance"
                defaultChecked
                className="accent-yellow-400"
                onChange={(e) => sessionStorage.setItem("goal", e.target.value)}
              />
              <span>Skill Upgrade</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="goal"
                value="switch"
                className="accent-yellow-400"
                onChange={(e) => sessionStorage.setItem("goal", e.target.value)}
              />
              <span>Domain Change</span>
            </label>
          </div>

          {/* File Upload with placeholder */}
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
            className="px-6 py-2 bg-green-500/80 rounded-full hover:bg-green-600/80 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>

          {error && <p className="text-red-300 mt-3">{error}</p>}
        </div>
      </main>

      <Footer />
    </div>
  );
}
