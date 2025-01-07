"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import Container from "@/components/Container/Container";
import ReadOnlyRating from "@/components/Rating/Rating";
import Button from "@/components/Shared/Button";
import { useAddCartMutation } from "@/redux/fetures/cart/cartApi";
import { useGetProductByIdQuery } from "@/redux/fetures/Product/productApi";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const DetailsPage = () => {
  const { id } = useParams(); // Get product ID from the URL
  const { data: productData, isLoading: isProductLoading } =
    useGetProductByIdQuery(id);
  const [addCart, { isLoading: isAddingToCart }] = useAddCartMutation();
  const { data: customerData } = useGetMyProfileQuery(undefined);
  const user = useAppSelector((state: RootState) => state.auth.user);

  const product = productData?.data;
  const images = product?.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const slideInterval = 3000;

  // Auto image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => clearInterval(interval);
  }, [images.length]);

  // Adjust quantity
  const handleQuantity = (operation: "+" | "-") => {
    setQuantity((prevQuantity) => {
      if (operation === "+" && prevQuantity < (product?.Quantity ?? 0)) {
        return prevQuantity + 1;
      } else if (operation === "-" && prevQuantity > 0) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  // Add to cart
  const handleAddToCart = async () => {
    if (quantity === 0) {
      toast.error("Please select at least one item.");
      return;
    }

    const cartData = {
      productId: id,
      quantity,
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

  if (isProductLoading) {
    return (
      <Container>
        <p>Loading product details...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <p>Product not found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-36">
        <div className="min-h-screen font-poppins">
          {/* Header Section */}
          <div className="h-[300px] relative flex justify-center items-center">
            <div className="text-center px-4 md:px-8">
              <h3 className="text-gray-800 font-clashBold text-2xl md:text-3xl lg:text-4xl leading-snug">
                <span className="text-orange-500">{product?.name}</span>
              </h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-2 max-w-3xl mx-auto">
                {product?.description}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 mt-10 gap-8">
            {/* Image Slider */}
            <div className="md:col-span-3 text-center">
              <div className="overflow-hidden">
                <div
                  className="flex gap-3 transition-transform duration-500 ease-out justify-center items-center"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {images.map((image: any, index: number) => (
                    <div key={index} className="w-full h-[500px] flex-shrink-0">
                      <Image
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        layout="responsive"
                        width={1000}
                        height={1000}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-4  md:col-span-2  rounded-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {product?.name}
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                Brand: {product?.brand}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-2xl font-bold text-orange-500">
                  ${product?.price}
                </p>
                <ReadOnlyRating
                  count={5}
                  value={product?.averageRating || 4}
                  color="black"
                />
              </div>

              <div className=" gap-2 mt-2">
                <p className="text-sm font-medium text-gray-700">
                  Discount:{" "}
                  <span className="text-red-600">{product?.discount}%</span>
                </p>
                {product?.offerDiscount && (
                  <p className="text-sm mt-2 font-medium text-gray-700">
                    Offer Discount:{" "}
                    <span className="text-red-600">
                      {product?.offerDiscount}%
                    </span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm font-medium text-gray-700">
                  Available Quantity:
                </p>
                <p className="px-4 py-2 text-sm font-semibold border rounded-md bg-gray-100">
                  {product?.Quantity - quantity}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleQuantity("-")}
                  className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 active:scale-95 transition duration-300 text-xl font-bold"
                >
                  -
                </button>
                <p className="px-6 py-2 font-semibold border rounded-md text-center">
                  {quantity}
                </p>
                <button
                  onClick={() => handleQuantity("+")}
                  className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 active:scale-95 transition duration-300 text-xl font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full py-3 ${
                    isAddingToCart
                      ? "bg-gray-400"
                      : "bg-orange-500 hover:bg-orange-700"
                  } text-white rounded-md font-semibold transition duration-300`}
                >
                  {isAddingToCart ? "Adding..." : "Add To Cart"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailsPage;
