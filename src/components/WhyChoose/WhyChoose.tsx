import { chooseData } from "@/assets/ChooseData";
import Image from "next/image";
import React from "react";

const WhyChoose = () => {
  return (
    <div className="bg-[#F8F9FF] p-6">
      <h1 className="font-semibold text-[26px] mb-2">Why Choose Us?</h1>
      <div>
        <div className="md:flex gap-4">
          {chooseData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 justify-center items-center"
            >
              <div className="flex justify-center items-center">
                <div>
                  <Image
                    src={item?.image}
                    alt="ok"
                    height={130}
                    width={130}
                    priority
                    className="py-2 "
                  />
                </div>
                <div>
                  <h1 className="font-bold md:text-[18px] text-[26px]">
                    {item?.title}
                  </h1>
                  <p className="font-normal text-sm text-slate-500">
                    {item?.subTitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
