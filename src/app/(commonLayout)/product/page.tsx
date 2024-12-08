"use client";

import React, { useState, useEffect } from "react";
import { TMeta, TProduct } from "@/assets/AllType";
import LoadingSpinner from "@/components/Loding/Loding";
import CustomPagination from "@/components/Pagination/Pagination";
import Container from "@/components/Container/Container";
import MedicineCard from "./_components/MedicineCard";
import { useGetAllProductIdQuery } from "@/redux/fetures/Product/productApi";
import { useGetCategoryQuery } from "@/redux/fetures/Category/categoryApi";

const Medicine = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [offerFilter, setOfferFilter] = useState("");

  const { data: category } = useGetCategoryQuery(undefined);

  const getSortParams = (value: string) => {
    switch (value) {
      case "name_asc":
        return { sortBy: "name", sortOrder: "asc" };
      case "name_desc":
        return { sortBy: "name", sortOrder: "desc" };
      case "createdAt_asc":
        return { sortBy: "createdAt", sortOrder: "asc" };
      case "createdAt_desc":
        return { sortBy: "createdAt", sortOrder: "desc" };
      default:
        return { sortBy: "", sortOrder: "" };
    }
  };

  const { sortBy, sortOrder } = getSortParams(sortValue);

  //  {
  //   searchTerm,
  //   sortBy,
  //   sortOrder,
  //   page: currentPage,
  //   limit: 10,
  //   priceRange: priceRange.join(","),
  //   brands: selectedBrands.join(","),
  //   offers: offerFilter,
  // };

  const queryParams = [
    { name: "searchTerm", value: searchTerm },
    { name: "sortBy", value: sortBy },
    { name: "sortOrder", value: sortOrder },
    { name: "page", value: currentPage },
    { name: "limit", value: 10 },
    { name: "offer", value: offerFilter },
    { name: "categoryId", value: selectedCategory },
    { name: "price", value: priceRange },
  ];
  const { data, isLoading, error } = useGetAllProductIdQuery(queryParams);
  console.log(data);
  const products: TProduct[] = data?.data?.data || [];
  const meta: TMeta = data?.data?.meta;
  const totalPages = meta?.totalPage || 1;

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchTerm(e.target.searchInput.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortValue(e.target.value);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [min, max] = e.target.value.split(",").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      setPriceRange([min, max]);
    }
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedCategory(e.target.value);

  const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setOfferFilter("true");
    }
  };

  return (
    <Container>
      <div className="mt-36 md:flex">
        <div className="md:w-1/4 p-4 ">
          {/* Search Bar */}
          <div className="mb-4">
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                type="text"
                id="searchInput" // Assign an ID to the input
                placeholder="Search products"
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Search
              </button>
            </form>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Sorting */}
            <div>
              <label className="block mb-2">Sort By</label>
              <select
                value={sortValue}
                onChange={handleSortChange}
                className="w-full p-2 border rounded"
              >
                <option aria-readonly>Default</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="createdAt_asc">Created At (Oldest)</option>
                <option value="createdAt_desc">Created At (Newest)</option>
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
              <label className="block mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={handleBrandChange}
                className="w-full p-2 border rounded"
              >
                <option aria-readonly value="">
                  All Category Data
                </option>
                {category?.data?.map(
                  (category: { id: string; name: string }) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Offers */}
            <div>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  value={offerFilter}
                  onChange={handleOfferChange}
                />
                Available Offers
              </label>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4">
          {/* Product Cards */}
          <div className="grid md:grid-cols-3 gap-2 mx-4 md:mx-0 min-h-screen">
            {isLoading ? (
              <div className="flex justify-center items-center w-full h-screen">
                <LoadingSpinner size={200} color="#3498db" strokeWidth={3} />
              </div>
            ) : error ? (
              <p className="text-red-500">Failed to load products.</p>
            ) : (
              products.map((product) => (
                <MedicineCard key={product.id} product={product} />
              ))
            )}
          </div>

          {/* Pagination */}
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
