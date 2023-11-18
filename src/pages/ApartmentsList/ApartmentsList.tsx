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

const ApartmentsList: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [toggleFilterBar, setToggleFilterBar] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState("");

  const handleCloseFilterBar = () => {
    setToggleFilterBar(false);
  };

  useEffect(() => {
    const apartmentsCollectionRef = collection(db, "apartments");
    const getAllApartments = async () => {
      const apartmentsSnapshot = await getDocs(apartmentsCollectionRef);
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
    };
    getAllApartments();
  }, []);

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
          onClick={() => setToggleFilterBar(true)}
          className="result-sort"
        />
        {toggleFilterBar && <Backdrop onClose={handleCloseFilterBar} />}
        <Filterbar
          onCloseFilterBar={handleCloseFilterBar}
          className={toggleFilterBar ? "visible" : ""}
        />
        <ApartmentsListResult apartmentsList={apartments} />
      </div>

      <nav className="aparments-list__pagination">
        <Pagination />
      </nav>
    </main>
  );
};

export default ApartmentsList;
