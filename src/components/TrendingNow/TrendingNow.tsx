"use client";
import { TProduct } from "@/assets/AllType";
import { useGetAllProductIdQuery } from "@/redux/fetures/Product/productApi";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "../Loding/Loding";
import EcommerceCard from "@/app/(commonLayout)/product/_components/ProductCard";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  url: string;
}

const TrendingNow = () => {
  const { data, isLoading, error } = useGetAllProductIdQuery(undefined);

  const products: TProduct[] =
    data?.data.data.slice().reverse().slice(0, 4) || [];

  return (
    <div className="my-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Trending Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          products?.map((product: any) => (
            <EcommerceCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default TrendingNow;
