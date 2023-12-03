import React, { useEffect, useState } from "react";
import "./AppItem.scss";
import { Link } from "react-router-dom";
import { RentalApplication } from "../../../../Type/RentalApplication";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase_config";
import { Apartment } from "../../../../Type/Apartment";
import { secondsToDateTime } from "../../../../utils/SecondToDate";

interface IAppItemProps {
  rentalApplication: RentalApplication;
}

const AppItem = ({ rentalApplication }: IAppItemProps) => {
  const [apartment, setApartment] = useState<Apartment>();
  useEffect(() => {
    const fetchThisApartment = async () => {
      const apartmentId = rentalApplication.apartmentId;
      const apartmentDocRef = doc(db, `apartments/${apartmentId}`);
      const apartmentSnapshot = await getDoc(apartmentDocRef);
      const apartmentData = apartmentSnapshot.data();

      setApartment({
        ...(apartmentData as Apartment),
        id: apartmentId as string,
      });
    };
    fetchThisApartment();
  }, [rentalApplication.apartmentId]);
  return (
    <div className="app-item">
      <span className="app-item__code">
        <strong>{rentalApplication.id}</strong>
      </span>
      <span className="app-item__name">{apartment?.name}</span>
      <span className="app-item__created-date">
        {secondsToDateTime(rentalApplication.createdDate.seconds)}
      </span>
      <Link
        to={`/my_rental_apps/${rentalApplication?.id}`}
        className="app-item__view-details"
      >
        View details
      </Link>
    </div>
  );
};

export default AppItem;
