import { chooseData } from "@/assets/ChooseData";
import Image from "next/image";
import React from "react";

const WhyChoose = () => {
  return (
    <section className=" py-10 px-6">
      <header className="text-center mb-6">
        <h1 className="text-[26px] font-semibold">Why Choose Us?</h1>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chooseData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-xl hover:shadow-lg transition-shadow"
          >
            <Image
              src={item?.image}
              alt={item?.title || "Feature Image"}
              height={130}
              width={130}
              priority
              className="mb-4"
            />
            <h2 className="text-[20px] font-bold mb-2">{item?.title}</h2>
            <p className="text-sm text-slate-500">{item?.subTitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
