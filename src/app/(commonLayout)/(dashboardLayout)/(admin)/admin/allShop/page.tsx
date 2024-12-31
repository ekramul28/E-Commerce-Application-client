"use client";
import {
  useDeleteShopMutation,
  useGetAllShopQuery,
  useUpdateShopMutation,
} from "@/redux/fetures/Shop/shopApi";
import Image from "next/image";
import React, { useState } from "react";
import { FaTrash, FaLock, FaUnlock } from "react-icons/fa";

const AllShop = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filterStatus, setFilterStatus] = useState<string>(""); // State for block/unblock filter
  const [sortOrder, setSortOrder] = useState<string>("new-to-old"); // State for sorting
  const queryParams = [
    { name: "searchTerm", value: searchTerm },
    { name: "filter", value: filterStatus },
  ];

  const { data, error, isLoading } = useGetAllShopQuery(queryParams);
  const [updateShop] = useUpdateShopMutation();
  const [deleteShop] = useDeleteShopMutation();

  const shops = data?.data?.data || [];

  const toggleBlockShop = async (id: string, isBlocked: boolean) => {
    try {
      await updateShop({ id, isBlocked: !isBlocked });
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  const handleDeleteShop = async (id: string) => {
    try {
      await deleteShop(id);
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">All Shops</h2>
      </header>

      {/* Search and Filters */}
      <div className="my-4 flex  gap-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
          placeholder="Search shops by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Shops</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
        <select
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="new-to-old">New to Old</option>
          <option value="old-to-new">Old to New</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && <div>Loading...</div>}

      {/* Error State */}
      {error && <div>Error loading shops</div>}

      {/* Shops Table */}
      {!isLoading && shops.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 p-3">Image</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Vendor</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop: any) => (
                <tr key={shop.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-3">
                    <Image
                      height={40}
                      width={40}
                      src={shop.logo || "/placeholder.png"}
                      alt="Logo"
                      className="h-12 rounded-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-3">{shop.name}</td>
                  <td className="border border-gray-300 p-3">
                    {shop.vendor?.name}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        shop.isBlocked
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {shop.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 flex items-center"
                      onClick={() => toggleBlockShop(shop.id, shop.isBlocked)}
                    >
                      {shop.isBlocked ? <FaUnlock /> : <FaLock />}{" "}
                      <span className="ml-1">
                        {shop.isBlocked ? "Unblock" : "Block"}
                      </span>
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                      onClick={() => handleDeleteShop(shop.id)}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && shops.length === 0 && (
        <div className="text-center text-gray-500">No shops found.</div>
      )}
    </div>
  );
};

export default AllShop;
