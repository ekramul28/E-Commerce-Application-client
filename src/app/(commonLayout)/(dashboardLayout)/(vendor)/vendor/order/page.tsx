"use client";
import React, { useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([
    {
      id: "1f2b3c4d-5e6f-7a8b-9c0d-e1f2g3h4i5j6",
      customerName: "John Doe",
      productName: "Product A",
      paymentId: null,
      status: "PENDING",
      createdAt: "2024-12-04T12:00:00.000Z",
      updatedAt: "2024-12-04T12:00:00.000Z",
    },
    {
      id: "2g3h4i5j-6k7l-8m9n-0o1p-q2r3s4t5u6v7",
      customerName: "Jane Smith",
      productName: "Product B",
      paymentId: "PAY12345",
      status: "COMPLETED",
      createdAt: "2024-12-04T12:00:00.000Z",
      updatedAt: "2024-12-04T12:00:00.000Z",
    },
  ]);

  const [editOrderId, setEditOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  // Handle status change
  const handleStatusChange = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setEditOrderId(null); // Close edit form
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded shadow-sm">
            <p>
              <span className="font-bold">Customer Name:</span>{" "}
              {order.customerName}
            </p>
            <p>
              <span className="font-bold">Product Name:</span>{" "}
              {order.productName}
            </p>
            <p>
              <span className="font-bold">Payment ID:</span>{" "}
              {order.paymentId ?? "N/A"}
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
                  <option value="COMPLETED">COMPLETED</option>
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
