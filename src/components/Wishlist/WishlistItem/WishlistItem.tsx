import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import "./WishlistItem.scss";

import { Link } from "react-router-dom";
import { WishListItem } from "../../../type/WishListItem";
import { Apartment } from "../../../type/Apartment";
import { getDocument } from "../../../services/getDocument";
import { deleteDocument } from "../../../services/deleteDocument";
import { Category } from "../../../type/Category";

interface IWishlistItemProps {
  wishlistItem: WishListItem;
  onDeleteItem: (id: string) => void;
}

const WishlistItem = ({ wishlistItem, onDeleteItem }: IWishlistItemProps) => {
  const [apartmentInWishlist, setApartmentInWishList] =
    useState<Apartment | null>(null);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchDataOfWishlistItem = async () => {
      const apartmentData: Apartment = await getDocument(
        "apartments",
        wishlistItem.apartmentId
      );

      setApartmentInWishList(apartmentData);
    };
    fetchDataOfWishlistItem();
  }, [wishlistItem?.apartmentId]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryData: Category = await getDocument(
          "categories",
          apartmentInWishlist?.categoryId as string
        );
        setCategory(categoryData?.name);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchCategoryName();
  }, [apartmentInWishlist]);

  const handleDeleteWishlistItem = async () => {
    try {
      onDeleteItem(wishlistItem.id);
      await deleteDocument("wishlist", wishlistItem.id);
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
            {apartmentInWishlist?.beds}
            {apartmentInWishlist && apartmentInWishlist.beds > 1
              ? "beds"
              : "bed"}
          </span>
          <span>
            {apartmentInWishlist?.baths}
            {apartmentInWishlist && apartmentInWishlist.baths > 1
              ? "baths"
              : "bath"}
          </span>
          <span>{apartmentInWishlist?.area} sqm</span>
        </p>
        <p className="type">
          <em>{category}</em>
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
