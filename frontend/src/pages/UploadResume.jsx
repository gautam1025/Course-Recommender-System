// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import axios from "axios";

// export default function UploadResume() {
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [goal, setGoal] = useState(""); 
//   const [domain, setDomain] = useState(""); 

//   const handleSubmit = async () => {
//     if (!resume) {
//       setError("Please select a PDF resume first.");
//       return;
//     }
//     if (!goal) {
//       setError("Please select your intent (Skill Upgrade or Domain Change).");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       // ✅ Send PDF + goal directly to Node backend
//       const formData = new FormData();
//       formData.append("resume", resume);
//       formData.append("goal", goal);

//       // Append domain only if goal is "switch"
//       if (goal === "switch") {
//         formData.append("domain", domain);
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/recommend",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const { profile, recommendations } = res.data;

//       // ✅ Save to session storage
//       sessionStorage.setItem("recommendations", JSON.stringify(recommendations));

//       // ✅ Redirect with extracted skills + goal
//       let redirectUrl = `/recommend?skills=${profile.skills.join(",")}&goal=${goal}`;

//       // ✅ Pass target domain in query string if switching
//       if (goal === "switch" && domain) {
//         redirectUrl += `&domain=${domain}`;
//       }

//       window.location.href = redirectUrl;
//     } catch (err) {
//       console.error("Upload failed", err);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white">
//       <Navbar />

//       <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
//         <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md w-full text-center">
//           <h2 className="text-2xl font-bold mb-6">Upload Resume</h2>

//           {/* Intent Selection - Stylish Cards */}
//           <div className="flex justify-center gap-6 mb-6">
//             <button
//               type="button"
//               onClick={() => setGoal("enhance")}
//               className={`px-6 py-3 rounded-lg shadow-md border-2 transition 
//                 ${goal === "enhance"
//                   ? "bg-yellow-400 text-black border-yellow-500"
//                   : "bg-white/20 border-white/40 text-white hover:bg-white/30"}`}
//             >
//               Skill Upgrade
//             </button>

//             <button
//               type="button"
//               onClick={() => setGoal("switch")}
//               className={`px-6 py-3 rounded-lg shadow-md border-2 transition 
//                 ${goal === "switch"
//                   ? "bg-yellow-400 text-black border-yellow-500"
//                   : "bg-white/20 border-white/40 text-white hover:bg-white/30"}`}
//             >
//               Domain Change
//             </button>
//           </div>

//           {/* Domain Selection only if goal = "switch" */}
//           {goal === "switch" && (
//             <div className="flex justify-center mb-6">
//               <select
//                 value={domain}
//                 onChange={(e) => setDomain(e.target.value)}
//                 className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               >
//                 <option value="">-- Select Target Domain --</option>
//                 <option value="data_science">Data Science</option>
//                 <option value="web_dev">Web Development</option>
//                 <option value="cloud">Cloud Computing</option>
//                 <option value="cybersecurity">Cybersecurity</option>
//                 <option value="devops">DevOps / SRE</option>
//               </select>
//             </div>
//           )}

//           {/* File Upload */}
//           <div className="flex items-center gap-3 mb-4">
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={(e) => setResume(e.target.files[0])}
//               className="block w-full text-sm text-white/80"
//             />
//             <span className="text-xs text-white/70">PDF only, Max: 5MB</span>
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-md shadow-md 
//              transition transform hover:scale-105 hover:animate-pulse
//              hover:ring-4 hover:ring-white hover:ring-offset-2 hover:ring-offset-yellow-400"
//           >
//             {loading ? "Processing..." : "Submit"}
//           </button>

//           {error && <p className="text-red-300 mt-3">{error}</p>}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
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

      const res = await axios.post(
        "http://localhost:5000/api/recommend",
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
