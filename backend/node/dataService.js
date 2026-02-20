const fs = require("fs");
const path = require("path");
const NodeCache = require("node-cache");

// Initialize cache with 10-minute TTL (600 seconds)
const courseCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// Remove duplicate courses
const { dedupeCourses } = require("./utils/dedupe");

// Import modular fetchers
const { fetchUdemyCourses } = require("./fetchers/udemy");
const { fetchCourseraCourses } = require("./fetchers/coursera");
const { fetchYouTubeCourses } = require("./fetchers/youtube");

// Path to fallback JSON
const COURSES_JSON = path.join(__dirname, "courses.json");

//
// ---------- Helpers ----------
function normalizeCourse(course, platform) {
  const rawPrice = course.price || "Free";
  let numericPrice = 0;

  if (rawPrice && typeof rawPrice === "string") {
    if (/free/i.test(rawPrice)) {
      numericPrice = 0;
    } else {
      const match = rawPrice.match(/[\d\.]+/); // extract first number like $49.99
      numericPrice = match ? parseFloat(match[0]) : 0;
    }
  }

  return {
    title: course.title || "Untitled",
    platform: platform || "Unknown",
    price: rawPrice,          
    numericPrice,            
    skills: Array.isArray(course.skills) ? course.skills : [],
    level: course.level || "Beginner",
    link: course.link || "#",
  };
}

// Normalize skills
function normalizeSkills(arr) {
  return Array.from(
    new Set((arr || []).map((s) => (s || "").toString().toLowerCase()))
  );
}

function safeLen(arr) {
  return arr && Array.isArray(arr) && arr.length ? arr.length : 1;
}

// ---------- Metrics + Scoring ----------
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

  // --- Adjust scoring with Experience & Degree ---
  let experienceBonus = 0;
  let degreeBonus = 0;

  // Experience adjustment
  if (userProfile.experience_years && userProfile.experience_years.length > 0) {
    const expText = userProfile.experience_years.join(" ").toLowerCase();
    const yearsMatch = expText.match(/(\d+)/);
    if (yearsMatch) {
      const years = parseInt(yearsMatch[1]);
      if (years >= 3) experienceBonus = 0.1;
      else if (years < 1) experienceBonus = -0.05;
    }
  }

  // Degree adjustment
  if (userProfile.degrees && userProfile.degrees.length > 0) {
    const deg = userProfile.degrees.join(" ").toLowerCase();
    if (deg.includes("phd") || deg.includes("master") || deg.includes("m.tech")) {
      degreeBonus = 0.1;
    } else if (deg.includes("b.tech") || deg.includes("bachelor")) {
      degreeBonus = 0.05;
    }
  }

  score += experienceBonus + degreeBonus;
  score += priceBonus(course);
  score = Math.max(0, Math.min(1, score));

  // Explanation text for UI
  const explanation = [];
  if (metrics.intersectionCount > 0) explanation.push(`Matches ${metrics.intersectionCount} existing skill(s)`);
  if (metrics.newCount > 0) explanation.push(`Teaches ${metrics.newCount} new skill(s)`);
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
    numericPrice: c.numericPrice,
    skills: c.skills,
    score: s.scorePct,
    explanation: s.explanation,
    thumbnail: c.thumbnail || null,   
    channel: c.channel || "",         
    description: c.description || ""  
  }));
}


// ---------- Local Fallback ----------
function getCoursesFromJSON() {
  try {
    const data = fs.readFileSync(COURSES_JSON, "utf-8");
    return JSON.parse(data).map((c) => normalizeCourse(c, c.platform || "Local"));
  } catch (err) {
    console.error("❌ Error loading local courses:", err);
    return [];
  }
}

//
// ---------- Main Interface ----------
async function getCourses(source = "json", query = "python") {
  if (source === "json") return getCoursesFromJSON();
  if (source === "udemy") return await fetchUdemyCourses(query);
  if (source === "coursera") return await fetchCourseraCourses(query);
  if (source === "youtube") return await fetchYouTubeCourses(query);

  // ✅ Hybrid: JSON + Udemy + Coursera + YouTube
  const local = getCoursesFromJSON();
  const udemy = await fetchUdemyCourses(query);
  const coursera = await fetchCourseraCourses(query);
  const youtube = await fetchYouTubeCourses(query);

  return [...local, ...udemy, ...coursera, ...youtube];
}

// Cached hybrid course fetching to reduce API calls
async function getHybridCourses(query) {
  const cacheKey = `hybrid_${query}`;

  // Check cache first
  const cached = courseCache.get(cacheKey);
  if (cached) {
    return cached;
  }



  // Fetch from all sources in parallel
  console.log("👉 Fetching from all sources...");
  const [local, udemy, coursera, youtube] = await Promise.all([
    Promise.resolve(getCoursesFromJSON()),
    fetchUdemyCourses(query).then(res => { console.log(`✅ Udemy: ${res.length}`); return res; }),
    fetchCourseraCourses(query).then(res => { console.log(`✅ Coursera: ${res.length}`); return res; }),
    fetchYouTubeCourses(query).then(res => { console.log(`✅ YouTube: ${res.length}`); return res; })
  ]);

  const allCourses = [...local, ...udemy, ...coursera, ...youtube];
  console.log(`✅ Total courses found: ${allCourses.length}`);

  // Cache the result
  courseCache.set(cacheKey, allCourses);

  return allCourses;
}

/**
 * Public API exposed to server.js
 * Handles fetching + ranking with caching optimization
 */
async function getCoursesAndRank(userSkills, goal, userProfile) {
  const primarySkill = userSkills.length > 0 ? userSkills[0] : "programming";

  // Use cached hybrid fetching
  let allCourses = await getHybridCourses(primarySkill);

  allCourses = dedupeCourses(allCourses);

  const ranked = rankCourses(allCourses, userSkills, goal, userProfile, 30);

  return ranked;
}

module.exports = { getCoursesAndRank };