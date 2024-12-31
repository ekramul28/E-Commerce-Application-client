import Image from "next/image";
import React from "react";

const Prescription = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 w-full">
      {/* Order with Prescription Section */}
      <div className="flex items-center bg-[#EEF4FF] p-4 rounded-lg">
        <div className="flex gap-4 items-center">
          <Image
            src="https://i.ibb.co/HNxhH1N/rx-upload.jpg"
            alt="Prescription Upload"
            width={150}
            height={150}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-lg font-semibold">Order with Prescription</h1>
            <p className="text-sm text-gray-700 py-3">
              Upload your prescription, and we will deliver your medicines.
            </p>
            <button className="flex items-center gap-2 bg-black text-white text-sm font-bold uppercase px-6 py-2 rounded-md hover:bg-teal-600 transition">
              <svg
                width={24}
                height={24}
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                ></path>
              </svg>
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* How to Work Section */}
      <div className="bg-white p-4 rounded-lg">
        <h1 className="text-lg font-semibold mb-4">How it Works?</h1>
        <div className="space-y-4">
          {[
            "Upload a photo of your prescription",
            "Add delivery address and place the order",
            "We will call you to confirm the medicines",
            "Now, sit back! Your medicines will be delivered to your doorstep",
          ].map((step, index) => (
            <div key={index} className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-8 h-8 bg-[#EEF4FF] text-base font-semibold rounded-lg">
                {index + 1}
              </span>
              <p className="text-sm text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prescription;
