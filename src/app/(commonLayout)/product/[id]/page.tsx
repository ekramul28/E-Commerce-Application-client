"use client";

import Container from "@/components/Container/Container";
import ReadOnlyRating from "@/components/Rating/Rating";
import Button from "@/components/Shared/Button";
import { useAddCartMutation } from "@/redux/fetures/cart/cartApi";
import { useGetProductByIdQuery } from "@/redux/fetures/Product/productApi";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailsPage = () => {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(id);
  const [addCart] = useAddCartMutation();

  const [quantity, setQuantity] = useState(0);
  const { data: customerData } = useGetMyProfileQuery(undefined);
  const customer = customerData?.data.id;

  const product = data?.data;
  const image = data?.data?.images;

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
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleAddToCart = async (id: string) => {
    const data = {
      productId: id,
      quantity: quantity,
      email: user?.email,
    };

    try {
      const result = await addCart(data).unwrap();
      if (result?.success) {
        toast.success("Product Add Successfully");
      }
      console.log("add card", result);
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
                  {product?.Quantity - quantity}
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
                  onClick={() => handleAddToCart(product.id)}
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
