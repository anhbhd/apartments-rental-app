import React from "react";
import ApartmentRow from "../../../../components/ADMIN/ApartmentManagement/ApartmentRow/ApartmentRow";

const ApartmentsList = () => {
  return (
    <div className="mt-24 overflow-x-auto shadow-md  sm:rounded-lg">
      <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>

            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <ApartmentRow />
        </tbody>
      </table>
    </div>
  );
};

export default ApartmentsList;
