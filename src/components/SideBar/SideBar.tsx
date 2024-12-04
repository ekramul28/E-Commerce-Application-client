"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Profile from "../Profile/Profile";
import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks, vendorLinks } from "./constants";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const user = {
    role: "VENDOR",
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
                links={
                  user?.role === "ADMIN"
                    ? adminLinks
                    : user?.role === "VENDOR"
                    ? vendorLinks
                    : userLinks
                }
              />
            </li>
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
