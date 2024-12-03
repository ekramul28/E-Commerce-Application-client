"use client";

import React, { useState } from "react";
import { TMeta, TProduct } from "@/assets/AllType";
import LoadingSpinner from "@/components/Loding/Loding";
import CustomPagination from "@/components/Pagination/Pagination";
import { useProductQuery } from "../redux/features/products/productApi";
import Container from "@/components/Container/Container";
import MedicineCard from "./_components/MedicineCard";

const Medicine = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [offerFilter, setOfferFilter] = useState(false);
  const [discountRange, setDiscountRange] = useState([0, 100]);
  // searchTerm", "sort", "limit", "page", "fields"
  const { data, isLoading, error } = useProductQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "sort", value: sortOrder },
    { name: "page", value: currentPage },
    // { name: "fields", value: priceRange },
    // { name: "filter", value: offerFilter },
  ]);

  const products: TProduct[] = data?.data?.result;
  const meta: TMeta = data?.data?.meta;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriceRange = e.target.value.split(",").map(Number) as [
      number,
      number
    ];
    setPriceRange(newPriceRange);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrands(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferFilter(e.target.checked);
  };

  const totalPages = meta?.totalPage;

  return (
    <Container>
      <div className="mt-36 md:flex">
        <div className="md:w-1/4 p-4 ">
          {/* Custom Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search products"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => setSearchTerm(searchTerm)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Sorting */}

            <div>
              <label className="block mb-2">Sort By</label>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="w-full p-2 border rounded"
              >
                <option>filter</option>
                <option value="updatedAt">New to Old</option>
                <option value="-updatedAt">Old to New</option>
                <option value="title">A-Z</option>
                <option value="-title">Z-A</option>
                <option value="-rating">top Rating</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block mb-2">Price Range</label>
              <input
                type="text"
                value={priceRange.join(",")}
                onChange={handlePriceChange}
                placeholder="Min, Max"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Brands */}
            <div>
              <label className="block mb-2">Brands</label>
              <select
                multiple
                value={selectedBrands}
                onChange={handleBrandChange}
                className="w-full p-2 border rounded"
              >
                {/* Replace these options with your brand list */}
                <option value="PharmaTrust">PharmaTrust</option>
                <option value="HealWell Pharma">HealWell Pharma</option>
                <option value="MediCare Pharma">MediCare Pharma</option>
                <option value="AllerFree">HeartCare</option>
                <option value="DiabeCare">DiabeCare</option>
              </select>
            </div>

            {/* Offers */}
            <div>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={offerFilter}
                  onChange={handleOfferChange}
                />
                Available Offers
              </label>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="grid  md:grid-cols-3 gap-2 mx-4 md:mx-0 min-h-screen">
            {isLoading ? (
              <div className="flex justify-center items-center w-full h-screen">
                <LoadingSpinner size={200} color="#3498db" strokeWidth={3} />
              </div>
            ) : (
              products?.map((product) => (
                <MedicineCard key={product._id} product={product} />
              ))
            )}
          </div>

          <div className="flex justify-center items-center my-7">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Medicine;
