import React from "react";
import AppItem from "./AppItem/AppItem";
import "./ApplicationsList.scss";
const ApplicationsList = () => {
  return (
    <section className="apps-list">
      <AppItem />
      <AppItem />
      <AppItem />
      <AppItem />
      <AppItem />
      <AppItem />
    </section>
  );
};

export default ApplicationsList;
