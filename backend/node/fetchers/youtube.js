const axios = require("axios");
require("dotenv").config();

/**
 * Fetch YouTube videos that match a given query (skill/topic).
 * 
 * @param {string} query - The course/skill keyword to search for.
 * @returns {Promise<Array>} - Normalized YouTube "course" list with thumbnails & channel.
 */

async function fetchYouTubeCourses(query) {
  try {
    console.log("🔑 YOUTUBE API KEY loaded:", process.env.YOUTUBE_API_KEY ? "YES" : "NO");
    if (!process.env.YOUTUBE_API_KEY) {
      console.warn("⚠️ Missing YouTube API key in .env");
      return [];
    }

    console.log(`👉 Fetching YouTube courses for: "${query}"`);

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
      query + " tutorial"
    )}&maxResults=8&key=${process.env.YOUTUBE_API_KEY}`;

    const res = await axios.get(url);

    console.log("✅ YouTube API raw items:", res.data.items?.length);

    return res.data.items.map((item) => ({
      title: item.snippet.title,
      platform: "YouTube",
      price: "Free",
      skills: [query],
      level: "Beginner",
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails?.medium?.url || "",  // ✅ NEW
      channel: item.snippet.channelTitle || "Unknown Channel", // ✅ NEW
      description: item.snippet.description || "",            // ✅ NEW
    }));
  } catch (err) {
    console.error("❌ YouTube fetch failed:", err.response?.data?.error?.message || err.message);
    return [];
  }
}

module.exports = { fetchYouTubeCourses };