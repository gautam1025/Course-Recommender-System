// routing page

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const { getCoursesAndRank } = require("./dataService");  // NEW: single point for fetching + scoring

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const upload = multer({ dest: "uploads/" });

//
// ---------- API Endpoints ----------
//
app.post("/api/recommend", upload.single("resume"), async (req, res) => {
  try {
    const { goal } = req.body;

    // 1. Extract text from uploaded resume (PDF → raw text)
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // 2. Send resume text → Python NER service
    const nerResponse = await axios.post("http://localhost:8000/ner", {
      text: text,
    });

    const userProfile = nerResponse.data || {};
    const extractedSkills = userProfile.skills || [];

    // 3. Fetch + rank courses (delegates to dataService.js)
    const recommendations = await getCoursesAndRank(extractedSkills, goal, userProfile);

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

// Health check
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () =>
  console.log(`✅ Node backend running on http://localhost:${PORT}`)
);