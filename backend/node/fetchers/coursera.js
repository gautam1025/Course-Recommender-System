const axios = require("axios");

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
      price: "Varies",
      skills: [query],
      level: "Beginner",
      link: `https://www.coursera.org/learn/${course.slug}`,
    }));
  } catch {
    return [];
  }
}

module.exports = { fetchCourseraCourses };