import React, { useEffect, useRef, useState } from "react";
import { FaSortDown } from "react-icons/fa";
import "./CustomSelect.scss";
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
  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };

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
        {selected ? selected.label : "Select an option"}
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
