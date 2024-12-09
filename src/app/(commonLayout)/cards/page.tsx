"use client";
import React from "react";

import Image from "next/image";
import { TCart, TProduct } from "@/assets/AllType";
import LoadingSpinner from "@/components/Loding/Loding";
import { toast } from "react-toastify";
import SubTotal from "./SubTotal";
import Container from "@/components/Container/Container";
import { useAppSelector } from "@/redux/hooks";
import {
  useCartProductQuery,
  useDeleteProductCartMutation,
} from "@/redux/fetures/cart/cartApi";
import { RootState } from "@/redux/store";

const Cards = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data, isLoading } = useCartProductQuery(undefined);

  const cartProducts = data?.data.items || [];
  const [deleteProductCart] = useDeleteProductCartMutation();

  if (isLoading) {
    <LoadingSpinner />;
  }
  const handelDelete = async (id: string) => {
    const result = await deleteProductCart(id).unwrap();
    console.log("delete", result);

    if (result?.success) {
      toast.success("Products removed from cart");
    }
  };
  return (
    <Container>
      <div className="mt-36">
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>
              {cartProducts.map((card: TCart) => (
                <div key={card.id}>
                  <ul className="space-y-4 border-2 my-3 p-2">
                    <li className="flex items-center gap-4">
                      <div className="w-[100px] h-[100px] flex items-center justify-center">
                        <Image
                          height={300}
                          width={300}
                          src={card?.product?.images[0]}
                          alt="cardImage"
                          className="size-16 rounded object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {card?.product?.name}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">MRP:</dt>
                            <dd className="inline line-through">
                              {card?.product?.price}
                            </dd>
                          </div>

                          <div>
                            <dt className="inline">Discount:</dt>
                            <dd
                              className={`inline ${
                                card?.product?.offer ? "line-through" : ""
                              }`}
                            >
                              {card?.product?.discount}%
                            </dd>
                          </div>
                          <div>
                            <dt className="inline">DiscountPrice:</dt>
                            <dd
                              className={`inline ${
                                card?.product.offer ? "line-through" : ""
                              }`}
                            >
                              {" "}
                              {card?.discountedPrice}
                            </dd>
                          </div>
                          <div>
                            {card?.product.offer ? (
                              <div className="font-bold">
                                <dt className="inline">OfferPrice:</dt>
                                <dd className="inline ">{card?.OfferPrice}</dd>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line1Qty" className="sr-only">
                            {" "}
                            Quantity{" "}
                          </label>

                          <div className="h-8 w-12 border-2 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
                            <p className="flex justify-center items-center font-bold w-full h-full">
                              {card?.quantity}
                            </p>
                          </div>
                        </form>

                        <button
                          onClick={() => handelDelete(card?.id)}
                          className=" transition mx-4 text-red-600"
                        >
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
              <SubTotal />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Cards;
