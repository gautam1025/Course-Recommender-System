// routing page

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const { getCoursesAndRank } = require("./dataService"); 
const roadmapTemplates = require("./roadmapTemplates"); // ✅ NEW: import templates

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const upload = multer({ dest: "uploads/" });

//
// ---------- API Endpoints ----------
//

// 📌 Resume upload + recommendations
app.post("/api/recommend", upload.single("resume"), async (req, res) => {
  try {
    const { goal } = req.body;

    // 1. Extract text from uploaded resume (PDF → raw text)
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // 2. Send resume text → Python NER service
    const nerResponse = await axios.post("http://localhost:8000/ner", { text });

    const userProfile = nerResponse.data || {};
    const extractedSkills = userProfile.skills || [];

    // 3. Fetch + rank courses
    const rawRecs = await getCoursesAndRank(extractedSkills, goal, userProfile);

    // ✅ Deduplicate & track globally
    const seenCourses = new Set();
    const recommendations = require("./utils/dedupe").dedupeCourses(rawRecs, seenCourses);

    // ✅ Save seenCourses in response, so we can reuse in roadmap
    req.app.locals.seenCourses = seenCourses;

    // 4. Return structured response
    res.json({
      message: "✅ Resume analyzed successfully",
      profile: userProfile,
      goal,
      recommendations,
    });

    // ✅ Cleanup uploaded file
    fs.unlinkSync(filePath);

  } catch (err) {
    console.error("❌ Error in /api/recommend:", err.message);
    res.status(500).json({ error: "Failed to process resume" });
  }
});

//
// ---------- Helpers ----------
//

// ✅ NEW: auto-detect domain when goal=upskill
function detectDomainFromSkills(userSkills) {
  const skillsSet = new Set(userSkills);

  if (["python", "sql", "statistics", "ml", "deep learning"].some(s => skillsSet.has(s)))
    return "data_science";

  if (["html", "css", "javascript", "react", "node"].some(s => skillsSet.has(s)))
    return "web_dev";

  if (["aws", "azure", "gcp", "docker", "kubernetes", "linux"].some(s => skillsSet.has(s)))
    return "cloud";

  if (["cybersecurity", "networking", "firewall", "cryptography"].some(s => skillsSet.has(s)))
    return "cybersecurity";

  return "general"; // fallback
}

//
// 📌 Dynamic Career Roadmap Endpoint
//
app.post("/api/roadmap", async (req, res) => {
  try {
    const { skills = [], goal = "upskill", domain: selectedDomain } = req.body;
    const userSkills = skills.map((s) => s.toLowerCase());

    // ✅ Hybrid selection: switch = user choice, upskill = auto-detect
    let domain;
    if (goal === "switch") {
      domain = selectedDomain || "data_science";
    } else {
      domain = detectDomainFromSkills(userSkills);
    }

    const { dedupeCourses } = require("./utils/dedupe");
    const seenCourses = req.app.locals.seenCourses || new Set();

    // ✅ Pick roadmap template for the domain
    const roadmapTemplate = roadmapTemplates[domain] || roadmapTemplates.data_science;
    let roadmap = [];

    let stepNum = 1;
    for (const step of roadmapTemplate.steps) {
      if (goal === "switch") {
        // Show only steps user doesn’t already have
        if (!userSkills.includes(step.key)) {
          let stepCourses = await getCoursesAndRank([step.key], goal, { skills });
          stepCourses = dedupeCourses(stepCourses, seenCourses);

          roadmap.push({
            step: stepNum++,
            title: step.title,
            description: step.description,
            courses: stepCourses.slice(0, 3)
          });
        }
      } else {
        // Upskill → always show all steps (with advanced scoring)
        let stepCourses = await getCoursesAndRank([step.key], goal, { skills });
        stepCourses = dedupeCourses(stepCourses, seenCourses);

        roadmap.push({
          step: stepNum++,
          title: step.title,
          description: step.description,
          courses: stepCourses.slice(0, 3)
        });
      }
    }

    res.json({
      title: roadmapTemplate.title,
      roadmap
    });
  } catch (err) {
    console.error("❌ Error in /api/roadmap:", err.message);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

// 📊 Combined Dashboard Endpoint 
app.post("/api/dashboard", async (req, res) => {
  try {
    const { skills = [], goal = "upskill", domain = "data_science", profile = {} } = req.body;

    // --- Step 1: get top courses
    const recommendations = await getCoursesAndRank(skills, goal, profile);
    const topCourses = recommendations.slice(0, 6); // top 6 for dashboard preview

    // --- Step 2: get roadmap preview (first 3 steps)
    const axiosInstance = axios.create({ baseURL: `http://localhost:${PORT}` });
    const roadmapRes = await axiosInstance.post("/api/roadmap", { skills, goal, domain });
    const roadmap = roadmapRes.data?.roadmap?.slice(0, 3) || [];

    // --- Step 3: send consolidated profile dashboard
    res.json({
      message: "✅ Dashboard generated successfully",
      profile,
      goal,
      domain,
      topCourses,
      roadmap
    });
  } catch (err) {
    console.error("❌ Error in/api/dashboard:", err.message, err.stack);
    res.status(500).json({ error: "Failed to generate dashboard" });
  }
});

//
// Health check
//
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () =>
  console.log(`✅ Node backend running on http://localhost:${PORT}`)
);