import React from "react";

import { BiBed, BiBath, BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Apartment } from "../../../type/Apartment";
import "./ApartmentItem.scss";
import { Link } from "react-router-dom";
interface IApartmentProps {
  className?: string;
  apartment: Apartment;
}

const ApartmentItem = ({ className, apartment }: IApartmentProps) => {
  return (
    <div className={`feature-item ${className}`}>
      <div className="feature-item__image">
        <img src={apartment.avatar} alt="item" />
        <span className="price-per-month">
          <strong>${apartment.pricePerMonth}/</strong>mo
        </span>
      </div>
      {/* delemiter */}
      <div className="feature-item__info">
        <Link to={`/apartments/${apartment.id}`} className="name">
          <p>{apartment.name}</p>
        </Link>
        <p className="location">{apartment.detailedAddress}</p>
        <div className="interior">
          <span className="interior__bed">
            <BiBed className="icon" />{" "}
            <span>
              {apartment.beds} {apartment.beds > 1 ? "beds" : "bed"}
            </span>
          </span>
          <span className="interior__bath">
            <BiBath className="icon" />
            {apartment.baths} {apartment.baths > 1 ? "baths" : "bath"}
          </span>
          <span className="interior__square-metre">
            <BiHomeAlt className="icon" />
            {apartment.area} sqm
          </span>
        </div>
        <div className="actions">
          <span className="actions__quantity-available">Apartment</span>
          <span className="actions__watch-later">
            <AiOutlineHeart className="icon " />
            {/* <AiFillHeart className="icon " style={{ color: "#eb6753" }} /> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApartmentItem;
