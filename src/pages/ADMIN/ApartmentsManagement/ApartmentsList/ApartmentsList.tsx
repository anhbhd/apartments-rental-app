import React, { useEffect, useState } from "react";
import ApartmentRow from "../../../../components/ADMIN/ApartmentManagement/ApartmentRow/ApartmentRow";
import { Apartment } from "../../../../type/Apartment";
import { getDataCollection } from "../../../../services/getDataCollection";
import { deleteDocument } from "../../../../services/deleteDocument";
import Pagination from "../../../../components/ADMIN/Pagination/Pagination";

import Filterbar from "../../../../components/ADMIN/ApartmentManagement/Filterbar/Filterbar";

import { paginate } from "../../../../utils/paginate";

import { SortBy } from "../../../../components/ApartmentsList/ResultAndSortBy/SortBy";
interface IDeleteConfirmationModalProps {
  onDelete: () => void;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
}
const DeleteConfirmationModal = ({
  onDelete,
  setDeleteId,
}: IDeleteConfirmationModalProps) => {
  return (
    <>
      <div className=" fixed top-0 right-0 left-0 z-50 bottom-0 flex bg-blue-gray-100 opacity-40 justify-center items-center "></div>
      <div
        id="popup-modal"
        tabIndex={-1}
        className=" fixed top-0 right-0 left-0 z-50 bottom-0 flex justify-center items-center "
      >
        <div className=" relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setDeleteId("")}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this apartment?
              </h3>
              <button
                onClick={onDelete}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setDeleteId("")}
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const initialFilter = {
  orderBy: SortBy.NEWEST,
  keyword: "",
};

const ApartmentsList = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [deleteId, setDeleteId] = useState<string>("");

  const [filter, setFilter] = useState<{ orderBy: string; keyword: string }>(
    initialFilter
  );
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 3;

  const [displayedItems, setDisplayedItems] = useState<Apartment[]>([]);

  useEffect(() => {
    const getAllApartments = async () => {
      let [apartmentsData] = await getDataCollection("apartments");

      if (filter.orderBy === SortBy.LOWTOHIGHPRICE) {
        apartmentsData.sort(
          (a, b) =>
            (a as Apartment).pricePerMonth - (b as Apartment).pricePerMonth
        );
      } else if (filter.orderBy === SortBy.HIGHTOLOWPRICE) {
        apartmentsData.sort(
          (a, b) =>
            (b as Apartment).pricePerMonth - (a as Apartment).pricePerMonth
        );
      } else if (filter.orderBy === SortBy.NEWEST) {
        apartmentsData.sort(
          (a, b) =>
            (b as Apartment).createdDate.seconds -
            (a as Apartment).createdDate.seconds
        );
      } else if (filter.orderBy === SortBy.OLDEST) {
        apartmentsData.sort(
          (a, b) =>
            (a as Apartment).createdDate.seconds -
            (b as Apartment).createdDate.seconds
        );
      }

      const keyword = filter.keyword.toLowerCase();
      apartmentsData = apartmentsData.filter((apartment) =>
        (apartment as Apartment).name.toLowerCase().includes(keyword)
      );

      setApartments(apartmentsData as Apartment[]);
      setTotalItems((apartmentsData as Apartment[]).length);

      setDisplayedItems(
        paginate(apartmentsData as Apartment[], 1, itemPerPage) as Apartment[]
      );
      setCurrentPage(1);
    };

    getAllApartments();
  }, [filter.keyword, filter.orderBy]);

  useEffect(() => {
    setDisplayedItems(paginate(apartments, currentPage, itemPerPage));
  }, [currentPage]);

  const deleteApartment = () => {
    setApartments(apartments.filter((ap) => ap.id !== deleteId));
    deleteDocument("apartments", deleteId);
    setDeleteId("");
  };

  function handleChangePage(page: number): void {
    setCurrentPage(page);
  }

  return (
    <>
      {deleteId && (
        <DeleteConfirmationModal
          setDeleteId={setDeleteId}
          onDelete={deleteApartment}
        />
      )}

      <div className="mt-24 overflow-x-auto shadow-md  sm:rounded-lg">
        <Filterbar setFilter={setFilter} />
        <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Aparment name
              </th>

              <th scope="col" className="px-6 py-3">
                Price/mo
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((apartment, index) => (
              <ApartmentRow
                apartment={apartment}
                setDeleteId={setDeleteId}
                key={index}
              />
            ))}
          </tbody>
        </table>
        {totalItems > itemPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems as number}
            initialPage={currentPage as number}
            itemsPerPage={itemPerPage as number}
            onPageChange={handleChangePage}
          />
        )}
      </div>
    </>
  );
};

export default ApartmentsList;
