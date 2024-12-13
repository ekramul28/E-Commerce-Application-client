"use client";
import {
  useDeleteShopMutation,
  useGetAllShopQuery,
  useUpdateShopMutation,
} from "@/redux/fetures/Shop/shopApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const AllShop = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filterStatus, setFilterStatus] = useState<string>(""); // State for block/unblock filter
  const [sortOrder, setSortOrder] = useState<string>("new-to-old"); // State for sorting
  const Params = { searchTerm, filterStatus, sortOrder };

  const queryParams = [
    {
      name: "searchTerm",
      value: searchTerm,
    },
    {
      name: "filter",
      value: filterStatus,
    },
  ];
  const { data, error, isLoading } = useGetAllShopQuery(queryParams);
  const shops = data?.data?.data || [];
  console.log(shops);
  // Initialize mutation hooks
  const [updateShop] = useUpdateShopMutation();
  const [deleteShop] = useDeleteShopMutation();

  // Handle block/unblock using the mutation hook
  const toggleBlockShop = async (id: string, isBlocked: boolean) => {
    try {
      await updateShop({ id, isBlocked: !isBlocked }); // Using Redux mutation to update shop status
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  // Handle delete using the mutation hook
  const handleDeleteShop = async (id: string) => {
    try {
      await deleteShop(id); // Using Redux mutation to delete shop
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading shops</div>;

  return (
    <div className="container mx-auto">
      {/* Header with Logo */}
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">All Shops</h2>
      </header>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded"
          placeholder="Search shops by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Controls */}
      <div className="mb-4 flex space-x-4">
        {/* Block/Unblock Filter */}
        <select
          className="border border-gray-300 p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Shops</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        {/* Sort Order Filter */}
        <select
          className="border border-gray-300 p-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="new-to-old">New to Old</option>
          <option value="old-to-new">Old to New</option>
        </select>
      </div>

      {/* Shops Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Vendor</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops?.map((shop: any) => (
            <tr key={shop.id}>
              <td className="border border-gray-300 p-2">
                <Image
                  height={40}
                  width={40}
                  src={shops?.logo}
                  alt="Logo"
                  className="h-12 rounded-full"
                />
              </td>
              <td className="border border-gray-300 p-2">{shop.name}</td>
              <td className="border border-gray-300 p-2">
                {shop.vendor?.name}
              </td>
              <td className="border border-gray-300 p-2">
                {shop.isBlocked ? "Blocked" : "Active"}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => toggleBlockShop(shop.id, shop.isBlocked)}
                >
                  {shop.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteShop(shop.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllShop;
