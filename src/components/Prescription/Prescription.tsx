import Image from "next/image";
import React from "react";

const Prescription = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-8 h-60 w-full">
      <div className="flex items-center bg-[#EEF4FF] ">
        <div className="flex gap-4 items-center">
          <div>
            <Image
              src="https://i.ibb.co/HNxhH1N/rx-upload.jpg"
              alt="Thyrocare Image"
              layout="responsive"
              width={150}
              height={150}
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Order with Prescription</h1>
            <p className="font-normal text-sm py-4">
              Upload prescription and we will deliver your medicines
            </p>
            <button className="flex items-center gap-2 my-2  bg-black rounded px-6 py-2 text-sm font-bold uppercase  text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">
              <svg
                width={24}
                height={24}
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                ></path>
              </svg>
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="  md:pt-14   ">
        <h1 className="font-semibold text-sm pb-2">How to Work?</h1>
        <div className="flex gap-3  ">
          <div className="">
            <div className="flex gap-2  pb-4">
              <span className="py-1 px-3 rounded-lg bg-[#EEF4FF] font-semibold text-base">
                1
              </span>
              <p className="font-normal text-sm">
                Upload a photo of your prescription
              </p>
            </div>
            <div className="flex gap-2 items-center ">
              <span className="py-1 px-3 rounded-lg bg-[#EEF4FF] font-semibold text-base">
                2
              </span>
              <span className="font-normal text-sm">
                Add delivery address and place the order
              </span>
            </div>
          </div>
          <div>
            <div className="flex gap-2 items-center pb-4">
              <span className="py-1 px-3 rounded-lg bg-[#EEF4FF] font-semibold text-base">
                3
              </span>
              <span className="font-normal text-sm">
                We will call you to confirm the medicines
              </span>
            </div>
            <div className="flex gap-2 items-center ">
              <span className="py-1 px-3 rounded-lg bg-[#EEF4FF] font-semibold text-base">
                4
              </span>
              <p className="font-normal text-sm">
                Now, sit back! Your medicines will get delivered at your
                doorstep
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
