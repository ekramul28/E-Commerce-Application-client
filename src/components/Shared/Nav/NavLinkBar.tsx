"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const NavLinkBar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pages = [
    { nav: "Home", route: "/" },
    { nav: "Product", route: "/product" },
    {
      nav: "ShopReport",
      route: "/healthcare",
    },
    {
      nav: "details",
      route: "",
      megaMenu: [
        { label: "Category 1", links: [{ name: "Link 1", route: "/link1" }] },
        {
          label: "Category 2",
          links: [
            { name: "Link 2", route: "/link2" },
            { name: "Link 3", route: "/link3" },
          ],
        },
      ],
    },
    { nav: "Blogs", route: "/healthblogs" },
  ];

  const handleNavigation = (route: string) => {
    if (route) router.push(route);
  };

  return (
    <nav className="bg-white shadow-md p-4 border-t-2">
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
                className={`px-4 py-2 ${
                  pathname === page.route ? "text-blue-500" : "text-black"
                }`}
                onClick={() => handleNavigation(page.route)}
              >
                {page.nav}
              </button>
              {page.megaMenu && openMenu === page.nav && (
                <div className="absolute left-0 top-6 mt-2 w-72 bg-white shadow-lg p-4 grid grid-cols-2 gap-4 z-10">
                  {page.megaMenu.map((category) => (
                    <div key={category.label}>
                      <h3 className="font-semibold mb-2">{category.label}</h3>
                      <ul>
                        {category.links.map((link) => (
                          <li key={link.name}>
                            <button
                              className="text-gray-600 hover:text-blue-500"
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
