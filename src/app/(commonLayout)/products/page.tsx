/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Container from "@/components/Container/Container";
import LoadingSpinner from "@/components/Loding/Loding";
import { useGetAllProductIdQuery } from "@/redux/fetures/Product/productApi";
import React, { useState, useEffect } from "react";
import MedicineCard from "../product/_components/MedicineCard";
import { TProduct } from "@/assets/AllType";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = ({ searchParams }: { searchParams: any }) => {
  const productParams = Object.entries(searchParams).map(([key, value]) => ({
    name: key,
    value,
  }));

  const { data, isLoading, error } = useGetAllProductIdQuery(productParams);

  const postsPerPage = 10;

  const initialPosts = data?.data?.data || [];

  const [posts, setPosts] = useState<TProduct[]>(initialPosts);
  const [hasMore, setHasMore] = useState<boolean>(
    initialPosts.length >= postsPerPage
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      const additionalParams = { ...productParams, page: nextPage };

      productParams.push({ name: "page", value: nextPage });
      console.log(postsPerPage);

      const result = await useGetAllProductIdQuery(productParams);

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
    <div>
      <Container>
        <InfiniteScroll
          dataLength={posts?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
          endMessage={<p>No more products to load.</p>}
        >
          <div className="grid md:grid-cols-4 gap-2 mx-4 md:mx-0 min-h-screen mt-40">
            {posts.map((product: TProduct) => (
              <MedicineCard key={product.id} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default Products;
