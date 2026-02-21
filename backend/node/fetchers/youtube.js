const axios = require("axios");
require("dotenv").config();

async function fetchYouTubeCourses(query) {
  try {
    if (!process.env.YOUTUBE_API_KEY) return [];

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
      query + " tutorial"
    )}&maxResults=8&key=${process.env.YOUTUBE_API_KEY}`;

    const res = await axios.get(url);

    return res.data.items.map((item) => ({
      title: item.snippet.title,
      platform: "YouTube",
      price: "Free",
      skills: [query],
      level: "Beginner",
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails?.medium?.url || "",
      channel: item.snippet.channelTitle || "Unknown Channel",
      description: item.snippet.description || "",
    }));
  } catch {
    return [];
  }
}

module.exports = { fetchYouTubeCourses };