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
import { limit, query, where } from "firebase/firestore";

const initalFilterValue: FilterbarType = {
  sortby: SortBy.ALL,
  keyword: "",
  categories: [],
  price: {
    from: 0,
    to: 0,
  },
  stars: 0,
  cityCode: 0,
  districtCode: 0,
};

const ApartmentsList: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [toggleFilterBar, setToggleFilterBar] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState("");

  // object for filter
  const [apartmentListFilter, setApartmentListFilter] =
    useState<FilterbarType>(initalFilterValue);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItem, setTotalItems] = useState<number>(0);
  const [lastVisible, setLastVisible] = useState<any>();
  const itemsPerPage = 2; // Set your desired items per page

  console.log(apartmentListFilter);

  useEffect(() => {
    const getAllApartments = async () => {
      const apartmentsCollectionRef = collection(db, "apartments");
      const totalItem = (await getDocs(apartmentsCollectionRef)).size;
      let q = query(apartmentsCollectionRef, limit(itemsPerPage));
      const apartmentsSnapshot = await getDocs(q);

      console.log(totalItem);
      let apartmentsData: Apartment[] = [];
      if (apartmentsSnapshot) {
        apartmentsSnapshot.docs.forEach((doc: any) => {
          apartmentsData.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      }
      setApartments(apartmentsData);
      setLastVisible(apartmentsData[apartmentsData.length - 1]);
      setTotalItems(totalItem);
    };
    getAllApartments();
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

      // Filter and sort by price
      if (apartmentListFilter.price.from) {
        q = query(
          q,
          where("pricePerMonth", ">=", apartmentListFilter.price.from)
        );
      }
      if (apartmentListFilter.price.to) {
        q = query(
          q,
          where("pricePerMonth", "<=", apartmentListFilter.price.to)
        );
      }
      // get total before paginate
      const totalItems = (await getDocs(q)).size;

      // Paginate
      q = query(q, limit(itemsPerPage));

      // Query and return data
      const apartmentsSnapshot = await getDocs(q);

      let apartmentsData: Apartment[] = [];

      apartmentsSnapshot.forEach((doc) => {
        apartmentsData.push({
          ...(doc.data() as Apartment),
          id: doc.id,
        });
      });

      // Sort by date
      if (apartmentListFilter.sortby === SortBy.NEWEST) {
        apartmentsData.sort(
          (a, b) => b.createdDate.seconds - a.createdDate.seconds
        );
      } else if (apartmentListFilter.sortby === SortBy.OLDEST) {
        apartmentsData.sort(
          (a, b) => a.createdDate.seconds - b.createdDate.seconds
        );
      } else if (apartmentListFilter.sortby === SortBy.HIGHTOLOWPRICE) {
        apartmentsData.sort((a, b) => b.pricePerMonth - a.pricePerMonth);
      } else if (apartmentListFilter.sortby === SortBy.LOWTOHIGHPRICE) {
        apartmentsData.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
      }

      // Filter by keyword
      if (apartmentListFilter.keyword) {
        const keyword = apartmentListFilter.keyword.toLowerCase();
        apartmentsData = apartmentsData.filter((apartment) =>
          apartment.name.toLowerCase().includes(keyword)
        );
      }

      setTotalItems(totalItems);
      setApartments(apartmentsData);
      setLastVisible(apartmentsData[apartmentsData.length - 1]);
      console.log(apartmentsData);
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

  const [clearFilterClicked, setClearFilterClicked] = useState<boolean>(false);
  const handleClearFilter = () => {
    setApartmentListFilter({
      sortby: SortBy.ALL,
      keyword: "",
      categories: [],
      price: {
        from: 0,
        to: 0,
      },
      stars: 0,
      cityCode: 0,
      districtCode: 0,
    });
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
  }, [apartments]);
  return (
    <main className="aparments-list">
      <div className="aparments-list__textheader">
        <h3 className="header--bigtext">Available apartments for rent</h3>
        <p className="header--smalltext">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="aparments-list__main-content">
        <ResulNumstAndSortBy
          totalItems={totalItem}
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
        <ApartmentsListResult apartmentsList={apartments} />
      </div>

      <nav className="aparments-list__pagination">
        {totalItem > itemsPerPage && (
          <Pagination
            totalItems={totalItem} // Update to the actual total number of items
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            initialPage={currentPage}
          />
        )}
      </nav>
    </main>
  );
};

export default ApartmentsList;
