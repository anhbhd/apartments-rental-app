import React from "react";
import FeatureItem from "../../../components/FeaturesList/FeatureItem/FeatureItem";
import imgItem from "./../../../assets/FeatureSection/feature-item-image.jpg";

const ApartmentsListResult = () => {
  return (
    <div className="apartments-result">
      {Array.from({ length: 6 }, (_, index) => (
        <FeatureItem key={index} className="" imgItem={imgItem} />
      ))}
    </div>
  );
};

export default ApartmentsListResult;
