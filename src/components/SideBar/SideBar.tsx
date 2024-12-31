"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Profile from "../Profile/Profile";
import { SidebarOptions } from "./SidebarOptions";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { adminLinks, userLinks, vendorLinks } from "./constants";

const SideBar = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col h-screen">
      {/* Logo Section */}
      <div className="px-4 py-6">
        <span className="grid h-10 w-32 place-content-center rounded-lg text-xs text-gray-600">
          <div className="h-12 mt-4 ml-3">
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
      </div>

      {/* Sidebar Options */}
      <ul className="mt-6 space-y-1 px-4 flex-grow">
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

      {/* Profile Section */}
      <div className="py-6 border-t border-gray-200">
        <Profile />
      </div>
    </div>
  );
};

export default SideBar;
