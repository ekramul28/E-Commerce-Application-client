/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Container from "@/components/Container/Container";
import { useGetShopByVendorQuery } from "@/redux/fetures/Shop/shopApi";
import Image from "next/image";
import React from "react";

const ShopDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, isLoading, isError } = useGetShopByVendorQuery(id);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Failed to load shop details.</div>;
  }

  const { name, logo, description, vendor, products, followers } = data?.data;

  return (
    <Container>
      <div className="p-6 max-w-5xl mx-auto mt-44">
        {/* Shop Header */}
        <div className="flex">
          <div className="flex items-center gap-4 w-4/5">
            <Image
              src={logo}
              alt={name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <h2 className="text-lg font-semibold w-1/5 ">
              Followers ({followers?.length})
            </h2>
          </div>
        </div>

        {/* Vendor Information */}
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Vendor Information</h2>
          <div className="flex items-center gap-4 mt-2">
            <Image
              src={vendor?.profilePhoto}
              alt={vendor?.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{vendor?.name}</p>
              <p className="text-gray-600">{vendor?.email}</p>
              <p className="text-gray-600">{vendor?.contactNumber}</p>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            Products ({products?.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {products?.map((product: any) => (
              <div key={product?.id} className="p-4 border rounded-lg">
                <Image
                  src={product?.images[0]}
                  alt={product?.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="mt-2 font-medium">{product?.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {product?.description.length > 50
                    ? `${product?.description.slice(0, 50)}...`
                    : product?.description}
                </p>
                <p className="mt-2 text-lg font-bold">
                  Price: ${product?.price}
                </p>
                {product?.discount && (
                  <p className="text-sm text-red-500">
                    Discount: {product?.discount}%
                  </p>
                )}
                {product?.offerDiscount && (
                  <p className="text-sm text-green-500">
                    Offer Discount: {product?.offerDiscount}%
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Followers */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            Followers ({followers?.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {followers?.map((follower: any) => (
              <div
                key={follower?.id}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <Image
                  src={follower?.profilePhoto}
                  alt={follower?.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{follower?.name}</p>
                  <p className="text-gray-600 text-sm">{follower?.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShopDetails;
