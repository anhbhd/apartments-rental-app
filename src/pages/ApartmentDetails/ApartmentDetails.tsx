import React, { useEffect, useState } from "react";

import "./ApartmentDetails.scss";
import { AiOutlineHeart } from "react-icons/ai";
import ImagesShow from "../../components/ApartmentDetails/ImagesShow/ImagesShow";

import PropertyDescription from "../../components/ApartmentDetails/PropertyDescription/PropertyDescription";
import CommentsSection from "../../components/ApartmentDetails/CommentSection/CommentsSection";
import Related from "../../components/ApartmentDetails/Related/Related";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { Apartment } from "../../type/Apartment";
import { formatter } from "./../../utils/FormatMoney";
import { secondsToDateTime } from "../../utils/SecondToDate";

const ApartmentDetails = () => {
  const { pathname } = useLocation();

  const apartmentId = pathname.split("/").pop();
  const [apartment, setApartment] = useState<Apartment>();
  // get the apartment doc

  useEffect(() => {
    const getApartment = async () => {
      const apartmentDocRef = doc(db, `apartments/${apartmentId}`);
      const apartmentSnapshot = await getDoc(apartmentDocRef);
      const apartmentData = await apartmentSnapshot.data();

      setApartment({
        ...(apartmentData as Apartment),
        id: apartmentId as string,
      });
    };
    getApartment();
  }, [apartmentId]);

  return (
    <main className="apartment-details-page">
      <div className="apartment-details">
        <div className="apartment-details__info">
          <div className="text-info">
            <h3 className="name">{apartment?.name}</h3>
            <p className="address">{apartment?.detailedAddress}</p>
            <p className="created-date">Created date: 26/1/2023</p>
            <p className="amenities">
              <span>
                {apartment?.beds}{" "}
                {(apartment?.beds as number) > 1 ? "beds" : "bed"}
              </span>
              <span>
                {apartment?.baths}{" "}
                {(apartment?.baths as number) > 1 ? "baths" : "bath"}
              </span>
              <span>{apartment?.area} sqm</span>
            </p>
          </div>
          <div className="action-and-price">
            <p className="action">
              <AiOutlineHeart className="icon " />
              {/* <AiFillHeart className="icon " style={{ color: "#eb6753" }} /> */}
            </p>
            <h3 className="price">
              {apartment && formatter.format(apartment.pricePerMonth)}/
              <em>month</em>
            </h3>
            <button className="rent-btn">Rent</button>
          </div>
        </div>

        {/* images showing */}
        <ImagesShow images={apartment?.images as string[]} />

        {/* property description */}
        <PropertyDescription apartment={apartment as Apartment} />

        <CommentsSection />

        <Related />
      </div>
    </main>
  );
};

export default ApartmentDetails;
