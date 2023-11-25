import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FeatureItem from "./ApartmentItem/ApartmentItem";

import "./FeaturesList.scss";
import { Apartment } from "../../type/Apartment";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { mapCollectionToArrayObject } from "../../utils/Mapper";

const FeaturesList = () => {
  const [featuresList, setFeatureList] = useState<Apartment[]>([]);

  useEffect(() => {
    const fetchFeaturesList = async () => {
      try {
        const apartmentCollectionRef = collection(db, "apartments");

        const q = query(
          apartmentCollectionRef,
          limit(7),
          orderBy("createdDate")
        );

        const apartmentCollectionSnapshot = await getDocs(q);

        const data: Apartment[] = mapCollectionToArrayObject(
          apartmentCollectionSnapshot
        );

        setFeatureList(data);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchFeaturesList();
  }, []);

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
          680: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1350: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {featuresList.map((apartment) => (
          <SwiperSlide key={apartment.id}>
            <FeatureItem apartment={apartment} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturesList;
