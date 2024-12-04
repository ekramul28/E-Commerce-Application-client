import Image from "next/image";
import React from "react";

const UserPage = () => {
  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Role
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Salary
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Admin
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://i.ibb.co/j8xzTdT/Whats-App-Image-2024-03-18-at-22-31-31-fa796e6e.jpg"
                    alt="John Doe"
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                mdekramulhassan168@gmail.com
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Web Developer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $120,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button className="block w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  Admin
                </button>
              </td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://i.ibb.co/j8xzTdT/Whats-App-Image-2024-03-18-at-22-31-31-fa796e6e.jpg"
                    alt="Jane Doe"
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Jane Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                04/11/1980
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Web Designer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $100,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button className="block w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  Admin
                </button>
              </td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://i.ibb.co/j8xzTdT/Whats-App-Image-2024-03-18-at-22-31-31-fa796e6e.jpg"
                    alt="Gary Barlow"
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Gary Barlow
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Singer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $20,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button className="block w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  Admin
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
