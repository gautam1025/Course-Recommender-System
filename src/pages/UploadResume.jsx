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
    <div className="w-full">
      <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-black/50 backdrop-blur-md">
        <div className="w-full max-w-xl bg-white/10 border border-white/25 rounded-2xl shadow-2xl px-6 py-8 md:px-8 md:py-10">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Upload Resume</h2>
            <p className="text-gray-200 text-sm md:text-base">
              Choose your goal, upload your resume, and let the system generate a
              personalised learning roadmap for you.
            </p>
          </div>

          {/* Intent Selection */}
          <div className="flex flex-col gap-3 mb-6">
            <p className="text-sm text-gray-200 font-medium text-left">
              What are you trying to do?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => setGoal("enhance")}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all
                  ${
                    goal === "enhance"
                      ? "bg-yellow-400 text-black border-yellow-500 shadow-lg shadow-yellow-400/50"
                      : "bg-black/40 text-white border-white/30 hover:bg-black/70"
                  }`}
              >
                Skill Upgrade
              </button>

              <button
                type="button"
                onClick={() => setGoal("switch")}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all
                  ${
                    goal === "switch"
                      ? "bg-yellow-400 text-black border-yellow-500 shadow-lg shadow-yellow-400/50"
                      : "bg-black/40 text-white border-white/30 hover:bg-black/70"
                  }`}
              >
                Domain Change
              </button>
            </div>
          </div>

          {/* Domain selection (only if switching) */}
          {goal === "switch" && (
            <div className="mb-6">
              <label className="block text-sm text-gray-200 mb-2 text-left">
                Select Target Domain
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/60 border border-white/30 
                           text-sm text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              >
                <option value="">-- Select Target Domain --</option>
                <option value="data_science">Data Science</option>
                <option value="web_dev">Web Development</option>
                <option value="cloud">Cloud Computing</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="devops">DevOps / SRE</option>
              </select>
            </div>
          )}

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm text-gray-200 mb-2 text-left">
              Upload Resume (PDF only)
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label
                className="flex-1 cursor-pointer rounded-xl border-2 border-dashed border-white/30 
                           bg-black/50 hover:bg-black/70 transition-colors px-4 py-4 text-center text-sm"
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />
                <div className="text-3xl mb-1">📎</div>
                <p className="font-medium">
                  {resume ? resume.name : "Click to select your resume"}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  PDF · Max size ~5MB
                </p>
              </label>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold
                       shadow-lg shadow-yellow-400/60 transition-transform
                       hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 disabled:hover:-translate-y-0"
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-red-300 mt-3 text-sm text-center">
              {error}
            </p>
          )}

          {/* Helper text */}
          <p className="mt-4 text-xs text-gray-300 text-center">
            Your resume is processed securely and only used to generate course
            recommendations and roadmaps.
          </p>
        </div>
      </section>
    </div>
  );
}
