"use client";

import GoTop from "@/components/GoTop/GoTop";
import { useGetAllUserQuery } from "@/redux/fetures/user/userApi";
import useDebounce from "@/utils/useDebounce";
import Image from "next/image";
import React, { useState } from "react";

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 3000);

  const params = [
    { name: "searchTerm", value: debouncedSearchTerm },
    { name: "role", value: roleFilter },
  ];

  const { data } = useGetAllUserQuery(params);
  const users = data?.data || [];
  console.log(users);

  // State for search and filter

  return (
    <div className="mt-20 md:mt-2 w-full h-full">
      {/* Search and Filter Section */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="CUSTOMER">Customer</option>
          <option value="VENDOR">Vendor</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Role
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Contact Number
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users?.length > 0 ? (
              users?.map((user: any) => {
                const userDetails =
                  user.customer || user.admin || user.vendor || {};
                return (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-4 py-2">
                      <div className="relative w-10 h-10">
                        <Image
                          src={
                            userDetails?.profilePhoto ||
                            "https://via.placeholder.com/150"
                          }
                          alt={userDetails?.name || "User"}
                          className="rounded-full"
                          width={40}
                          height={40}
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {userDetails?.name || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {user?.email || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {user?.role || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {userDetails?.contactNumber || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        className={`block w-full px-4 py-2 ${
                          user?.status === "BLOCKED" && "bg-red-500"
                        } ${
                          user?.status === "DELETED" && "bg-lime-600-500"
                        } bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700`}
                      >
                        {user?.status}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <GoTop></GoTop>
    </div>
  );
};

export default UserPage;
