import React, { useEffect, useState } from "react";
import ApartmentRow from "../../../components/ADMIN/ApartmentManagement/ApartmentRow/ApartmentRow";
import { Apartment } from "../../../type/Apartment";
import { getDataCollection } from "../../../services/getDataCollection";
import { deleteDocument } from "../../../services/deleteDocument";

import Filterbar from "../../../components/ADMIN/ApartmentManagement/Filterbar/Filterbar";

import { paginate } from "../../../utils/paginate";

import { SortBy } from "../../../components/ApartmentsList/ResultAndSortBy/SortBy";
import { Pagination, Spin } from "antd";
import Modal from "antd/es/modal/Modal";

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
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
    };

    getAllApartments();
  }, [filter.keyword, filter.orderBy]);

  useEffect(() => {
    setDisplayedItems(paginate(apartments, currentPage, itemPerPage));
  }, [currentPage, apartments]);

  const deleteApartment = () => {
    setApartments(apartments.filter((ap) => ap.id !== deleteId));
    deleteDocument("apartments", deleteId);
    setDeleteId("");
    setModalDeleteIsOpen(false);
  };

  function handleChangePage(page: number): void {
    setCurrentPage(page);
  }
  const handleCancelDelete = () => {
    setDeleteId("");
    setModalDeleteIsOpen(false);
  };
  return (
    <>
      <Modal
        title="Are you sure to delete this apartment?"
        style={{ top: 20 }}
        open={modalDeleteIsOpen}
        okText={"Delete"}
        okButtonProps={{ danger: true }}
        onOk={deleteApartment}
        onCancel={handleCancelDelete}
      >
        <p>This apartment is going to be deleted forever</p>
      </Modal>
      <div className="mt-24 overflow-x-auto" style={{ minHeight: "500px" }}>
        <Filterbar setFilter={setFilter} />

        {isLoading ? (
          <div className="flex justify-center h-80 items-center">
            <Spin size="large" />
          </div>
        ) : (
          <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Apartment name
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
                  onOpenModal={setModalDeleteIsOpen}
                  apartment={apartment}
                  setDeleteId={setDeleteId}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {totalItems > itemPerPage && (
        <div className="mt-8 flex justify-center">
          <Pagination
            onChange={handleChangePage}
            total={totalItems}
            current={currentPage}
            defaultPageSize={itemPerPage}
          />
        </div>
      )}
    </>
  );
};

export default ApartmentsList;
