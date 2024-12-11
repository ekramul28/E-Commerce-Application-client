"use client";
import {
  useVenderOrderApiQuery,
  useVendorOrderUpdateMutation,
} from "@/redux/fetures/order/orderApi";
import { useGetShopByVendorQuery } from "@/redux/fetures/Shop/shopApi";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Order = () => {
  const [editOrderId, setEditOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  const [VendorOrderUpdate] = useVendorOrderUpdateMutation();

  const { data: Vendor, isLoading: vendorLoading } =
    useGetMyProfileQuery(undefined);
  const { data: Shop, isLoading: shopLoading } = useGetShopByVendorQuery(
    Vendor?.data?.id,
    {
      skip: !Vendor?.data?.id, // Prevent query if Vendor ID is undefined
    }
  );
  const { data, isLoading: ordersLoading } = useVenderOrderApiQuery(
    Shop?.data?.id,
    {
      skip: !Shop?.data?.id, // Prevent query if Shop ID is undefined
    }
  );

  const orders = data?.data;
  console.log(orders);
  const handleStatusChange = async (orderId: string) => {
    const data = {
      orderId,
      status: newStatus,
    };

    const result = await VendorOrderUpdate(data).unwrap();
    if (result.success) {
      toast.success("Status update successfully");
    }

    console.log(`Order ID: ${orderId}, New Status: ${newStatus}`);
    setEditOrderId(null); // Reset the edit state after saving
  };

  if (vendorLoading || shopLoading || ordersLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!Vendor?.data) {
    return <div className="text-center text-red-500">Vendor not found!</div>;
  }

  if (!Shop?.data) {
    return <div className="text-center text-red-500">Shop not found!</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="text-center">No orders found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="p-4 border rounded shadow-sm">
            <p>
              <span className="font-bold">Customer Name:</span>{" "}
              {order?.customer?.name}
            </p>
            {/* <div className=" w-10 flex justify-end items-end">
              <div>
                <Image
                  src={order?.product?.images[0]}
                  height={40}
                  width={40}
                  alt={`Product Image`}
                  className="w-full h-20 rounded-md "
                />
              </div>
            </div> */}
            <p>
              <span className="font-bold">Product Name:</span>{" "}
              {order?.product?.name}
            </p>
            <p>
              <span className="font-bold">Payment ID:</span>{" "}
              {order?.paymentId ?? "N/A"}
            </p>
            <p>
              <span className="font-bold">Status:</span> {order.status}
            </p>
            <p>
              <span className="font-bold">Created At:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-bold">Updated At:</span>{" "}
              {new Date(order.updatedAt).toLocaleString()}
            </p>

            {editOrderId === order.id ? (
              <div className="mt-4">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELED">CANCELED</option>
                </select>
                <button
                  onClick={() => handleStatusChange(order.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditOrderId(null)}
                  className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setEditOrderId(order.id);
                  setNewStatus(order.status); // Set default status value
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit Status
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
