import React from "react";
import "./Filter.scss";
import CustomSelect from "../../../utils/CustomDropdown/CustomSelect";
import { Option } from "../../../type/Option";

const options: Option[] = [
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "RENTING", label: "Renting" },
  { value: "EXPIRED", label: "Expired" },
  { value: "CANCELED", label: "Canceled" },
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
