/**
 * Deduplicate courses by title + platform (case-insensitive).
 * If the same title appears across multiple platforms,
 * prefer the first occurrence.
 */
function dedupeCourses(courses) {
  const seen = new Set();

  return courses.filter((course) => {
    const key = (course.title + "|" + course.platform).toLowerCase().trim();
    if (seen.has(key)) {
      return false; // duplicate, remove
    }
    seen.add(key);
    return true;
  });
}

module.exports = { dedupeCourses };