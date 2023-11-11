import React from "react";

import Filterbar from "../../components/ApartmentsList/Filterbar/Filterbar";
import ApartmentsListResult from "../../components/ApartmentsList/ApartmentsListResult/ApartmentsListResult";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";

import "./ApartmentsList.scss";
const ApartmentsList: React.FC = () => {
  return (
    <main className="aparments-list">
      <div className="aparments-list__textheader">
        <h3 className="header--bigtext">Available apartments for rent</h3>
        <p className="header--smalltext">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="aparments-list__main-content">
        <Filterbar />
        <ApartmentsListResult />
      </div>

      <nav className="aparments-list__pagination">
        <Pagination />
      </nav>
    </main>
  );
};

export default ApartmentsList;
