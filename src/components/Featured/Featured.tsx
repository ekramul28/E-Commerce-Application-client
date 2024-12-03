"use client";
import { FeaturedData } from "@/assets/FeaturedData";
import Image from "next/image";
import React, { useState, useRef } from "react";

const Featured = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const cardWidth = 270;
  const cardsPerView = 3;
  const maxScrollIndex = Math.max(0, FeaturedData.length - cardsPerView);

  // Explicitly type the ref as a reference to an HTMLDivElement
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    setScrollIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: newIndex * cardWidth,
          behavior: "smooth",
        });
      }
      return newIndex;
    });
  };

  const scrollRight = () => {
    setScrollIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, maxScrollIndex);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: newIndex * cardWidth,
          behavior: "smooth",
        });
      }
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
    <div className="overflow-hidden my-8 ">
      <div>
        <h1 className="font-semibold text-[26px]">Featured Brands</h1>
        <p className="font-normal text-base py-2">
          Pick from our favourite brands
        </p>
      </div>

      <div className="relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={scrollLeft}
        >
          &lt;
        </button>
        <div
          className="flex gap-4 transition-transform duration-500 ease-out"
          ref={containerRef}
          onScroll={handleScroll}
          style={{
            transform: `translateX(-${scrollIndex * cardWidth}px)`,
          }}
        >
          {FeaturedData.map((categorie, index) => (
            <div key={index} style={{ minWidth: `${cardWidth}px` }}>
              <div className="rounded-xl border overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                <div className="rounded-xl h-full w-full flex justify-center items-center">
                  <Image
                    src={categorie?.image}
                    alt={categorie?.title}
                    layout="responsive"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div>
                <p className="text-base font-normal text-center mt-2">
                  {categorie.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={scrollRight}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Featured;
