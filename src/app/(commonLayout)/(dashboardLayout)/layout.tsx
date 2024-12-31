"use client";
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import SideBar from "@/components/SideBar/SideBar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar and navigate to the given link

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar: Visible only on lg and larger screens */}
      {/* <div
        className={` w-64 bg-slate-50 text-black fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } hidden md:block z-50`}
      >
        <SideBar />
      </div> */}

      <div
        className={`w-64 bg-gray-200   fixed top-0 left-0 h-full hidden lg:block 
        `}
      >
        <SideBar />
      </div>

      {/* Overlay: Appears when sidebar is open */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden md:hidden"
          onClick={toggleSidebar} // Close the sidebar when clicked
        />
      )} */}

      {/* Main Content */}
      <div className="lg:flex-1 lg:ml-64 lg:p-6 overflow-auto">
        {/* Button to toggle sidebar visibility on small and medium screens */}
        <div className="top-4 right-4 z-50 fixed sm:block md:block lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-700 rounded-md bg-gray-800 hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-white"
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

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow-lg p-4 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
