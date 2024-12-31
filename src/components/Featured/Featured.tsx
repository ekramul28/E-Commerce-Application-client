"use client";
import { FeaturedData } from "@/assets/FeaturedData";
import Image from "next/image";
import React, { useState, useRef } from "react";

const Featured = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const cardWidth = 270;
  const cardsPerView = 3;
  const maxScrollIndex = Math.max(0, FeaturedData.length - cardsPerView);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    setScrollIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      scrollToIndex(newIndex);
      return newIndex;
    });
  };

  const scrollRight = () => {
    setScrollIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, maxScrollIndex);
      scrollToIndex(newIndex);
      return newIndex;
    });
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const newIndex = Math.round(containerRef.current.scrollLeft / cardWidth);
      setScrollIndex(newIndex);
    }
  };

  return (
    <div className="overflow-hidden my-8">
      <header className="mb-4">
        <h1 className="font-semibold text-2xl">Featured Brands</h1>
        <p className="font-normal text-base text-gray-600">
          Pick from our favorite brands
        </p>
      </header>

      <div className="relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:shadow-md z-10"
          onClick={scrollLeft}
          aria-label="Scroll Left"
        >
          &lt;
        </button>

        <div
          className="flex gap-4 overflow-hidden"
          ref={containerRef}
          onScroll={handleScroll}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {FeaturedData.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 rounded-xl border overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              style={{ minWidth: `${cardWidth}px` }}
            >
              <Image
                src={category?.image}
                alt={category?.title}
                layout="responsive"
                width={100}
                height={100}
              />
              <p className="text-center text-base font-normal mt-2">
                {category.title}
              </p>
            </div>
          ))}
        </div>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:shadow-md z-10"
          onClick={scrollRight}
          aria-label="Scroll Right"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Featured;
