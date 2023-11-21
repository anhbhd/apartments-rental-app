import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import "./WishlistItem.scss";

import { Link } from "react-router-dom";
import { WishListItem } from "../../../type/WishListItem";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { Apartment } from "../../../type/Apartment";

interface IWishlistItemProps {
  wishlistItem: WishListItem;
  onDeleteItem: (id: string) => void;
}

const WishlistItem = ({ wishlistItem, onDeleteItem }: IWishlistItemProps) => {
  const [apartmentInWishlist, setApartmentInWishList] =
    useState<Apartment | null>(null);

  useEffect(() => {
    const fetchDataOfWishlistItem = async () => {
      const apartmentDocRef = doc(db, "apartments", wishlistItem.apartmentId);

      const apartmentDocSnapshot = await getDoc(apartmentDocRef);
      // console.log(apartmentDocSnapshot.data(), apartmentDocSnapshot.id);

      const apartmentData = apartmentDocSnapshot.data();

      setApartmentInWishList({
        ...(apartmentData as Apartment),
        id: wishlistItem.apartmentId,
      });
    };
    fetchDataOfWishlistItem();
  }, [wishlistItem?.apartmentId]);

  const handleDeleteWishlistItem = async () => {
    try {
      onDeleteItem(wishlistItem.id);
      const docRef = doc(db, "wishlist", wishlistItem.id);
      await deleteDoc(docRef);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="wishlist-item">
      <div className="wishlist-item__img-container">
        <img src={apartmentInWishlist?.avatar} alt="item" />
      </div>
      <div className="wishlist-item__info">
        <Link
          style={{ color: "black" }}
          to={`/apartments/${apartmentInWishlist?.id}`}
        >
          <p className="name">{apartmentInWishlist?.name}</p>
        </Link>
        <p className="address">{apartmentInWishlist?.detailedAddress}</p>
        <p className="price">${apartmentInWishlist?.pricePerMonth}</p>
        <p className="amenities">
          <span>
            {apartmentInWishlist?.beds}{" "}
            {apartmentInWishlist && apartmentInWishlist.beds > 1
              ? "beds"
              : "bed"}
          </span>
          <span>
            {apartmentInWishlist?.baths}{" "}
            {apartmentInWishlist && apartmentInWishlist.baths > 1
              ? "baths"
              : "bath"}
          </span>
          <span>{apartmentInWishlist?.area} sqm</span>
        </p>
        <p className="type">
          <em>Apartment</em>
        </p>
      </div>
      <div className="wishlist-item__actions">
        <FaRegTrashAlt
          onClick={handleDeleteWishlistItem}
          style={{ color: "rgba(215, 86, 66, 0.8)" }}
          className="icon"
        />
      </div>
    </div>
  );
};

export default WishlistItem;
