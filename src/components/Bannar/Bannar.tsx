"use client";
import React from "react";
import Image from "next/image";
import SearchField from "./SearchField";
import { useRouter } from "next/navigation";
import { ICategory } from "@/assets/AllType";
import { useGetCategoryQuery } from "@/redux/fetures/Category/categoryApi";

const DynamicCategory = () => {
  const { data, error, isLoading, isError, refetch } =
    useGetCategoryQuery(undefined); // Fetch categories data from the API
  const router = useRouter();

  // Handle category click and navigate to the product page
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?categoryId=${categoryId}`);
  };

  return (
    <div>
      {/* Category Filter Header */}
      <div className="text-center mb-4">
        <p className="text-2xl font-semibold text-gray-800">
          Filter by Category
        </p>
      </div>

      {/* Error handling */}
      {isError && (
        <div className="text-center mb-4">
          <p className="text-red-600">There was an error loading categories.</p>
          <button
            onClick={refetch}
            className="px-4 py-2 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="text-center mb-4">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      )}

      {/* Category List */}
      {!isLoading && !isError && data?.data && (
        <div className="flex justify-center flex-wrap gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap">
          {data?.data.map((item: ICategory, index: number) => (
            <div
              key={index}
              className="max-w-xs w-56 rounded-2xl bg-white border-2 border-gray-200 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer px-4 py-6 relative group"
              onClick={() => handleCategoryClick(item.id)}
            >
              {/* Category Image */}
              <div className="h-28 w-40 mb-6 rounded-xl overflow-hidden mx-auto transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                <Image
                  src={item?.image || "/default-category-image.jpg"} // Default image fallback
                  alt={item?.name || "Category Image"}
                  width={160}
                  height={120}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Category Text */}
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {item?.name}
                </p>
                <p className="text-sm font-medium text-[#F47779]">
                  FLAT {item?.offer}% OFF
                </p>
              </div>

              {/* Hover Effect: Category Badge */}
              <div className="absolute top-0 right-0 mt-4 mr-4 bg-[#F47779] text-white text-xs font-semibold py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                New
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicCategory;
