"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TopLevelBanner = () => {
  const [timeLeft, setTimeLeft] = useState<number>(86400); // 24 hours in seconds (example countdown)
  const router = useRouter();

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format countdown timer as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      className="bg-white text-black py-6 px-8 sm:px-12  rounded-lg"
      style={{
        backgroundImage: 'url("/path-to-banner-image.jpg")', // Replace with your banner image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Banner Text */}
        <div className="flex flex-col space-y-4 lg:space-y-6 col-span-1">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            🎉 Mega Sale: 30% off on all products!
          </h1>
          <p className="text-lg text-gray-700">
            Limited Time Offer – Free Shipping on Orders Over $50.
          </p>
          <p className="text-xs text-gray-500">Hurry, offer ends in:</p>
          <div className="text-3xl font-bold text-orange-500">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Center Section: Featured Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 col-span-2 lg:col-span-1">
          <div
            className="bg-gray-100 p-6 rounded-xl shadow-md max-w-xs text-center"
            style={{
              backgroundImage: 'url("/path-to-card-image1.jpg")', // Replace with your category image
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Electronics
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Explore the latest in electronics – laptops, phones, and more!
            </p>
            <button
              onClick={() => router.push("/category/electronics")}
              className="bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-md"
            >
              Shop Electronics
            </button>
          </div>

          <div
            className="bg-gray-100 p-6 rounded-xl shadow-md max-w-xs text-center"
            style={{
              backgroundImage: 'url("/path-to-card-image2.jpg")', // Replace with your category image
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Clothing
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Browse our latest collection of stylish clothing for all seasons!
            </p>
            <button
              onClick={() => router.push("/category/clothing")}
              className="bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-md"
            >
              Shop Clothing
            </button>
          </div>
        </div>

        {/* Right Section: Shop All Products Button in Card and New Arrivals */}
        <div className="flex flex-col items-center sm:items-start space-y-6 col-span-1 lg:col-span-1">
          {/* Shop All Products Card */}
          <div
            className="bg-gray-100 p-6 rounded-xl shadow-md text-center w-full"
            style={{
              backgroundImage: 'url("/path-to-card-image3.jpg")', // Replace with your image
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Shop All Products
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Explore our entire range of products, from electronics to clothing
              and more!
            </p>
            <button
              onClick={() => router.push("/all-products")}
              className="bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-md"
            >
              Shop Now
            </button>
          </div>

          {/* New Arrivals Section */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center w-full">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              New Arrivals
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Discover the latest additions to our collection, featuring fresh
              styles.
            </p>
            <button
              onClick={() => router.push("/new-arrivals")}
              className="bg-orange-500 text-white py-2 px-4 rounded-xl  transition-all duration-300 shadow-md"
            >
              Explore New Arrivals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLevelBanner;
