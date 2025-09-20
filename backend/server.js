const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const { getCourses } = require("./dataService");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const upload = multer({ dest: "uploads/" });

// Load skills list
const skillsList = JSON.parse(
  fs.readFileSync(path.join(__dirname, "skills.json"), "utf-8")
);

//
// ---------- Recommendation helpers ----------
//
function normalizeSkills(arr) {
  return Array.from(
    new Set((arr || []).map((s) => (s || "").toString().toLowerCase()))
  );
}

function safeLen(arr) {
  return arr && Array.isArray(arr) && arr.length ? arr.length : 1;
}

function computeCourseMetrics(course, userSkillsSet) {
  const courseSkills = normalizeSkills(course.skills || []);
  const lenC = safeLen(courseSkills);

  const intersection = courseSkills.filter((s) => userSkillsSet.has(s));
  const newSkills = courseSkills.filter((s) => !userSkillsSet.has(s));

  const relevance = intersection.length / lenC;
  const novelty = newSkills.length / lenC;

  return {
    courseSkills,
    intersectionCount: intersection.length,
    newCount: newSkills.length,
    relevance,
    novelty,
    newSkills,
  };
}

function priceBonus(course) {
  if (!course.price) return 0;
  const p = String(course.price).toLowerCase();
  if (p.includes("free")) return 0.05; // small boost for free courses
  return 0;
}

function scoreCourse(course, userSkills, goal = "upskill") {
  const userSet = new Set(userSkills.map((s) => s.toLowerCase()));
  const metrics = computeCourseMetrics(course, userSet);

  let score = 0;
  if (goal === "switch") {
    score = metrics.novelty * 0.9 + metrics.relevance * 0.1;
  } else {
    score = metrics.relevance * 0.9 + metrics.novelty * 0.1;
  }

  score += priceBonus(course);
  score = Math.max(0, Math.min(1, score));

  const explanation = [];
  if (metrics.intersectionCount > 0) {
    explanation.push(`Matches ${metrics.intersectionCount} existing skill(s)`);
  }
  if (metrics.newCount > 0) {
    explanation.push(`Teaches ${metrics.newCount} new skill(s)`);
  }
  if (course.price && String(course.price).toLowerCase().includes("free")) {
    explanation.push("Free resource");
  }

  return {
    score,
    scorePct: Math.round(score * 100),
    explanation: explanation.join(" • "),
    metrics,
  };
}

function rankCourses(courses, userSkills, goal, topN = 20) {
  const userSkillsNormalized = normalizeSkills(userSkills || []);
  const scored = courses.map((c) => ({
    c,
    s: scoreCourse(c, userSkillsNormalized, goal),
  }));

  scored.sort((a, b) => b.s.score - a.s.score);

  return scored.slice(0, topN).map(({ c, s }) => ({
    title: c.title,
    platform: c.platform,
    link: c.link,
    price: c.price,
    skills: c.skills,
    score: s.scorePct,
    explanation: s.explanation,
  }));
}

//
// ---------- API Endpoints ----------
//
app.post("/api/recommend", upload.single("resume"), async (req, res) => {
  try {
    const { goal } = req.body;

    // Read uploaded file
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text.toLowerCase();

    // Extract skills from resume
    const extractedSkills = skillsList.filter((skill) => {
      const safeSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${safeSkill}\\b`, "i");
      return regex.test(text);
    });

    // Load courses
    const courseDB = await getCourses("json");

    // Rank courses
    const ranked = rankCourses(courseDB, extractedSkills, goal, 30);

    res.json({
      message: "Resume parsed successfully",
      skills: extractedSkills,
      goal,
      recommendations: ranked,
    });
  } catch (err) {
    console.error("❌ Error parsing resume:", err);
    res.status(500).json({ error: "Failed to process resume" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
