import React from "react";
import "./Wishlist.scss";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";
import WishlistItem from "../../components/Wishlist/WishlistItem/WishlistItem";
const Wishlist = () => {
  return (
    <main className="wishlist-page">
      <h3 className="wishlist-page__header-text">
        Your <span>Wishlist</span>
      </h3>
      <p className="wishlist-page__clear-button">Clear all</p>

      <div className="wishlist-page__wishlist-container">
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
      </div>

      <Pagination />
    </main>
  );
};

export default Wishlist;
