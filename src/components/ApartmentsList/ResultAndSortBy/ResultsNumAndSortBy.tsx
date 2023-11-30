import "./ResultsNumAndSortBy.scss";
import CustomSelect from "../../../utils/CustomDropdown/CustomSelect";
import { Option } from "../../../type/Option";

import { IoFilter } from "react-icons/io5";
import { sortBySelection } from "./SortBy";
import { useEffect, useState } from "react";

interface IResultsNumAndSortByProps {
  className: string;
  onClick: () => void;
  onSelectSortBy: (sortby: Option) => void;
  clearFilterClicked: boolean;
  setClearFilterClicked: React.Dispatch<React.SetStateAction<boolean>>;
  totalItems: number;
}
const ResultsNumAndSortBy = ({
  totalItems,
  className,
  onClick,
  onSelectSortBy,
  clearFilterClicked,
  setClearFilterClicked,
}: IResultsNumAndSortByProps) => {
  const [selected, setSelected] = useState<Option>(sortBySelection[0]);

  useEffect(() => {
    if (clearFilterClicked) setSelected(sortBySelection[0]);
  }, [clearFilterClicked]);
  const handleSetSelect = (selection: Option) => {
    setSelected(selection);
    onSelectSortBy(selection);
    setClearFilterClicked(false);
  };

  return (
    <div className={className}>
      <IoFilter onClick={onClick} className="filter-button" />
      <div className="select-box-text">
        <CustomSelect
          options={sortBySelection}
          selected={selected}
          onSelect={handleSetSelect}
        />
        <p>{totalItems} results base on your search </p>
      </div>
    </div>
  );
};

export default ResultsNumAndSortBy;
