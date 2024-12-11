/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useEffect } from "react";
import { TMeta, TProduct } from "@/assets/AllType";
import LoadingSpinner from "@/components/Loding/Loding";
import CustomPagination from "@/components/Pagination/Pagination";
import Container from "@/components/Container/Container";
import MedicineCard from "./_components/MedicineCard";
import { useGetAllProductIdQuery } from "@/redux/fetures/Product/productApi";
import { useGetCategoryQuery } from "@/redux/fetures/Category/categoryApi";
import InfiniteScroll from "react-infinite-scroll-component";
import GoTop from "@/components/GoTop/GoTop";

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
  // const { data, isLoading, error } = useGetAllProductIdQuery(queryParams);

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

  const { data, isLoading, error } = useGetAllProductIdQuery(queryParams);

  const postsPerPage = 10;

  const initialPosts = data?.data?.data || [];
  console.log(initialPosts);
  const [posts, setPosts] = useState<TProduct[]>(initialPosts);
  const [hasMore, setHasMore] = useState<boolean>(
    initialPosts.length >= postsPerPage
  );

  useEffect(() => {
    // Update the posts state when the initial data changes
    if (data?.data?.data) {
      setPosts(data.data.data);
    }
  }, [data]);

  const fetchMoreData = async () => {
    try {
      const nextPage = currentPage + 1;

      // Simulating API pagination
      // const additionalParams = { ...productParams, page: nextPage };

      queryParams.push({ name: "page", value: nextPage });
      console.log(postsPerPage);

      const result = await useGetAllProductIdQuery(queryParams);

      const morePosts = result?.data?.data || [];
      setPosts((prevPosts) => [...prevPosts, ...morePosts]);
      setCurrentPage(nextPage);

      if (morePosts.length < postsPerPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
      setHasMore(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error fetching products.</div>;
  }

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
                <option>Default</option>
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
                <option value="">All Category Data</option>
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
          <InfiniteScroll
            dataLength={posts?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<LoadingSpinner />}
            endMessage={<p>No more products to load.</p>}
          >
            <div>
              <div className="grid md:grid-cols-3 gap-2 mx-4 md:mx-0 min-h-screen ">
                {posts.map((product: TProduct) => (
                  <MedicineCard key={product.id} product={product} />
                ))}
              </div>
              <GoTop />
            </div>
          </InfiniteScroll>

          {/* Pagination */}
          {/* <div className="flex justify-center items-center my-7">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default Medicine;
