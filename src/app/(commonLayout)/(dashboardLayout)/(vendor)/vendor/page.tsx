import React from "react";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
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
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Active Products</h3>
            <p className="text-2xl font-bold">25</p>
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
