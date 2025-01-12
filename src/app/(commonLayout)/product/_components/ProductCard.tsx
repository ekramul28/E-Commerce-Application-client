/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Shared/Button";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  useFollowMutation,
  useGetIsFollowQuery,
  useUnFollowMutation,
} from "@/redux/fetures/follow&unFollow/followApi";
import { useAddCartMutation } from "@/redux/fetures/cart/cartApi";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";
import Link from "next/link";
import { Rating } from "../../Rating/Rating";

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  discount: string | null;
  offerDiscount: string | null;
  availableQuantity: number;
  category: { name: string; image: string };
  shop: {
    id: string;
    name: string;
    logo: string;
    description: string;
    vendorId: string;
  };
  rating: number; // Assuming the rating is a number between 1 and 5
}

const EcommerceCard = ({ product }: { product: ProductDetails }) => {
  const {
    id,
    name,
    description,
    price,
    images,
    discount,
    offerDiscount,
    availableQuantity,
    shop,
    rating,
  } = product;

  const [addCart, { isLoading: isAddingToCart }] = useAddCartMutation();
  const user = useAppSelector((state: RootState) => state.auth.user);

  // Fetching profile data
  const { data: profileData, isLoading: isProfileLoading } =
    useGetMyProfileQuery(undefined);
  const customerId = profileData?.data?.id;

  const followData = { shopId: shop.id, customerId };

  const { data: isFollowingData, isLoading: isFollowLoading } =
    useGetIsFollowQuery(followData);
  const follow = isFollowingData?.data?.isFollowing;

  const [followShop] = useFollowMutation();
  const [unFollowShop] = useUnFollowMutation();

  // Add to Cart
  const handleAddToCart = async () => {
    if (availableQuantity === 0) {
      toast.error("This product is out of stock.");
      return;
    }

    const cartData = {
      productId: id,
      quantity: 1, // Assuming 1 for simplicity
      email: user?.email,
    };

    try {
      const result = await addCart(cartData).unwrap();
      if (result?.success) {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Follow/Unfollow
  const handleFollow = async () => {
    if (!customerId) {
      toast.error("Please log in to follow shops.");
      return;
    }
    try {
      const result = await followShop(followData).unwrap();
      if (result.success) {
        toast.success("Shop followed successfully");
      }
    } catch (error) {
      toast.error("Error following shop");
    }
  };

  const handleUnFollow = async () => {
    try {
      const result = await unFollowShop(followData).unwrap();
      if (result.success) {
        toast.success("Shop unfollowed successfully");
      }
    } catch (error) {
      toast.error("Error unfollowing shop");
    }
  };

  // Truncate text
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // Ensure the profile data is loaded before displaying the component
  if (isProfileLoading || isFollowLoading) {
    return <div>Loading...</div>;
  }
  const randomRatingValue = Math.floor(Math.random() * 5) + 2;

  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white">
      {/* Shop Info at the top */}
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center">
          <Link href={`/shoppage/${shop?.vendorId}`}>
            <Image
              src={shop?.logo}
              alt={shop?.name}
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </Link>
          <Link href={`/shoppage/${shop?.vendorId}`}>
            <p className="text-sm text-gray-600 cursor-pointer">{shop?.name}</p>
          </Link>
        </div>
        <Button
          onClick={follow ? handleUnFollow : handleFollow}
          className={`p-2 font-semibold ${
            follow ? "bg-red-500" : "bg-orange-500"
          } text-white`}
        >
          {follow ? "UnFollow" : "Follow"}
        </Button>
      </div>

      {/* Product Image (Show only the first image) */}
      <div className="relative w-full h-48 overflow-hidden">
        <div className="w-full h-full flex-shrink-0">
          <Image
            src={images[0]}
            alt="Product Image"
            width={500}
            height={500}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {truncateText(name, 30)}
        </h2>
        <p className="text-sm text-gray-500">
          {truncateText(description, 100)}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold text-green-600">${price}</p>
          </div>
          {/* Rating */}
          <div className="mt-2">
            <Rating value={randomRatingValue} />
          </div>
        </div>

        {/* Discount and Offer */}
        <div className="flex gap-2 mt-2">
          {discount && (
            <p className="text-sm text-red-600">Discount: {discount}%</p>
          )}
          {offerDiscount && (
            <p className="text-sm text-red-600">
              Offer Discount: {offerDiscount}%
            </p>
          )}
        </div>

        {/* Buttons Section */}
        <div className="flex gap-2 mt-6">
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`w-full py-3 ${
              isAddingToCart
                ? "bg-gray-400"
                : "bg-orange-500 hover:bg-orange-500"
            } text-white rounded-md font-semibold transition duration-300`}
          >
            {isAddingToCart ? "Adding..." : "Add To Cart"}
          </Button>
          <Link
            className="w-full py-3 bg-gray-200 text-center hover:bg-gray-300 text-gray-700 rounded-md font-semibold transition duration-300"
            href={`product/${id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EcommerceCard;
