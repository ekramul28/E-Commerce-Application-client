"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Profile from "../Profile/Profile";
import { usePathname } from "next/navigation";
import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const user = {
    role: "USER",
  };
  return (
    <div>
      <div className="sm:hidden   ">
        <div className="h-12  mt-4 ml-3">
          <Link href={"/"}>
            <Image
              src="https://i.ibb.co/xzg7M5N/Thyrocare.webp"
              alt="Thyrocare Image"
              layout="responsive"
              width={500}
              height={300}
            />
          </Link>
        </div>
        <div className="top-4 right-4 z-50 fixed">
          <button onClick={toggleSidebar} className="p-2 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-50 transition-transform duration-300 ease-in-out sm:static sm:translate-x-0 sm:flex sm:h-screen sm:flex-col sm:justify-between border-e`}
      >
        <div className="px-4 py-6">
          <span className="grid h-10 w-32 place-content-center rounded-lg  text-xs text-gray-600">
            <div className="h-12  mt-4 ml-3">
              <Link href={"/"}>
                <Image
                  src="https://i.ibb.co/xzg7M5N/Thyrocare.webp"
                  alt="Thyrocare Image"
                  layout="responsive"
                  width={500}
                  height={300}
                />
              </Link>
            </div>
          </span>

          <ul className="mt-6 space-y-1">
            <li>
              <SidebarOptions
                links={user?.role === "USER" ? userLinks : adminLinks}
              />
            </li>
            {/* <li>
              <Link
                href="/user"
                className={` ${
                  pathname === "/user"
                    ? "text-blue-500 block rounded-lg px-4 py-2 text-sm font-medium  hover:bg-gray-100 hover:text-gray-700"
                    : " block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                User
              </Link>
            </li>

            <li>
              <Link
                href="/product"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Product
              </Link>
            </li>

            <li>
              <Link
                href="/addProduct"
                className={` ${
                  pathname === "/addProduct"
                    ? "text-blue-500 block rounded-lg px-4 py-2 text-sm font-medium  hover:bg-gray-100 hover:text-gray-700"
                    : " block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                addProduct
              </Link>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Profile</span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Details
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Security
                    </a>
                  </li>

                  <li>
                    <form action="#">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                      >
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link
                href="/dashboard"
                className={` ${
                  pathname === "/dashboard"
                    ? "text-blue-500 block rounded-lg px-4 py-2 text-sm font-medium  hover:bg-gray-100 hover:text-gray-700"
                    : " block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                Dashboard
              </Link>
            </li> */}
          </ul>
        </div>

        <Profile />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default SideBar;
