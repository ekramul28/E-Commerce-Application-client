/* eslint-disable react/jsx-key */
"use client";
import Container from "@/components/Container/Container";
import LoadingSpinner from "@/components/Loding/Loding";
import { useGetAllShopQuery } from "@/redux/fetures/Shop/shopApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AllShop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("new-to-old");

  const queryParams = [
    { name: "searchTerm", value: searchTerm },
    { name: "filter", value: filterStatus },
  ];

  const { data, error, isLoading } = useGetAllShopQuery(queryParams);
  const shops = data?.data?.data || [];

  if (error) return <div>Error loading shops</div>;

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="container mx-auto px-4 mt-48">
          {/* Search and Filter Section */}
          <div className="my-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Input */}
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full md:w-1/3"
              placeholder="Search shops by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filters */}
            <div className="flex gap-4">
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

              {/* Sort Order */}
              <select
                className="border border-gray-300 p-2 rounded"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="new-to-old">New to Old</option>
                <option value="old-to-new">Old to New</option>
              </select>
            </div>
          </div>

          {/* Shops List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-9">
            {shops?.map((shop: any) => (
              <Link href={`shoppage/${shop?.vendor?.id}`}>
                <div
                  key={shop.id}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  {/* Shop Logo */}
                  <div className="w-full h-40 bg-gray-100 flex justify-center items-center">
                    <Image
                      src={shop.logo || "/placeholder.png"}
                      alt={`${shop.name} Logo`}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full"
                    />
                  </div>

                  {/* Shop Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{shop.name}</h3>
                    <p className="text-sm text-gray-600">
                      Vendor: {shop?.vendor?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Joined: {new Date(shop?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total Products: {shop?.products?.length || 0}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        shop.isBlocked ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {shop.isBlocked ? "Blocked" : "Active"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default AllShop;
