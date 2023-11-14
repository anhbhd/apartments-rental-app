import React from "react";

import "./Related.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import FeatureItem from "../../FeaturesList/FeatureItem/FeatureItem";

import imgItem from "./../../../assets/FeatureSection/feature-item-image.jpg";

const Related = () => {
  return (
    <section className="related">
      <h3 className="related__text-lg">You might be interested</h3>
      <p className="related__text-sm">Find out some more our features</p>
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
    </section>
  );
};

export default Related;
