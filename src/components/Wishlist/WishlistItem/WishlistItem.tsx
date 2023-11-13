import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import "./WishlistItem.scss";

import tmpImg from "../../../assets/FeatureSection/feature-item-image.jpg";

const WishlistItem = () => {
  return (
    <div className="wishlist-item">
      <div className="wishlist-item__img-container">
        <img src={tmpImg} alt="item" />
      </div>
      <div className="wishlist-item__info">
        <p className="name">Equestrian Family Home</p>
        <p className="address">New York City, CA, USA</p>
        <p className="price">$1400</p>
        <p className="amenities">
          <span>1 bed</span>
          <span>1 bath</span>
          <span>1200 sqm</span>
        </p>
        <p className="type">
          <em>Apartment</em>
        </p>
      </div>
      <div className="wishlist-item__actions">
        <FaRegTrashAlt className="icon" />
      </div>
    </div>
  );
};

export default WishlistItem;
