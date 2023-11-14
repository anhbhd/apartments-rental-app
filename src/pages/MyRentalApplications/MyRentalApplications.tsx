import React from "react";

import "./MyRentalApplication.scss";
import Filter from "../../components/MyRentalApplication/Filter/Filter";
import ApplicationsList from "../../components/MyRentalApplication/ApplicationsList/ApplicationsList";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";
const MyRentalApplications = () => {
  return (
    <main className="my-rental-app">
      <Filter />
      <ApplicationsList />
      <Pagination />
    </main>
  );
};

export default MyRentalApplications;
