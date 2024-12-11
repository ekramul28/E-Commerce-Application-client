"use client";
import React, { useState, useEffect } from "react";

const GoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-36 md:flex">
      {/* Rest of your component */}
      <div className="lg:w-3/4">
        {/* Product Cards and other components */}

        {/* Go to Top Button */}
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700"
            title="Go to top"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default GoTop;
