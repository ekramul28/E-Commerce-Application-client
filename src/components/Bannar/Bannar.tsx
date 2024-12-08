"use client";
import React from "react";
import Image from "next/image";
import SearchField from "./SearchField";
import { useGetCategoryQuery } from "@/redux/fetures/Category/categoryApi";
import { useRouter, useSearchParams } from "next/navigation";

const Banner: React.FC = () => {
  const { data } = useGetCategoryQuery(undefined);
  const router = useRouter();
  const handelCategory = (category: string) => {
    router.push(`/products?${category}`);
  };
  return (
    <div className="mt-48">
      <div className="mx-auto ">
        {" "}
        <SearchField />
      </div>
      <div className="flex justify-center flex-wrap gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap mb-2 ">
        {data?.data.map((item, index) => (
          <div
            key={index}
            className="max-w-sm rounded  border-2 w-36  hover:shadow-2xl hover:cursor-pointer px-2 transition-transform transform hover:scale-105 "
            onClick={() => handelCategory(`categoryId=${item.id}`)}
          >
            <div className=" h-20 w-32 rounded-xl ">
              <Image
                // src={item?.backgroundImage}
                src={item?.image}
                alt="ok"
                height={100}
                width={130}
                priority
                className="py-2 h-24 w-full "
              />
            </div>
            <div className="text-center  ">
              <p className=" text-base  font-medium py-2 text-wrap">
                {item?.name}
              </p>
              <p className="lg:text-sm text-xs font-semibold text-[#F47779]">
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
