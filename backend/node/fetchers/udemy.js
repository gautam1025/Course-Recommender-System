const axios = require("axios");

/**
 * Fetch Udemy courses via API
 * Credentials: process.env.UDEMY_CLIENT_ID, process.env.UDEMY_CLIENT_SECRET
 */
async function fetchUdemyCourses(query = "python") {
  try {
    if (!process.env.UDEMY_CLIENT_ID || !process.env.UDEMY_CLIENT_SECRET) {
      //console.warn("⚠️ Missing Udemy API credentials in .env");
      return [];
    }

    const res = await axios.get(
      `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(
        query
      )}&page_size=10`,
      {
        auth: {
          username: process.env.UDEMY_CLIENT_ID,
          password: process.env.UDEMY_CLIENT_SECRET,
        },
      }
    );

    return res.data.results.map((c) => ({
      title: c.title,
      platform: "Udemy",
      price: c.price || "Paid",
      skills: [query],
      level: c.instructional_level || "Beginner",
      link: `https://www.udemy.com${c.url}`,
    }));
  } catch (err) {
    console.error("❌ Udemy fetch failed:", err.message);
    return [];
  }
}

module.exports = { fetchUdemyCourses };