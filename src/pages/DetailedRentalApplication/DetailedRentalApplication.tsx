import React from "react";

import "./DetailedRentalApplication.scss";
import RentalAppContent from "../../components/DetailedRentalApplication/RentalAppContent/RentalAppContent";

const DetailedRentalApplication = () => {
  return (
    <main className="detailed-rental-app">
      <h3 className="detailed-rental-app__title">
        <span>Detailed</span> Application/Request
      </h3>
      <RentalAppContent />
    </main>
  );
};

export default DetailedRentalApplication;
