import React, { useState } from "react";
import { SortBy } from "../../ApartmentsList/ResultAndSortBy/SortBy";

interface IFilterbarProps {
  setFilter: React.Dispatch<
    React.SetStateAction<{
      orderBy: string;
      keyword: string;
    }>
  >;
}
const Filterbar: React.FC<IFilterbarProps> = ({ setFilter }) => {
  const [selectValue, setSelectValue] = useState<string>(SortBy.NEWEST);
  const [keyword, setKeyword] = useState<string>("");

  const handleChangeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    setFilter((prev) => ({
      ...prev,
      orderBy: e.target.value,
    }));
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setFilter((prev) => ({
      ...prev,
      keyword: e.target.value,
    }));
  };

  return (
    <div className="flex justify-between items-center  mb-12 pr-40">
      <div>
        <select
          onChange={handleChangeSelection}
          defaultValue={selectValue}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value={SortBy.NEWEST}>Newest</option>
          <option value={SortBy.OLDEST}>Oldest</option>
          <option value={SortBy.HIGHTOLOWPRICE}>Price: High to Low</option>
          <option value={SortBy.LOWTOHIGHPRICE}>Price: Low to High</option>
        </select>
      </div>
      <div>
        <div className="relative w-96">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={keyword}
            onChange={handleChangeKeyword}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  "
            placeholder="Search by name"
          />
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
