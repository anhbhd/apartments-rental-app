import React from "react";
import "./Filter.scss";
import CustomSelect from "../../../utils/CustomDropdown/CustomSelect";
import { Option } from "../../../type/Option";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";

const options: Option[] = [
  { value: "", label: "All" },
  { value: RentAppStatus.PENDING, label: "Pending" },
  { value: RentAppStatus.PROCESSING, label: "Processing" },
  { value: RentAppStatus.RENTING, label: "Renting" },
  { value: RentAppStatus.EXPIRED, label: "Expired" },
  { value: RentAppStatus.CANCELED, label: "Canceled" },
];

interface IFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<Option>>;
  selectedOption: Option;
}

const Filter: React.FC<IFilterProps> = ({ setFilter, selectedOption }) => {
  const handleSelect = (seleted: Option) => {
    setFilter(seleted);
  };

  return (
    <div className="filter">
      <CustomSelect
        options={options}
        selected={selectedOption}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Filter;
