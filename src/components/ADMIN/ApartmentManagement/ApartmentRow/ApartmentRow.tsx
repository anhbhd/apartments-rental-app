import React from "react";

const ApartmentRow = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img
          src="/docs/images/products/apple-watch.png"
          className="w-16 md:w-32 max-w-full max-h-full"
          alt="Apple Watch"
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        Apple Watch
      </td>

      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        $599
      </td>
      <td className="px-6 py-4 flex justify-start gap-5">
        <a
          href="#"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Remove
        </a>
        <a
          href="#"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Details
        </a>
      </td>
    </tr>
  );
};

export default ApartmentRow;
