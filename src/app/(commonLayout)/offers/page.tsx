"use client";
import React, { useState } from "react";
import { useProductQuery } from "../../redux/features/products/productApi";
import { TMeta, TProduct } from "@/assets/AllType";
import LoadingSpinner from "@/components/Loding/Loding";
import CustomPagination from "@/components/Pagination/Pagination";
import Container from "@/components/Container/Container";
import MedicineCard from "../medicine/_components/MedicineCard";

const Offers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useProductQuery([
    { name: "page", value: 1 },
  ]);

  const products: TProduct[] = data?.data?.result;
  const offerProduct: TProduct[] = products?.filter(
    (product) => product.offer === true
  );
  const meta: TMeta = data?.data?.meta;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const total = offerProduct?.length || 8;
  const limit = meta?.limit || 8;
  const totalPages = Math.ceil(total / limit);
  console.log(total);

  return (
    <Container>
      <div className="mt-20 ">
        <div className=" grid lg:grid-cols-4 md:grid-cols-3 gap-2 items-center mx-2 min-h-screen ">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-screen">
              <LoadingSpinner size={200} color="#3498db" strokeWidth={3} />
            </div>
          ) : (
            offerProduct?.map((product) => (
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
    </Container>
  );
};

export default Offers;
