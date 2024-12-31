"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/fetures/Auth/authSlice";
import { useRouter } from "next/navigation";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VendorDashboard = () => {
  // Sample data for charts
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1000, 1200, 1400, 1700, 1500, 1800, 2100],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const orderStatusData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [50, 30, 10], // Example data
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
        borderColor: ["#4caf50", "#ffeb3b", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  const handelLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
        <button
          onClick={handelLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats Section */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Pending Orders</h3>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Active Products</h3>
            <p className="text-2xl font-bold">4</p>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Announcements</h2>
          <ul className="space-y-2">
            <li className="text-gray-600">
              🎉 Welcome to the new Vendor Dashboard!
            </li>
            <li className="text-gray-600">
              🚀 Don’t forget to update your product inventory.
            </li>
            <li className="text-gray-600">
              🛠 Maintenance scheduled for this weekend.
            </li>
          </ul>
        </div>

        {/* Sales Chart Section */}
        <div className="col-span-1 lg:col-span-2 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
          <Line data={salesData} />
        </div>

        {/* Order Status Chart Section */}
        <div className="col-span-1 lg:col-span-2 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Status Distribution</h2>
          <Bar data={orderStatusData} />
        </div>

        {/* Recent Orders Section */}
        <div className="col-span-1 lg:col-span-3 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="p-2 border border-gray-300">Order ID</th>
                <th className="p-2 border border-gray-300">Customer</th>
                <th className="p-2 border border-gray-300">Amount</th>
                <th className="p-2 border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">#001</td>
                <td className="p-2 border border-gray-300">John Doe</td>
                <td className="p-2 border border-gray-300">$150</td>
                <td className="p-2 border border-gray-300 text-green-500">
                  Completed
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">#002</td>
                <td className="p-2 border border-gray-300">Jane Smith</td>
                <td className="p-2 border border-gray-300">$250</td>
                <td className="p-2 border border-gray-300 text-yellow-500">
                  Pending
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">#003</td>
                <td className="p-2 border border-gray-300">Mark Lee</td>
                <td className="p-2 border border-gray-300">$75</td>
                <td className="p-2 border border-gray-300 text-red-500">
                  Cancelled
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
