"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/fetures/Auth/authSlice";
import { useRouter } from "next/navigation";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const AdminDashboard = () => {
  // Revenue Over Time Line Chart Data
  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [12000, 15000, 13000, 17000, 18000, 21000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Order Statistics Bar Chart Data
  const orderData = {
    labels: ["New", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [200, 120, 300, 50],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
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
      {/* Header */}
      <header className="bg-white shadow-md p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handelLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Statistics Section */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold">6</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Active Vendors</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Orders Today</h3>
            <p className="text-2xl font-bold">6</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold">$1,750</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revenue Over Time Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-4">Revenue Over Time</h3>
            <Line data={revenueData} />
          </div>

          {/* Order Statistics Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-4">Order Statistics</h3>
            <Bar data={orderData} />
          </div>
        </div>

        {/* Announcements Section */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Announcements</h2>
          <ul className="space-y-2">
            <li className="text-gray-600">
              🔔 Upcoming maintenance scheduled for Sunday.
            </li>
            <li className="text-gray-600">
              🌟 New features added to the dashboard.
            </li>
            <li className="text-gray-600">
              📢 Reminder: Review vendor performance.
            </li>
          </ul>
        </div>

        {/* Recent Activities Section */}
        <div className="col-span-1 lg:col-span-3 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="p-2 border border-gray-300">Activity</th>
                <th className="p-2 border border-gray-300">User</th>
                <th className="p-2 border border-gray-300">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">
                  Added a new product
                </td>
                <td className="p-2 border border-gray-300">John Doe</td>
                <td className="p-2 border border-gray-300">2 hours ago</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Updated an order status
                </td>
                <td className="p-2 border border-gray-300">Jane Smith</td>
                <td className="p-2 border border-gray-300">3 hours ago</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  Deleted a vendor account
                </td>
                <td className="p-2 border border-gray-300">Admin</td>
                <td className="p-2 border border-gray-300">1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
