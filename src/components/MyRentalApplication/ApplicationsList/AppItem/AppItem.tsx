import React from "react";
import "./AppItem.scss";
const AppItem = () => {
  return (
    <div className="app-item">
      <span className="app-item__code">
        <strong>codetets1xasy</strong>
      </span>
      <span className="app-item__name">Best house ever</span>
      <span className="app-item__created-date">26/11/2020</span>
      <span className="app-item__view-details">View details</span>
    </div>
  );
};

export default AppItem;
