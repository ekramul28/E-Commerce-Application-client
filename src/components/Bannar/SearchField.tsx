"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BannerSection = () => {
  const route = useRouter();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("search")?.toString() || "";
    route.push(`products?searchTerm=${searchTerm}`);
  };

  return (
    <div
      className="relative w-full h-96 bg-cover bg-center bg-no-repeat text-white px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center"
      style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-700 opacity-50 rounded-lg"></div>

      {/* Main Content */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Find Your Perfect Product Today!
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Explore a wide range of products with amazing deals. Search now!
        </p>

        {/* Call to Action - Shop Now */}
        <button
          onClick={() => route.push("/products")}
          className="bg-white text-teal-700 font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out hover:bg-teal-600 hover:text-white"
        >
          Shop Now
        </button>

        {/* Search Form */}
        <div className="mt-8 w-full max-w-lg mx-auto">
          <form
            className="flex items-center bg-white rounded-full shadow-md overflow-hidden"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              name="search"
              placeholder="Search for products..."
              className="w-full py-3 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white py-3 px-6 rounded-full hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
