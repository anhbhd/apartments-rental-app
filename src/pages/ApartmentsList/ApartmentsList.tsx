import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase_config";
import { collection, getDocs } from "@firebase/firestore";
import { Apartment } from "../../type/Apartment";

import Filterbar from "../../components/ApartmentsList/Filterbar/Filterbar";
import ApartmentsListResult from "../../components/ApartmentsList/ApartmentsListResult/ApartmentsListResult";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";

import "./ApartmentsList.scss";
import ResulNumstAndSortBy from "../../components/ApartmentsList/ResultAndSortBy/ResulNumstAndSortBy";
import { Backdrop } from "../../utils/Backdrop/Backdrop";
import { SortBy } from "../../components/ApartmentsList/ResultAndSortBy/SortBy";
import { FilterbarType } from "../../type/Filterbar";
import { Option } from "../../type/Option";
import { orderBy, query, where } from "firebase/firestore";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
import { getDataCollection } from "../../services/getDataCollection";
import { mapCollectionToArrayObject } from "../../utils/Mapper";
import { paginate } from "../../utils/paginate";

const initialFilterValue: FilterbarType = {
  sortby: SortBy.ALL,
  keyword: "",
  categories: [],
  price: {
    from: 0,
    to: 0,
  },
  canBeRented: "",
  stars: 0,
  cityCode: 0,
  districtCode: 0,
};

const ApartmentsList: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [toggleFilterBar, setToggleFilterBar] = useState<boolean>(false);

  const [apartmentListFilter, setApartmentListFilter] =
    useState<FilterbarType>(initialFilterValue);
  const [clearFilterClicked, setClearFilterClicked] = useState<boolean>(false);
  const [toggleSearchBtn, setToggleSearchBtn] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [itemsDisplayedOnPage, setItemDisplayOnPage] = useState<Apartment[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 4;

  console.log(apartmentListFilter);

  useEffect(() => {
    async function fetchApartmentsData(): Promise<[Apartment[], number]> {
      return await getDataCollection<Apartment>("apartments");
    }
    const getAllApartments = async () => {
      const [apartmentsData, totalItem] = await fetchApartmentsData();

      setApartments(apartmentsData);
      setTotalItems(totalItem);
      // !!Paginate
      setItemDisplayOnPage(paginate(apartmentsData, currentPage, itemsPerPage));
      setIsLoading(false);
    };

    getAllApartments();
  }, []);

  useEffect(() => {
    // !!Paginate
    setItemDisplayOnPage(paginate(apartments, currentPage, itemsPerPage));
  }, [currentPage]);

  const handleSearch = async () => {
    try {
      const apartmentsCollectionRef = collection(db, "apartments");

      let q = query(apartmentsCollectionRef);

      // Filter by categories
      if (apartmentListFilter.categories.length) {
        q = query(q, where("categoryId", "in", apartmentListFilter.categories));
      }

      // Filter by average rating
      if (apartmentListFilter.stars) {
        q = query(q, where("avgRate", "==", apartmentListFilter.stars));
      }
      if (apartmentListFilter.cityCode) {
        q = query(q, where("city", "==", apartmentListFilter.cityCode));
      }
      if (apartmentListFilter.districtCode) {
        q = query(q, where("district", "==", apartmentListFilter.districtCode));
      }
      if (apartmentListFilter.sortby === SortBy.NEWEST) {
        q = query(q, orderBy("createdDate", "desc"));
      } else if (apartmentListFilter.sortby === SortBy.OLDEST) {
        q = query(q, orderBy("createdDate", "asc"));
      } else if (apartmentListFilter.sortby === SortBy.HIGHTOLOWPRICE) {
        q = query(q, orderBy("pricePerMonth", "desc"));
      } else if (apartmentListFilter.sortby === SortBy.LOWTOHIGHPRICE) {
        q = query(q, orderBy("pricePerMonth", "asc"));
      }

      //todo Query and return data
      const apartmentsSnapshot = await getDocs(q);

      let apartmentsData: Apartment[] =
        mapCollectionToArrayObject(apartmentsSnapshot);

      //todo Filter by keyword
      if (apartmentListFilter.keyword) {
        const keyword = apartmentListFilter.keyword.toLowerCase();
        apartmentsData = apartmentsData.filter((apartment) =>
          apartment.name.toLowerCase().includes(keyword)
        );
      }
      //todo Filter by price range
      if (apartmentListFilter.price.from) {
        apartmentsData = apartmentsData.filter(
          (apartment) =>
            apartment.pricePerMonth >= apartmentListFilter.price.from
        );
      }

      if (apartmentListFilter.price.to) {
        apartmentsData = apartmentsData.filter(
          (apartment) => apartment.pricePerMonth <= apartmentListFilter.price.to
        );
      }
      if (apartmentListFilter.canBeRented) {
        apartmentsData = apartmentsData.filter(
          (apartment) => !apartment.rented
        );
      }
      setTotalItems(apartmentsData.length);
      setApartments(apartmentsData);
      setItemDisplayOnPage(apartmentsData.slice(0, itemsPerPage));
      setToggleSearchBtn(!toggleSearchBtn);

      // console.log(apartmentsData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseFilterBar = () => {
    setToggleFilterBar(false);
  };
  const handleSelectSortBy = (sortbyOption: Option) => {
    setApartmentListFilter((prevState: FilterbarType) => ({
      ...(prevState as FilterbarType),
      sortby: sortbyOption.value as SortBy,
    }));
  };

  const handleClearFilter = () => {
    setApartmentListFilter(initialFilterValue);
    setClearFilterClicked(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    // Smooth scroll to top when apartments change
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  }, [apartments, currentPage]);
  return (
    <main className="aparments-list">
      <div className="aparments-list__textheader">
        <h3 className="header--bigtext">Available apartments for rent</h3>
        <p className="header--smalltext">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      {isLoading && <FullLoadingScreen />}

      <div className="aparments-list__main-content">
        {!isLoading && (
          <>
            <ResulNumstAndSortBy
              totalItems={totalItems}
              clearFilterClicked={clearFilterClicked}
              setClearFilterClicked={setClearFilterClicked}
              onClick={() => setToggleFilterBar(true)}
              className="result-sort"
              onSelectSortBy={handleSelectSortBy}
            />
            {toggleFilterBar && <Backdrop onClose={handleCloseFilterBar} />}
            <Filterbar
              onCloseFilterBar={handleCloseFilterBar}
              className={toggleFilterBar ? "visible" : ""}
              onClearFilter={handleClearFilter}
              onChangeFilter={setApartmentListFilter}
              onSearch={handleSearch}
            />
            <ApartmentsListResult apartmentsList={itemsDisplayedOnPage} />
          </>
        )}
      </div>

      {!isLoading && (
        <nav className="aparments-list__pagination">
          {totalItems > itemsPerPage && (
            <Pagination
              toggleSearchBtn={toggleSearchBtn}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              initialPage={currentPage}
            />
          )}
        </nav>
      )}
    </main>
  );
};

export default ApartmentsList;
