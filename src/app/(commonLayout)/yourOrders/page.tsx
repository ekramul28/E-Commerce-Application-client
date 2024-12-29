"use client";
import React from "react";
import LoadingSpinner from "@/components/Loding/Loding";
import Container from "@/components/Container/Container";
import { useCustomerOrderApiQuery } from "@/redux/fetures/order/orderApi";
import OrderCard from "./_components/orderCard";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";

const Orders = () => {
  const { data: user } = useGetMyProfileQuery(undefined);
  const userId = user?.data?.id;
  if (userId) {
    <div>
      <LoadingSpinner></LoadingSpinner>
    </div>;
  }
  const { data, isLoading } = useCustomerOrderApiQuery(userId);

  const orderProduct = data?.data || [];
  return (
    <div>
      <Container>
        <div className="">
          <div className=" grid  gap-2 items-center mx-2 min-h-screen ">
            {isLoading ? (
              <div className="flex justify-center items-center w-full h-screen">
                <LoadingSpinner size={200} color="#3498db" strokeWidth={3} />
              </div>
            ) : (
              <OrderCard cartProducts={orderProduct} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Orders;
