// ============================================================================
// Course Recommender System - Backend Server
// ============================================================================
// This Express.js server provides RESTful APIs for:
// - Resume upload and analysis using NER (Named Entity Recognition)
// - Course recommendations based on extracted skills
// - Career roadmap generation
// - Dashboard data aggregation
//
// Key Features:
// - Async file operations for better performance
// - Structured logging with Winston
// - Caching in dataService to reduce API calls
// - PDF parsing for resume text extraction
// - Integration with Python NER microservice
// ============================================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs").promises; // Use promises for async file operations
const path = require("path");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const winston = require("winston"); // Structured logging
const { getCoursesAndRank } = require("./dataService");
const roadmapTemplates = require("./roadmapTemplates"); // Career roadmap templates

// ============================================================================
// Logging Configuration
// ============================================================================
// Winston logger provides structured logging with:
// - Console output for development
// - File logging for production monitoring
// - Error tracking with stack traces
// - JSON format for log aggregation
// ============================================================================
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "course-recommender-backend" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

// ============================================================================
// Express App Configuration
// ============================================================================
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies

// ============================================================================
// File Upload Configuration
// ============================================================================
// Multer handles multipart/form-data for resume uploads
// Files are temporarily stored in 'uploads/' directory
// ============================================================================
// 🚀 Ensure uploads directory exists
const UPLOAD_DIR = path.join(__dirname, "uploads");
(async () => {
    try {
        await fs.access(UPLOAD_DIR);
    } catch {
        await fs.mkdir(UPLOAD_DIR);
        console.log("📂 Created 'uploads/' directory");
    }
})();

const upload = multer({ dest: "uploads/" });

//
// ---------- API Endpoints ----------
//

// 📌 Resume upload + recommendations
app.post("/api/recommend", upload.single("resume"), async (req, res) => {
  try {
    const { goal } = req.body;

    // 1. Extract text from uploaded resume (PDF → raw text)
    // 1. Extract text from uploaded resume (PDF → raw text)
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // 2. Send resume text → Python NER service
    const nerResponse = await axios.post(process.env.NER_API_URL, { text });

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
    await fs.unlink(filePath);

  } catch (err) {
    if (err.response) {
       console.error("❌ NER Service Error:", err.response.status, err.response.data);
    } else {
       console.error("❌ Error in /api/recommend:", err.message);
    }
    
    // Cleanup even on error
    if (req.file) {
      try {
        await fs.unlink(path.join(__dirname, req.file.path));
      } catch (unlinkErr) {
        console.error("⚠️ Failed to cleanup file:", unlinkErr.message);
      }
    }

    res.status(500).json({ error: "Failed to process resume. See server logs for details." });
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