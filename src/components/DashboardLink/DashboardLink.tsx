"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

const DashboardLink = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const pages = [
    { nav: "User", route: "/user" },
    { nav: "Medicine", route: "/medicine" },
    { nav: "Lab Tests", route: "/labtests" },
  ];
  return (
    <div>
      <div className="relative w-full">
        <div
          ref={navRef}
          className="flex md:justify-center items-center gap-4 border-t-2 font-medium text-base py-3 overflow-x-auto scrollbar-hide whitespace-nowrap"
        >
          {pages.map((page) => (
            <Link href={page.route} key={page.route}>
              <ul className="mt-6 space-y-1">
                <li className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {page.nav}
                </li>
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLink;
