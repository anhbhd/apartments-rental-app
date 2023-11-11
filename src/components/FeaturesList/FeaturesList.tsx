import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FeatureItem from "./FeatureItem/FeatureItem";
import imgItem from "./../../assets/FeatureSection/feature-item-image.jpg";
import "./FeaturesList.scss";

const FeaturesList = () => {
  return (
    <div className="features-list">
      <h3 className="features-list__title-section">
        Discover Our <span>Featured Listings</span>
      </h3>
      <p className="features-list__small-quote">
        Aliquam lacinia diam quis lacus euismod
      </p>
      <Swiper
        className="features-list__feature-item-container"
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1350: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide>
          <FeatureItem imgItem={imgItem} />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureItem imgItem={imgItem} />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureItem imgItem={imgItem} />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureItem imgItem={imgItem} />
        </SwiperSlide>
        <SwiperSlide>
          <FeatureItem imgItem={imgItem} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FeaturesList;
