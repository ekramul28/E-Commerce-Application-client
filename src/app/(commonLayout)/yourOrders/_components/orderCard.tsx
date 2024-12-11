import { TCart } from "@/assets/AllType";
import Container from "@/components/Container/Container";
import Image from "next/image";
import React from "react";

const OrderCard = ({ cartProducts }: { cartProducts: any }) => {
  console.log(cartProducts);
  return (
    <div>
      <div className="mt-36">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto w-full">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>
            {cartProducts?.map((card: TCart) => (
              <div key={card.id} className="w-full">
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
                          <dd className="inline ">{card?.product?.price}</dd>
                        </div>
                      </dl>
                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Status:</dt>
                          <dd className="inline text-green-700 font-bold">
                            {card?.status}
                          </dd>
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
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
