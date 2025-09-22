const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const axios = require("axios"); // ✅ For calling Python service

const { getCourses } = require("./dataService");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const upload = multer({ dest: "uploads/" });

//
// ---------- Recommendation helpers (same as before) ----------
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

function scoreCourse(course, userSkills, goal = "upskill", userProfile = {}) {
  const userSet = new Set(userSkills.map((s) => s.toLowerCase()));
  const metrics = computeCourseMetrics(course, userSet);

  let score = 0;
  if (goal === "switch") {
    score = metrics.novelty * 0.9 + metrics.relevance * 0.1;
  } else {
    score = metrics.relevance * 0.9 + metrics.novelty * 0.1;
  }

  // ---------- NEW: Experience & Degree Adjustment ----------
  let experienceBonus = 0;
  let degreeBonus = 0;

  // Experience (simple rule-based)
  if (userProfile.experience_years && userProfile.experience_years.length > 0) {
    const expText = userProfile.experience_years.join(" ").toLowerCase();
    const yearsMatch = expText.match(/(\d+)/); // extract number
    if (yearsMatch) {
      const years = parseInt(yearsMatch[1]);
      if (years >= 3) experienceBonus = 0.1; // boost advanced
      else if (years < 1) experienceBonus = -0.05; // penalize advanced slightly
    }
  }

  // Degrees (simple keyword mapping)
  if (userProfile.degrees && userProfile.degrees.length > 0) {
    const deg = userProfile.degrees.join(" ").toLowerCase();
    if (deg.includes("phd") || deg.includes("master") || deg.includes("m.tech")) {
      degreeBonus = 0.1; // advanced learner
    } else if (deg.includes("b.tech") || deg.includes("bachelor")) {
      degreeBonus = 0.05; // intermediate learner
    }
  }

  // Add bonuses
  score += experienceBonus + degreeBonus;

  // Price preference
  score += priceBonus(course);

  // Clamp
  score = Math.max(0, Math.min(1, score));

  const explanation = [];
  if (metrics.intersectionCount > 0) {
    explanation.push(`Matches ${metrics.intersectionCount} existing skill(s)`);
  }
  if (metrics.newCount > 0) {
    explanation.push(`Teaches ${metrics.newCount} new skill(s)`);
  }
  if (experienceBonus > 0) explanation.push("Adjusted for your experience level");
  if (degreeBonus > 0) explanation.push("Adjusted for your degree background");
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


function rankCourses(courses, userSkills, goal, userProfile, topN = 20) {
  const userSkillsNormalized = normalizeSkills(userSkills || []);
  const scored = courses.map((c) => ({
    c,
    s: scoreCourse(c, userSkillsNormalized, goal, userProfile),
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

    // 1. Read uploaded PDF
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // 2. Send resume text to Python NER service
    const nerResponse = await axios.post("http://localhost:8000/ner", {
      text: text,
    });

    const userProfile = nerResponse.data; // {skills, job_titles, degrees, companies, experience_years}

    // 3. Load courses
    const courseDB = await getCourses("json");

    // 4. Rank courses using extracted skills
    const ranked = rankCourses(courseDB, userProfile.skills || [], goal, userProfile, 30);

    res.json({
      message: "Resume analyzed successfully",
      profile: userProfile,
      goal,
      recommendations: ranked,
    });
  } catch (err) {
    console.error("❌ Error in /api/recommend:", err.message);
    res.status(500).json({ error: "Failed to process resume" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () =>
  console.log(`✅ Node backend running on http://localhost:${PORT}`)
);
