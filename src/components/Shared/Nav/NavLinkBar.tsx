"use client";
import { TUser } from "@/app/redux/features/Auth/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const NavLinkBar = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const pages = [
    { nav: "Home", route: "/" },
    { nav: "Medicine", route: "/medicine" },
    { nav: "Healthcare", route: "/healthcare" },
    { nav: "Health Blogs", route: "/healthblogs" },
    { nav: "Offers", route: "/offers" },
  ];

  return (
    <div className="relative w-full">
      <div
        ref={navRef}
        className="flex md:justify-center items-center gap-4 border-t-2 font-medium text-base py-3 overflow-x-auto scrollbar-hide whitespace-nowrap"
      >
        {pages.map((page) => (
          <Link href={page.route} key={page.route}>
            <div
              className={`text-center px-4 ${
                pathname === page.route ? "text-blue-500" : "text-black"
              }`}
            >
              {page.nav}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinkBar;
