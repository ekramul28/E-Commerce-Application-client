import Container from "@/components/Container/Container";
import Image from "next/image";
import React from "react";

const HealthBlogs = () => {
  return (
    <Container>
      <div className="mt-36 grid md:grid-cols-2 gap-2">
        <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
          <div className="flex items-start sm:gap-8">
            <div
              className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
              aria-hidden="true"
            >
              <div className="rounded-full overflow-hidden w-24 h-24 z-20">
                <Image
                  src="https://i.ibb.co/nkgj5bH/istockphoto-943974286-612x612.jpg"
                  alt="Thyrocare Image"
                  layout="responsive"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div>
              <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                Episode #1
              </strong>

              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                <a href="#" className="hover:underline">
                  {" "}
                  Understanding Over-the-Counter (OTC) Medications{" "}
                </a>
              </h3>

              <p className="mt-1 text-sm text-gray-700">
                This blog will provide a comprehensive guide to over-the-counter
                (OTC) medications, which are easily accessible but often
                misunderstood. The post will explain the differences between OTC
                and prescription drugs, focusing on their safety, effectiveness,
                and proper use. It will cover popular OTC categories, such as
                pain relievers, cold and flu remedies,
              </p>

              <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                <div className="flex items-center gap-1 text-gray-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>

                  <p className="text-xs font-medium">48:32 minutes</p>
                </div>

                <span className="hidden sm:block" aria-hidden="true">
                  &middot;
                </span>

                <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                  Featuring{" "}
                  <a href="#" className="underline hover:text-gray-700">
                    Barry
                  </a>
                  ,
                  <a href="#" className="underline hover:text-gray-700">
                    Sandra
                  </a>{" "}
                  and
                  <a href="#" className="underline hover:text-gray-700">
                    August
                  </a>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Container>
  );
};

export default HealthBlogs;
