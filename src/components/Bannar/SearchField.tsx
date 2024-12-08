"use client";
import React from "react";
import Input from "../Shared/input/input";
import { useRouter } from "next/navigation";

const SearchField = () => {
  const route = useRouter();
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("search")?.toString() || "";
    console.log("Search Term:", searchTerm);

    route.push(`products?searchTerm=${searchTerm}`);
    // Add logic to handle search functionality
  };

  return (
    <div className="grid items-center mt-10 md:mt-16 lg:mt-20">
      <div className="h-full w-[90%] md:h-48 lg:h-52 md:w-[85%] lg:w-[80%] mx-auto">
        <p className="font-semibold text-[18px] md:text-[20px] lg:text-[24px] text-center lg:text-left">
          What are you looking for?
        </p>
        <p className="flex md:justify-end justify-center py-3 md:py-0 items-center font-medium text-xs md:text-sm lg:text-base gap-2 md:gap-3">
          <svg
            width={20}
            height={20}
            className="md:w-6 md:h-6 lg:w-8 lg:h-8"
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
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            ></path>
          </svg>
          Order with prescription.
          <span className="font-semibold text-[#0A534F]"> UPLOAD NOW </span>
        </p>
        <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end mt-5">
          <form className="w-full" onSubmit={(e) => handleSearchSubmit(e)}>
            <div className="border bg-white h-12 md:h-14 rounded-full p-2 flex items-center gap-2 sm:gap-4">
              <div className="relative w-full">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 z-40 text-gray-500"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  ></path>
                </svg>
                <Input
                  type="text"
                  name="search"
                  placeholder="Search for"
                  className="w-full h-10 rounded-full bg-white md:p-2 md:pl-10 border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                  aria-label="Search"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black rounded-full md:px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
