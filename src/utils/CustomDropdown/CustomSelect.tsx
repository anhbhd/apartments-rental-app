import React, { useState } from "react";
import "./CustomSelect.scss";
import { FaSortDown } from "react-icons/fa";
import { Option } from "../../type/Option";
interface ICustomSelectProps {
  options: Option[];
  selected: Option;
  onSelect: (selectedOption: Option) => void;
  style?: React.CSSProperties;
  className?: string;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  options,
  onSelect,
  selected,
  style,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(selected);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      style={style}
      className={`custom-select ${isOpen ? "open" : ""} ${className}`}
    >
      <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
        <FaSortDown className="icon-down" />
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.label} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
