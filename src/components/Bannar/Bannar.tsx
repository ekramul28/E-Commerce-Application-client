"use client";
import React from "react";
import Image from "next/image";
import SearchField from "./SearchField";
import { useRouter } from "next/navigation";
import { ICategory } from "@/assets/AllType";
import { useGetCategoryQuery } from "@/redux/fetures/Category/categoryApi";

const Banner: React.FC = () => {
  const { data } = useGetCategoryQuery(undefined); // Fetch categories data from the API
  const router = useRouter();

  // Handle category click and navigate to the product page
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?categoryId=${categoryId}`);
  };

  return (
    <div className="mt-40">
      {/* Search Field */}
      <div className="mx-auto mb-6">
        <SearchField />
      </div>

      {/* Category Filter Header */}
      <div className="text-center mb-4">
        <p className="text-xl font-semibold text-gray-700">
          Filter by Category
        </p>
      </div>

      {/* Category List */}
      <div className="flex justify-center flex-wrap gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
        {data?.data.map((item: ICategory, index: number) => (
          <div
            key={index}
            className="max-w-sm w-48 rounded-xl border-2 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer px-2 py-4"
            onClick={() => handleCategoryClick(item.id)}
          >
            {/* Category Image */}
            <div className="h-24 w-32 mb-4 rounded-lg overflow-hidden mx-auto">
              <Image
                src={item?.image || "/default-category-image.jpg"} // Default image fallback
                alt={item?.name || "Category Image"}
                width={130}
                height={100}
                priority
                className="object-cover w-full h-full "
              />
            </div>

            {/* Category Text */}
            <div className="text-center">
              <p className="text-base font-medium text-gray-800 mb-2 overflow-hidden">
                {item?.name}
              </p>
              <p className="text-sm font-semibold text-[#F47779]">
                FLAT {item?.offer}% OFF
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
