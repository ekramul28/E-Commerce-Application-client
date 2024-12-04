"use client";
import {
  useAddProductMutation,
  useUpdateProductCartMutation,
} from "@/app/redux/features/cart/cartApi";
import { useSingleProductQuery } from "@/app/redux/features/products/productApi";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import Container from "@/components/Container/Container";
import ReadOnlyRating from "@/components/Rating/Rating";
import Button from "@/components/Shared/Button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface ErrorResponse {
  message: string;
}
const DetailsPage = () => {
  const { id } = useParams();
  const { data } = useSingleProductQuery(id);
  const [quantity, setQuantity] = useState(0);
  const [addProduct] = useAddProductMutation();
  const [updateProductCart] = useUpdateProductCartMutation();

  const user = useAppSelector((state: RootState) => state.auth.user);

  const product = data?.data;
  const image = data?.data?.image;

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 3000;

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === (image?.length ?? 1) - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => clearInterval(interval);
  }, [image?.length]);

  const handleQuantity = (operation: "+" | "-") => {
    setQuantity((prevQuantity) => {
      if (operation === "+") {
        if (prevQuantity < (product?.availableQuantity ?? 0)) {
          return prevQuantity + 1;
        }
      } else if (operation === "-" && prevQuantity > 0) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleAddToCart = async (_id: string) => {
    const data = {
      product: _id,
      productQuantity: quantity | 0,
      email: user?.email,
      phoneNo: user?.phoneNo,
    };
    if (quantity === 0) {
      return toast.error("Product quantity is 0");
    }
    try {
      const result = await addProduct(data);
      const updateData = {
        _id,
        data: {
          availableQuantity: quantity,
        },
      };
      const update = await updateProductCart(updateData);
      if (result?.data?.success) {
        toast.success("Product Add Successfully");
      }

      const error = result?.error;

      const fetchError = error as FetchBaseQueryError;

      const res = fetchError?.data as ErrorResponse;
      const message = res?.message;
      console.log(message);
      if (message === "login  first") {
        window.location.href = "/login";
        toast.error("login first");
        return;
      }

      if (error) {
        toast.error("Already Added");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    //  if(result.data)
  };

  return (
    <Container>
      <div className="mt-36">
        <div className="min-h-screen font-poppins">
          <div className="h-[250px] bg-yellow-300 bg-detail flex justify-center items-center bg-fixed">
            <h3 className="text-gray-400 font-clashBold text-xl md:text-2xl lg:text-3xl text-center">
              Unveiling [{product?.title}]:
              <br /> {product?.description}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 mt-10 gap-8 md:gap-0">
            <div className="md:col-span-3 text-center">
              <div className="overflow-hidden">
                <div
                  className="flex gap-3 transition-transform duration-500 ease-out justify-center items-center"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {image?.map((data: string, index: number) => (
                    <div
                      key={index}
                      className="w-full pr-6 h-[500px] flex-shrink-0"
                    >
                      <Image
                        src={data}
                        alt="healthtitle"
                        layout="responsive"
                        width={400}
                        height={200}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mx-2 md:col-span-2 ">
              <h1 className="text-4xl font-bold">{product?.title}</h1>
              <p className="font-clashRegular text-gray-600 text-sm">
                {product?.brand}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">${product?.price}</p>
                <ReadOnlyRating count={5} value={4} color="black" />
              </div>
              <p className="text-sm mt-10 text-gray-600">
                {product?.description}
              </p>
              <p className="mt-3 font-medium">Discount: {product?.discount}%</p>
              <p className="mt-3 font-medium">
                {product?.offerDiscount
                  ? `OfferDiscount: ${product?.offerDiscount}%`
                  : ""}
              </p>
              <div className="flex items-center gap-3">
                <p>Available Quantity:</p>
                <p className="px-5 py-1 font-semibold border">
                  {product?.availableQuantity - quantity}
                </p>
              </div>
              {/* Quantity */}
              <div className="flex items-center gap-4 mt-3">
                <p
                  onClick={() => handleQuantity("-")}
                  className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full bg-gray-200 flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300"
                >
                  -
                </p>
                <p className="px-5 py-1 font-semibold border">{quantity}</p>
                <p
                  onClick={() => handleQuantity("+")}
                  className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full bg-gray-200 flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300"
                >
                  +
                </p>
              </div>
              {/* Wishlist */}
              <div className="flex flex-col gap-2 mt-10">
                <Button
                  onClick={() => handleAddToCart(product._id)}
                  className="py-2 text-white"
                >
                  Add To Cart
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
