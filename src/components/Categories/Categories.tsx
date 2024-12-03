"use client";
import { categories } from "@/assets/categoriesData";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Categories = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const cardWidth = 270;
  const cardsPerView = 1;
  const maxScrollIndex = Math.max(0, categories.length - cardsPerView);

  const scrollLeft = () => {
    setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setScrollIndex((prevIndex) => Math.min(prevIndex + 1, maxScrollIndex));
  };

  return (
    <div className="overflow-hidden md:mt-0 mt-24">
      <h1 className="font-semibold text-[26px]">Shop by Categories</h1>

      <div className="relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white rounded-full p-2"
          onClick={scrollLeft}
        >
          &lt;
        </button>
        <div
          className="flex gap-4  transition-transform duration-500 ease-out "
          style={{
            transform: `translateX(-${scrollIndex * cardWidth}px)`,
          }}
        >
          {categories.map((categorie, index) => (
            <div key={index} style={{ minWidth: `${cardWidth}px` }}>
              <div className="rounded-xl border overflow-hidden shadow-lg hover:shadow-2xl px-2 transition-transform transform hover:scale-105 mt-2 md:mt-0">
                <div className="rounded-xl h-60  w-[220px] flex justify-center items-center">
                  <Image
                    src={categorie?.image}
                    alt={categorie?.title}
                    layout="responsive"
                    width={50}
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
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white rounded-full p-2"
          onClick={scrollRight}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Categories;
