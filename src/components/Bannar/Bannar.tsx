import React from "react";
import Image from "next/image";
import SearchField from "./SearchField";
import { items } from "@/assets/BannerData";

const Banner: React.FC = () => {
  return (
    <div className="mt-48">
      <div className="mx-auto">
        {" "}
        <SearchField />
      </div>
      <div className="flex justify-between  overflow-x-auto scrollbar-hide whitespace-nowrap mb-2 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="max-w-sm rounded  hover:shadow-lg px-2 transition-transform transform hover:scale-105 "
          >
            <div className=" h-28 w-32 rounded-xl ">
              <Image
                src={item?.backgroundImage}
                alt="ok"
                height={100}
                width={130}
                priority
                className="py-2 "
              />
            </div>
            <div className="text-center  ">
              <p className=" text-base font-medium py-2">{item?.title}</p>
              <p className="lg:text-sm text-xs font-semibold text-[#F47779]">
                {item?.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
