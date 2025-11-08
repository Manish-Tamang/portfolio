"use client";

import { useState, useEffect } from "react";
import { FaSortUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 
        hidden md:flex
        items-center justify-center
        w-12 h-12
        rounded-full
        bg-[#38A662] hover:bg-[#2D8A4D]
        text-white
        shadow-lg
        transition-all duration-300
        z-50
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
      aria-label="Scroll to top"
    >
      <FaSortUp className="w-6 h-6 mt-2" />
    </button>
  );
}

