const axios = require("axios");

/**
 * Fetch Coursera courses via Public API
 * Docs: https://api.coursera.org/api/courses.v1?q=search&query=python
 */
async function fetchCourseraCourses(query = "python") {
  try {
    const res = await axios.get(
      `https://api.coursera.org/api/courses.v1?q=search&query=${encodeURIComponent(
        query
      )}&limit=10&fields=slug,name,courseType,partnerIds`
    );

    if (!res.data.elements) return [];

    return res.data.elements.map((course) => ({
      title: course.name,
      platform: "Coursera",
      price: "Varies", // Coursera doesn't expose price via API
      skills: [query],
      level: "Beginner", // Placeholder (could be enhanced via NLP later)
      link: `https://www.coursera.org/learn/${course.slug}`,
    }));
  } catch (err) {
    //console.error("❌ Coursera fetch failed:", err.message);
    return [];
  }
}

module.exports = { fetchCourseraCourses };