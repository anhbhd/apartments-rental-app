import { useEffect, useState } from "react";
import "./Wishlist.scss";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";
import WishlistItem from "../../components/Wishlist/WishlistItem/WishlistItem";
import { WishListItem } from "../../type/WishListItem";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { useAuth } from "../../context/AuthContext";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishListItem[]>([]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleDeleteWishlist = (id: string) => {
    setWishlist(
      wishlist.filter((item) => {
        return item.id !== id;
      })
    );
  };

  useEffect(() => {
    const fetchUserWishlist = async () => {
      const wishlistRef = collection(db, "wishlist");
      const q = query(wishlistRef, where("userId", "==", currentUser.uid));
      const userWishlistSnapshot = await getDocs(q);

      const items = userWishlistSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as WishListItem)
      );
      setWishlist(items);
      setIsLoading(false);
    };

    fetchUserWishlist();
  }, [currentUser.uid]);

  const handleClearAllWishlist = async () => {
    setWishlist([]);
    try {
      const q = query(
        collection(db, "wishlist"),
        where("userId", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <main className="wishlist-page">
      <h3 className="wishlist-page__header-text">
        Your <span>Wishlist</span>
      </h3>
      {isLoading && <FullLoadingScreen />}
      {!isLoading && (
        <>
          {wishlist.length > 0 && (
            <p
              onClick={handleClearAllWishlist}
              className="wishlist-page__clear-button"
            >
              Clear all
            </p>
          )}
          <div className="wishlist-page__wishlist-container">
            {wishlist.length < 1 && (
              <p style={{ fontSize: "2rem" }}>Your wishlist is empty</p>
            )}
            {wishlist.map((wishlistItem) => (
              <WishlistItem
                onDeleteItem={handleDeleteWishlist}
                wishlistItem={wishlistItem}
                key={wishlistItem.id}
              />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </main>
  );
};

export default Wishlist;
