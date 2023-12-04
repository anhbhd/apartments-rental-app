import React, { ChangeEvent, FocusEvent } from "react";
import { inputBoxBaseCss, labelCSSBase } from "./AddOrEditApartments.css";

interface CustomInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  min?: any;
  error: string | undefined;
  touched: boolean | undefined;
}
export const classErr =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ";
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  id,
  type,
  placeholder,
  required = false,
  value,
  onChange,
  onBlur,
  min,
  error,
  touched,
}) => {
  return (
    <div className="mb-5">
      <label className={labelCSSBase}>{label}</label>
      <input
        type={type}
        className={error && touched ? classErr : inputBoxBaseCss}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        min={min}
      />
      {error && touched && (
        <p className="mt-2 text-sm absolute text-red-600 ">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;
