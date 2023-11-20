import React, { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      style={style}
      className={`custom-select ${isOpen ? "open" : ""} ${className}`}
    >
      <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
        <FaSortDown className="icon-down" />
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
