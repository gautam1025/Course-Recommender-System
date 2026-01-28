import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-white/5 bg-[#0a0a0f]/50 backdrop-blur-md">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Career Recommender System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
