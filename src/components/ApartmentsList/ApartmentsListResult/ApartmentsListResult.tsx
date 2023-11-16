import React from "react";
import ApartmentItem from "../../FeaturesList/ApartmentItem/ApartmentItem";

import { Apartment } from "../../../type/Apartment";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase_config";

interface IApartmentsListResultProps {
  className?: string;
  apartmentsList: Apartment[];
}
const ApartmentsListResult = ({
  className,
  apartmentsList,
}: IApartmentsListResultProps) => {
  return (
    <div className={`apartments-result ${className || ""}`}>
      {apartmentsList.map((apartment) => (
        <ApartmentItem apartment={apartment} key={apartment.id} />
      ))}
    </div>
  );
};

export default ApartmentsListResult;
