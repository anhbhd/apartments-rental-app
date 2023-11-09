import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { BiBed, BiBath, BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import "./FeatureItem.scss";
interface IFeatureProps {
  imgItem: string;
}

const FeatureItem = ({ imgItem }: IFeatureProps) => {
  return (
    <div className="feature-item">
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
          <span className="actions__quantity-available">2 available</span>
          <span className="actions__watch-later">
            <AiOutlineHeart className="icon " />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
