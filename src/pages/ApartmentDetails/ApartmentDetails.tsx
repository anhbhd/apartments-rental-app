import React from "react";

import "./ApartmentDetails.scss";
import { AiOutlineHeart } from "react-icons/ai";
import ImagesShow from "../../components/ApartmentDetails/ImagesShow/ImagesShow";

import PropertyDescription from "../../components/ApartmentDetails/PropertyDescription/PropertyDescription";
import CommentsSection from "../../components/ApartmentDetails/CommentSection/CommentsSection";
import Related from "../../components/ApartmentDetails/Related/Related";

const ApartmentDetails = () => {
  return (
    <main className="apartment-details-page">
      <div className="apartment-details">
        <div className="apartment-details__info">
          <div className="text-info">
            <h3 className="name">Equestrian Family Home</h3>
            <p className="address">New York City, CA, USA</p>
            <p className="created-date">Created date: 26/1/2023</p>
            <p className="amenities">
              <span>1 bed</span>
              <span>1 bath</span>
              <span>1200 sqm</span>
            </p>
          </div>
          <div className="action-and-price">
            <p className="action">
              <AiOutlineHeart className="icon " />
              {/* <AiFillHeart className="icon " style={{ color: "#eb6753" }} /> */}
            </p>
            <h3 className="price">
              $14,000/<em>month</em>
            </h3>
          </div>
        </div>

        {/* images showing */}
        <ImagesShow />

        {/* property description */}
        <PropertyDescription />

        <CommentsSection />

        <Related />
      </div>
    </main>
  );
};

export default ApartmentDetails;
