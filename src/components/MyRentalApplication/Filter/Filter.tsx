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

const Filter = () => {
  const handleSelect = (selectedOption: Option) => {
    console.log("Selected option:", selectedOption);
  };
  return (
    <div className="filter">
      <CustomSelect
        options={options}
        selected={options[0]}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Filter;
