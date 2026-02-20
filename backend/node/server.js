// ============================================================================
// Course Recommender System - Backend Server (FIXED VERSION)
// ============================================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs").promises;
const path = require("path");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const winston = require("winston");
const os = require("os");

const { getCoursesAndRank } = require("./dataService");
const roadmapTemplates = require("./roadmapTemplates");
const { dedupeCourses } = require("./utils/dedupe");

// 
// Logger
// 
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

// ============================================================================
// App setup
// ============================================================================
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*", // Allows any origin in production so different Vercel URLs don't break
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ============================================================================
// Uploads handling (TMP FILE SERVERLESS SAFE)
// ============================================================================
const uploadDir = os.tmpdir();

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// 🔥 Warm-up NER Service (Render Cold Start Fix)
const warmUpNER = async () => {
  try {
    await axios.post(
      process.env.NER_API_URL,
      { text: "warm up" },
      { timeout: 60000 }
    );
    console.log("🔥 NER service warmed up");
  } catch (err) {
    console.log("⚠️ NER warm-up skipped:", err.message);
  }
};

// ============================================================================
// /api/recommend
// ============================================================================
app.post("/api/recommend", upload.single("resume"), async (req, res) => {
  let filePath;

  try {
    const { goal } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file missing" });
    }

    filePath = req.file.path;

    // 1. Parse PDF
    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // 2. Call NER service (with timeout)
    const nerResponse = await axios.post(
      process.env.NER_API_URL,
      { text },
      { timeout: 60000}
    );

    const userProfile = nerResponse.data || {};
    const extractedSkills = userProfile.skills || [];

    // 3. Rank courses
    console.log("👉 Ranking courses...");
    const rawRecs = await getCoursesAndRank(
      extractedSkills,
      goal,
      userProfile
    );
    console.log(`✅ Ranked ${rawRecs.length} courses`);

    const seenCourses = new Set();
    const recommendations = dedupeCourses(rawRecs, seenCourses);
    console.log(`✅ Final recommendations count: ${recommendations.length}`);

    req.app.locals.seenCourses = seenCourses;

    res.json({
      message: "✅ Resume analyzed successfully",
      profile: userProfile,
      goal,
      recommendations
    });
  } catch (err) {
    console.error("❌ /api/recommend CRASHED:", err);
    logger.error("❌ /api/recommend failed", err);
    res.status(500).json({
      error: "Failed to process resume. Check backend logs.",
      details: err.message,
      stack: err.stack
    });
  } finally {
    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (e) {
        logger.warn("⚠️ Failed to cleanup file", e.message);
      }
    }
  }
});

// ============================================================================
// Helpers
// ============================================================================
function detectDomainFromSkills(userSkills) {
  const skillsSet = new Set(userSkills);

  if (["python", "sql", "ml", "deep learning"].some(s => skillsSet.has(s)))
    return "data_science";

  if (["html", "css", "javascript", "react", "node"].some(s => skillsSet.has(s)))
    return "web_dev";

  if (["aws", "docker", "kubernetes"].some(s => skillsSet.has(s)))
    return "cloud";

  if (["cybersecurity", "networking"].some(s => skillsSet.has(s)))
    return "cybersecurity";

  return "general";
}

// ============================================================================
// /api/roadmap
// ============================================================================
app.post("/api/roadmap", async (req, res) => {

  try {
    const { skills = [], goal = "upskill", domain: selectedDomain } = req.body;
    const userSkills = skills.map(s => s.toLowerCase());

    const domain =
      goal === "switch"
        ? selectedDomain || "data_science"
        : detectDomainFromSkills(userSkills);

    const seenCourses = req.app.locals.seenCourses || new Set();
    const roadmapTemplate =
      roadmapTemplates[domain] || roadmapTemplates.data_science;

    let stepNum = 1;
    const roadmap = [];

    for (const step of roadmapTemplate.steps) {
      let stepCourses = await getCoursesAndRank([step.key], goal, { skills });
      stepCourses = dedupeCourses(stepCourses, seenCourses);

      roadmap.push({
        step: stepNum++,
        title: step.title,
        description: step.description,
        courses: stepCourses.slice(0, 3)
      });
    }

    res.json({ title: roadmapTemplate.title, roadmap });
  } catch (err) {
    logger.error("❌ /api/roadmap failed", err);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

// ============================================================================
// Health check
// ============================================================================
app.get("/", (req, res) => res.send("Node API Gateway is running!"));

app.get("/api/health-check", async (req, res) => {
  res.json({
    status: "running",
    ner_url: process.env.NER_API_URL || "missing"
  });
});

app.listen(PORT, () =>
  console.log(`✅ Backend running on port ${PORT}`)
);
