import React from "react";
import Pagination from "../../../components/ADMIN/Pagination/Pagination";
import RentalRow from "../../../components/ADMIN/RentalsManagement/RentalRow/RentalRow";

const RentalApplicationsManagement = () => {
  return (
    <>
      <div className="max-w-screen-xl bg-white">
        <h1 className="mt-20 mb-10 ml-5 text-2xl font-bold text-gray-900">
          Rental Applications Management
        </h1>
        <div className="bg-white py-2 px-3">
          <nav className="flex flex-wrap gap-4">
            <div className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
              Account
            </div>

            <div className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
              Settings
            </div>

            <div className="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out">
              Orders
            </div>

            <div className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
              Sales
            </div>

            <div className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">
              Suppliers
            </div>
          </nav>
        </div>
      </div>
      <div className=" bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-2">
          <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Order Date
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="float-right mt-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Order ID
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Description
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Customer
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Price
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="float-right mt-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Status
                  </td>
                </tr>
              </thead>

              <tbody className="bg-white lg:border-gray-300">
                <RentalRow />
                <RentalRow />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default RentalApplicationsManagement;
