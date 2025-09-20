const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const upload = multer({ dest: "uploads/" });

// --- HELPER: Normalize price strings to numbers for easier sorting ---
const normalizePrice = (price) => {
  if (typeof price === 'string' && price.toLowerCase() === 'free') {
    return 0;
  }
  const numericValue = parseFloat(price.replace(/[^0-9.]/g, ''));
  return isNaN(numericValue) ? Infinity : numericValue; // Return a large number for un-parsable prices
};

// Load and process skills and courses at startup
const skillsList = JSON.parse(
  fs.readFileSync(path.join(__dirname, "skills.json"), "utf-8")
);
const courseData = fs.readFileSync(path.join(__dirname, 'courses.json'), 'utf-8');
const courseDB = JSON.parse(courseData).map(course => ({
    ...course,
    numericPrice: normalizePrice(course.price) // ✅ Add numeric price field
}));


// API: Upload + Recommend
app.post("/api/recommend", upload.single("resume"), async (req, res) => {
  try {
    const { goal } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded." });
    }

    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text.toLowerCase();
    fs.unlinkSync(filePath); // Clean up uploaded file

    const extractedSkills = skillsList.filter((skill) => {
      const safeSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${safeSkill}\\b`, "i");
      return regex.test(text);
    });

    const extractedSkillsSet = new Set(extractedSkills.map(skill => skill.toLowerCase()));
    
    console.log(`[DEBUG] Extracted ${extractedSkills.length} skills:`, extractedSkills);
    
    let matchedCourses = [];

    if (goal === 'upskill') {
        console.log("[INFO] Goal: Upskill. Finding relevant advanced courses.");
        matchedCourses = courseDB
            .map(course => {
                const matchingSkills = course.skills.filter(skill => 
                    extractedSkillsSet.has(skill.toLowerCase())
                );
                const score = matchingSkills.length;
                return score > 0 ? { ...course, score, matchingSkills } : null;
            })
            .filter(course => course !== null)
            .sort((a, b) => b.score - a.score);

    } else if (goal === 'switch') {
        console.log("[INFO] Goal: Domain Switch. Recommending courses with the most new skills.");
        matchedCourses = courseDB
            .map(course => {
                const newSkills = course.skills.filter(skill => !extractedSkillsSet.has(skill.toLowerCase()));
                const noveltyScore = newSkills.length;
                return { ...course, noveltyScore, newSkills };
            })
            .sort((a, b) => b.noveltyScore - a.noveltyScore);
    }
    
    console.log(`[DEBUG] Found ${matchedCourses.length} matching courses for goal "${goal}".`);

    res.json({
      message: "Resume parsed successfully",
      skills: extractedSkills,
      goal,
      recommendations: matchedCourses,
    });
  } catch (err) {
    console.error("❌ Error processing request:", err);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
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

