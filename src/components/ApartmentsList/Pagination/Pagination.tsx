import React, { useState, useEffect } from "react";
import "./Pagination.scss";

interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  initialPage?: number;
  toggleSearchBtn?: boolean;
}

const Pagination: React.FC<IPaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  initialPage = 1,
  toggleSearchBtn,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [toggleSearchBtn]);
  console.log("currentpage :", currentPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ul className="pagination">
      {currentPage !== 1 && (
        <li onClick={() => handlePageClick(currentPage - 1)}>Prev</li>
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <li
          onClick={() => handlePageClick(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
          key={index}
        >
          {index + 1}
        </li>
      ))}
      {currentPage !== totalPages && (
        <li onClick={() => handlePageClick(currentPage + 1)}>Next</li>
      )}
    </ul>
  );
};

export default Pagination;
