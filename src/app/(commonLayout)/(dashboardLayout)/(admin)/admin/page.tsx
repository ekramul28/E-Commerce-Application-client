import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="bg-white shadow-md p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Statistics Section */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Active Vendors</h3>
            <p className="text-2xl font-bold">87</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Orders Today</h3>
            <p className="text-2xl font-bold">56</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold">$18,750</p>
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
