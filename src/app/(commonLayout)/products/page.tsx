"use client";
import Container from "@/components/Container/Container";
import LoadingSpinner from "@/components/Loding/Loding";
import { useGetAllProductIdQuery } from "@/redux/fetures/Product/productApi";
import React from "react";
import MedicineCard from "../product/_components/MedicineCard";

const Products = ({ searchParams }: { searchParams: any }) => {
  console.log(searchParams);

  const productParams = Object.entries(searchParams).map(([key, value]) => ({
    name: key,
    value,
  }));
  console.log(productParams);
  const { data, isLoading, error } = useGetAllProductIdQuery(productParams);
  console.log(data?.data.data);

  return (
    <div>
      <Container>
        <div className="grid md:grid-cols-4 gap-2 mx-4 md:mx-0 min-h-screen mt-40">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-screen">
              <LoadingSpinner size={200} color="#3498db" strokeWidth={3} />
            </div>
          ) : error ? (
            <p className="text-red-500">Failed to load products.</p>
          ) : (
            data?.data?.data.map((product) => (
              <MedicineCard key={product.id} product={product} />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default Products;
