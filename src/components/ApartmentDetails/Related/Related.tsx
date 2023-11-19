import React from "react";

import "./Related.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import FeatureItem from "../../FeaturesList/ApartmentItem/ApartmentItem";
import { Apartment } from "../../../type/Apartment";

interface IRelatedProps {
  relatedList: Apartment[];
  className?: string;
  style?: React.CSSProperties;
}
const Related = ({ relatedList, className, style }: IRelatedProps) => {
  return (
    <section style={style} className={`related ${className}`}>
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
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1350: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {relatedList.map((apartment) => (
          <SwiperSlide key={apartment.id}>
            <FeatureItem apartment={apartment} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Related;
