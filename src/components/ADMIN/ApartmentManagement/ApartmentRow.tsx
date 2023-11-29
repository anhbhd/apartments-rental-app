import React from "react";
import { Apartment } from "../../../type/Apartment";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface IApartmentRowProps {
  apartment: Apartment;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  onOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApartmentRow = ({
  apartment,
  setDeleteId,
  onOpenModal,
}: IApartmentRowProps) => {
  return (
    <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img
          src={apartment?.avatar}
          className="w-16 md:w-32 rounded-lg max-w-full"
          alt={apartment?.avatar}
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {apartment?.name}
      </td>

      <td className="px-6 py-4 font-semibold  text-gray-900 dark:text-white">
        {apartment?.pricePerMonth}$
      </td>
      <td className="px-6 py-4  ">
        <p className="min-h-full flex gap-4 justify-start items-center">
          <Button
            danger
            onClick={() => {
              setDeleteId(apartment.id as string);
              onOpenModal(true);
            }}
          >
            Remove
          </Button>

          <Link to={`/admin/apartments/add_or_edit/${apartment.id}`}>
            <Button type="primary">Details</Button>
          </Link>
        </p>
      </td>
    </tr>
  );
};

export default ApartmentRow;
