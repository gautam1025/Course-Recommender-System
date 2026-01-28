import React, { useState } from "react";
import axios from "axios";

export default function UploadResume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [goal, setGoal] = useState(""); // enhance / switch
  const [domain, setDomain] = useState(""); // only if switch

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
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("goal", goal);

      if (goal === "switch") {
        formData.append("domain", domain);
      }

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(
        `${API_URL}/api/recommend`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { profile, recommendations } = res.data;

      sessionStorage.setItem("recommendations", JSON.stringify(recommendations));

      let redirectUrl = `/recommend?skills=${profile.skills.join(",")}&goal=${goal}`;

      if (goal === "switch" && domain) {
        redirectUrl += `&domain=${domain}`;
      }

      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Upload failed", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="glass-card w-full max-w-2xl px-8 py-10 relative z-20">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Upload Resume</h2>
          <p className="text-gray-400">
            Choose your goal, upload your resume, and let the system generate a
            personalized learning roadmap for you.
          </p>
        </div>

        {/* Intent Selection */}
        <div className="flex flex-col gap-4 mb-8">
          <p className="text-sm text-gray-300 font-medium">
            What are you trying to do?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setGoal("enhance")}
              className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all duration-300
                ${goal === "enhance"
                  ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
            >
              Skill Upgrade
            </button>

            <button
              type="button"
              onClick={() => setGoal("switch")}
              className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all duration-300
                ${goal === "switch"
                  ? "bg-purple-600/20 text-purple-300 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
            >
              Domain Change
            </button>
          </div>
        </div>

        {/* Domain Selection */}
        <div className={`transition-all duration-500 overflow-hidden ${goal === "switch" ? "max-h-32 opacity-100 mb-8" : "max-h-0 opacity-0 mb-0"}`}>
          <label className="block text-sm text-gray-300 mb-2">
            Select Target Domain
          </label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 
                       text-sm text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
          >
            <option value="">-- Select Target Domain --</option>
            <option value="data_science">Data Science</option>
            <option value="web_dev">Web Development</option>
            <option value="cloud">Cloud Computing</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="devops">DevOps / SRE</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="mb-10">
          <label className="block text-sm text-gray-300 mb-2">
            Upload Resume (PDF only)
          </label>
          <label
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl 
                       bg-white/5 hover:bg-white/10 hover:border-indigo-500/50
                       transition-all cursor-pointer group"
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="hidden"
            />
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📄</div>
            <p className="font-medium text-gray-300">
              {resume ? resume.name : "Click to select or drag file"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Max size 5MB
            </p>
          </label>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Generate Roadmap"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-400 mt-4 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
            {error}
          </p>
        )}

        <p className="mt-6 text-xs text-gray-600 text-center">
          Securely processed by AI for educational purposes.
        </p>
      </div>
    </div>
  );
}
