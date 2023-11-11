import React from "react";

import { BiBed, BiBath, BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./FeatureItem.scss";
interface IFeatureProps {
  imgItem: string;
  className?: string;
}

const FeatureItem = ({ imgItem, className }: IFeatureProps) => {
  return (
    <div className={`feature-item ${className}`}>
      <div className="feature-item__image">
        <img src={imgItem} alt="item" />
        <span className="price-per-month">
          <strong>$1400/</strong>mo
        </span>
      </div>
      {/* delemiter */}
      <div className="feature-item__info">
        <p className="name">Equestrian Family Home</p>
        <p className="location">New York City, CA, USA</p>
        <div className="interior">
          <span className="interior__bed">
            <BiBed className="icon" /> <span>1 bed</span>
          </span>
          <span className="interior__bath">
            <BiBath className="icon" />2 bath
          </span>
          <span className="interior__square-metre">
            <BiHomeAlt className="icon" />
            1200 sqm
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

export default FeatureItem;
