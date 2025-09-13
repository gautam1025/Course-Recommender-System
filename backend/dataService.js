const fs = require("fs");
const path = require("path");

// 🔹 For now, load courses from JSON
function getCoursesFromJSON() {
  const data = fs.readFileSync(path.join(__dirname, "courses.json"), "utf-8");
  return JSON.parse(data);
}

// 🔹 Placeholder: MongoDB implementation
async function getCoursesFromDB() {
  // Example Mongo query (if you connect in future)
  // return await Course.find({});
  return []; // currently empty
}

// 🔹 Export a single interface
async function getCourses(source = "json") {
  if (source === "db") {
    return await getCoursesFromDB();
  } else {
    return getCoursesFromJSON();
  }
}

module.exports = { getCourses };
