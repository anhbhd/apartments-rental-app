import React, { useState } from "react";
import "./CustomSelect.scss";
import { FaSortDown } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
}

interface ICustomSelectProps {
  options: Option[];
  selected: Option;
  onSelect: (selectedOption: Option) => void;
  style?: React.CSSProperties;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  options,
  onSelect,
  style,
  selected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(selected);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div style={style} className={`custom-select ${isOpen ? "open" : ""}`}>
      <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
        <FaSortDown className="icon-down" />
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
