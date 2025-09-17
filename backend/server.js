const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");

const { getCourses } = require("./dataService");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const mongoose_connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gautam4300_:Gautam4300_@mycluster1.clx35xg.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster1"
    );

    console.log("database connection successfull....");
  } catch (err) {
    console.error("error connecting to the database", err);
  }
};

mongoose_connection();

// Multer setup
const upload = multer({ dest: "uploads/" });

// Load skills list
const skillsList = JSON.parse(
  fs.readFileSync(path.join(__dirname, "skills.json"), "utf-8")
);

// API: Upload + Recommend
app.post("/api/recommend", upload.single("resume"), async (req, res) => {
  try {
    const { goal } = req.body;

    // Path of uploaded file
    const filePath = path.join(__dirname, req.file.path);

    // Read and parse PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text.toLowerCase();

    // ✅ Delete file after parsing
    fs.unlinkSync(filePath);

    // Extract skills
    const extractedSkills = skillsList.filter((skill) => {
      const safeSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${safeSkill}\\b`, "i");
      return regex.test(text);
    });

    // Load courses
    const courseDB = await getCourses("json");

    // Match courses
    const matchedCourses = courseDB.filter((course) =>
      course.skills.some((skill) =>
        extractedSkills.includes(skill.toLowerCase())
      )
    );

    res.json({
      message: "Resume parsed successfully",
      skills: extractedSkills,
      goal,
      recommendations: matchedCourses,
    });
  } catch (err) {
    console.error("❌ Error parsing resume:", err);

    // Clean up uploaded file in case of error
    if (req.file) {
      const filePath = path.join(__dirname, req.file.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
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
