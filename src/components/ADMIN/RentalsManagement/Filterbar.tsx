import React, { useState } from "react";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";

const cssBase =
  "inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600 ";
const active =
  "inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out";

interface IFilterbarProps {
  onSetCategory: (selectedCategory: string) => void;
  initialSelect: string;
}

const Filterbar: React.FC<IFilterbarProps> = ({
  onSetCategory,
  initialSelect,
}) => {
  const [select, setSelect] = useState<string>(initialSelect);

  const handleChangeCategory = (category: string) => {
    onSetCategory(category);
    setSelect(category);
  };

  return (
    <div className="bg-white py-2 px-3 cursor-pointer">
      <nav className="flex flex-wrap gap-4">
        <div
          className={select === RentAppStatus.PENDING ? active : cssBase}
          onClick={() => handleChangeCategory(RentAppStatus.PENDING)}
        >
          Pending
        </div>

        <div
          className={select === RentAppStatus.PROCESSING ? active : cssBase}
          onClick={() => handleChangeCategory(RentAppStatus.PROCESSING)}
        >
          Processing
        </div>

        <div
          className={select === RentAppStatus.RENTING ? active : cssBase}
          onClick={() => handleChangeCategory(RentAppStatus.RENTING)}
        >
          Renting
        </div>

        <div
          className={select === RentAppStatus.EXPIRED ? active : cssBase}
          onClick={() => handleChangeCategory(RentAppStatus.EXPIRED)}
        >
          Expired
        </div>

        <div
          className={select === RentAppStatus.CANCELED ? active : cssBase}
          onClick={() => handleChangeCategory(RentAppStatus.CANCELED)}
        >
          Cancel
        </div>
      </nav>
    </div>
  );
};

export default Filterbar;
