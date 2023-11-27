import { useEffect, useState } from "react";

const cssButtonBase =
  "flex items-center justify-center px-4 h-10 leading-tight  text-gray-500  bg-white border border-gray-300  cursor-pointer ";

interface IProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  initialPage?: number;
  currentPage: number;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  initialPage,
  onPageChange,
  currentPage,
}: IProps) => {
  const [current, setCurrentPage] = useState(initialPage as number);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };
  useEffect(() => setCurrentPage(currentPage), [currentPage]);

  return (
    <nav
      className="mt-10 flex justify-center mb-14 "
      aria-label="Page navigation example"
    >
      <ul className="inline-flex -space-x-px text-base h-10">
        {current !== 1 && (
          <li>
            <button
              onClick={() => handlePageClick(current - 1)}
              className="flex cursor-pointer items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
        )}

        {Array.from({ length: totalPages }, (_, index) => (
          <li
            onClick={() => handlePageClick(index + 1)}
            className={`${cssButtonBase} ${
              current === index + 1 ? " text-blue-600 bg-blue-50" : ""
            }`}
            key={index}
          >
            {index + 1}
          </li>
        ))}

        {current < totalPages && (
          <li>
            <button
              onClick={() => handlePageClick(current + 1)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
