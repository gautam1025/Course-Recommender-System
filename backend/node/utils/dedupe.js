
// Deduplicate courses within an array (same title/platform treated as duplicate)
function dedupeCourses(courses, seen = new Set()) {
  const unique = [];

  for (const c of courses) {
    const key = `${(c.title || "").toLowerCase()}-${(c.platform || "").toLowerCase()}`;

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(c);
    }
  }

  return unique;
}

module.exports = { dedupeCourses };