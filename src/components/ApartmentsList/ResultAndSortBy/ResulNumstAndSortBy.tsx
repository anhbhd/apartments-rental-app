import React, { useState } from "react";

import "./ResulNumstAndSortBy.scss";
import CustomSelect from "../../../utils/CustomDropdown/CustomSelect";
import { Option } from "../../../type/Option";

import { citiesSelections } from "../Filterbar/CitySelection";
import { IoFilter } from "react-icons/io5";

interface IResulNumstAndSortByProps {
  className: string;
  onClick: () => void;
}

const ResulNumstAndSortBy = ({
  className,
  onClick,
}: IResulNumstAndSortByProps) => {
  const [select, setSelect] = useState<Option>(citiesSelections[0]);

  return (
    <>
      <div className={className}>
        <IoFilter onClick={onClick} className="filter-button" />
        <div className="select-box-text">
          <CustomSelect
            options={citiesSelections}
            selected={citiesSelections[0]}
            onSelect={setSelect}
          />
          <p>100 results base on your search</p>
        </div>
      </div>
    </>
  );
};

export default ResulNumstAndSortBy;
