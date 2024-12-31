"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa"; // React icons
import { useGetCategoryQuery } from "@/redux/fetures/Category/categoryApi";
import { ICategory } from "@/assets/AllType";
import Image from "next/image";

const NavLinkBar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: categoryData } = useGetCategoryQuery(undefined);

  const pages = [
    { nav: "Home", route: "/" },
    { nav: "Product", route: "/product" },
    { nav: "Shops", route: "/shoppage" },
    { nav: "ShopReport", route: "/healthcare" },
    {
      nav: "Category",
      route: "",
      megaMenu: categoryData?.data?.map((category: ICategory) => ({
        label: category.name,
        icon: category.image, // Image URL for the category
        links: [
          {
            name: `${category.name}`,
            route: `/products?categoryId=${category.id}`,
          },
        ],
      })),
    },
    { nav: "Blogs", route: "/healthblogs" },
  ];

  const handleNavigation = (route: string) => {
    if (route) router.push(route);
  };

  return (
    <nav className="bg-white shadow-md p-2 border-t-2">
      <div className="container mx-auto flex justify-center items-center font-medium text-base">
        <ul className="flex gap-4">
          {pages.map((page) => (
            <li
              key={page.nav}
              className="relative group"
              onMouseEnter={() => page.megaMenu && setOpenMenu(page.nav)}
              onMouseLeave={() => page.megaMenu && setOpenMenu(null)}
            >
              <button
                className={`px-4 py-2 flex items-center gap-2 ${
                  pathname === page.route ? "text-blue-500" : "text-black"
                }`}
                onClick={() => handleNavigation(page.route)}
              >
                {page.nav}
                {page.nav === "Category" && (
                  <span className="text-lg">
                    {openMenu === "Category" ? <FaCaretUp /> : <FaCaretDown />}
                  </span>
                )}
              </button>
              {page.megaMenu && openMenu === page.nav && (
                <div className="absolute left-0 top-6 mt-2 w-[400px] bg-white shadow-lg p-4 grid grid-cols-2 gap-4 z-50 rounded-lg border-t-2">
                  {page.megaMenu.map((category: any) => (
                    <div
                      key={category.label}
                      className="flex items-center gap-2"
                    >
                      {/* Category Image */}
                      <Image
                        height={20}
                        width={20}
                        src={category.icon}
                        alt={`${category.label} Icon`}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      {/* Category Links */}
                      <ul>
                        {category.links.map((link: any) => (
                          <li key={link.name}>
                            <button
                              className="font-semibold mb-2 hover:text-blue-500 flex items-center gap-2"
                              onClick={() => handleNavigation(link.route)}
                            >
                              {link.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinkBar;
