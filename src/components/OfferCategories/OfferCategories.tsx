"use client";
import { offer } from "@/assets/OfferData";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import React Icons

const OfferCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 3000;

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 6 ? 0 : prevIndex + 1));
    }, slideInterval);

    return () => clearInterval(interval);
  }, [offer?.length]);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? offer.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === offer.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden my-8">
      <div className="overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {offer.map((data, index) => (
            <div
              key={index}
              className="md:w-[700px] w-full h-full flex-shrink-0 relative"
            >
              <Image
                src={data.image}
                alt="healthtitle"
                layout="responsive"
                width={700}
                height={200}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left and Right Navigation Buttons */}
      <button
        onClick={goToPreviousSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 bg-black text-white rounded-full shadow-lg hover:bg-orange-500 hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <FaArrowLeft className="text-2xl" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 bg-black text-white rounded-full shadow-lg hover:bg-orange-500 hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <FaArrowRight className="text-2xl" />
      </button>
    </div>
  );
};

export default OfferCategories;
