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
    formData.append("goal", "enhance"); // Can later make this dynamic

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:5000/api/recommend", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { skills, goal, recommendations } = res.data;

      // Store recommendations in sessionStorage
      sessionStorage.setItem("recommendations", JSON.stringify(recommendations));

      // Redirect with query params
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

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="block w-full mb-4 text-sm text-white/80"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-md shadow-md 
             transition transform hover:scale-105 hover:animate-pulse
             hover:ring-4 hover:ring-white hover:ring-offset-2 hover:ring-offset-yellow-400">
            {loading ? "Uploading..." : "Submit"}
          </button>

          {error && <p className="text-red-300 mt-3">{error}</p>}
        </div>
      </main>

      <Footer />
    </div>
  );
}
