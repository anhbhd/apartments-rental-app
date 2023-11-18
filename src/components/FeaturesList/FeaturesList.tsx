import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FeatureItem from "./ApartmentItem/ApartmentItem";

import "./FeaturesList.scss";
import { Apartment } from "../../type/Apartment";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { useAuth } from "../../context/AuthContext";

const FeaturesList = () => {
  const [featuresList, setFeatureList] = useState<Apartment[]>([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFeaturesList = async () => {
      const data: Apartment[] = [];
      try {
        const apartmentCollectionRef = collection(db, "apartments");

        const q = query(
          apartmentCollectionRef,
          limit(7),
          orderBy("createdDate")
        );

        const apartmentCollectionSnapshot = await getDocs(q);

        apartmentCollectionSnapshot.docs.forEach((doc) => {
          data.push({
            ...(doc.data() as Apartment),
            id: doc.id as string,
          });
        });

        setFeatureList(data);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchFeaturesList();
  }, []);

  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     const wishlistRef = collection(db, "wishlist");
  //     const q = query(wishlistRef, where("userId", "==", currentUser.uid));
  //     const userWishlistSnapshot = await getDocs(q);

  //     const items = userWishlistSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setWishlistItems(items);
  //   };

  //   fetchWishlist();
  // }, [currentUser.uid]);

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
