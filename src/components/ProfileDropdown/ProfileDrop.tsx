import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProfileDropdown = ({
  image,
  role,
  handelLogout,
}: {
  image: string;
  role: string;
  handelLogout: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-9 h-9 md:w-14 md:h-14 rounded-full overflow-hidden focus:outline-none"
      >
        <Image
          src={
            image ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          }
          alt="Profile Image"
          layout="responsive"
          width={40}
          height={40}
          className="w-full h-full object-cover object-center"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
          {role === "ADMIN" ? (
            <div>
              <Link href={"/admin"}>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Dashboard
                </button>
              </Link>

              <Link href={"/profile"}>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </button>
              </Link>
            </div>
          ) : role === "VENDOR" ? (
            <div>
              <Link href={"/vendor"}>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Dashboard
                </button>
              </Link>
              <Link href={"/profile"}>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </button>
              </Link>
            </div>
          ) : (
            <Link href={"/customer"}>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Dashboard
              </button>
            </Link>
          )}
          <button
            onClick={handelLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
