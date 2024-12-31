"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type LinkItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  const pathname = usePathname(); // To get the current active route

  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-3  w-full rounded-md px-3 py-2 transition-colors duration-300 
            ${
              pathname === link.href
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
        >
          <span className="text-xl">{link.icon}</span> {/* Render icon */}
          <span>{link.label}</span> {/* Render label */}
        </Link>
      ))}
    </div>
  );
};
