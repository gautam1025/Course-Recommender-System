import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-4 text-sm text-white/80">
      © {new Date().getFullYear()} Career Recommender. All rights reserved.
    </footer>
  );
}
