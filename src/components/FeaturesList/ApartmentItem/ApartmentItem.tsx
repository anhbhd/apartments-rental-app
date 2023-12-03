import React, { useEffect, useState } from "react";

import { BiBed, BiBath, BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Apartment } from "../../../Type/Apartment";
import "./ApartmentItem.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { StarFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
interface IApartmentProps {
  className?: string;
  apartment: Apartment;
}

const ApartmentItem = ({ className, apartment }: IApartmentProps) => {
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);
  const [like, setLike] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const [category, setCategory] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryDocRef = doc(db, `categories/${apartment.categoryId}`);
        const categorySnapshot = await getDoc(categoryDocRef);

        setCategory(categorySnapshot.data()?.name);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchCategoryName();
  }, [apartment.categoryId, apartment.id]);

  useEffect(() => {
    // try to fetch a record in wishlist if the record contain this item id and the user id exist
    const fetchLikeStateOfUserToThisItem = async () => {
      if (currentUser) {
        try {
          const wishlistcollectionRef = collection(db, "wishlist");
          const q = query(
            wishlistcollectionRef,
            where("apartmentId", "==", apartment.id),
            where("userId", "==", currentUser.uid)
          );
          const wishlistCollectionSnapshot = await getDocs(q);
          // console.log(wishlistCollectionSnapshot.docs.at(0)?.data());
          const fetchedWishlistItemId =
            wishlistCollectionSnapshot.docs.at(0)?.id;
          // console.log(wishlistCollectionSnapshot.docs.at(0)?.id);
          if (fetchedWishlistItemId) {
            setLike(true);
            setWishlistItemId(fetchedWishlistItemId);
          }
        } catch (err: any) {
          console.log(err);
        }
      } else return;
    };
    fetchLikeStateOfUserToThisItem();
  }, [apartment.id, currentUser, like]);

  const handleDislikeItem = async () => {
    if (currentUser) {
      setLike(false);
      await deleteDoc(doc(db, "wishlist", wishlistItemId as string));
    } else {
      toast.info("You need to login first", {
        position: "bottom-right",
        style: {
          fontSize: "1.4rem",
        },
        autoClose: 1500,
      });
      navigate("/login");
    }
  };
  const handleLikeItem = async () => {
    if (currentUser) {
      setLike(true);
      await addDoc(collection(db, "wishlist"), {
        userId: currentUser.uid,
        createdDate: Timestamp.now(),
        apartmentId: apartment.id,
      });
    } else {
      toast.info("You need to login first", {
        position: "bottom-right",
        style: {
          fontSize: "1.4rem",
        },
        autoClose: 1500,
      });
      navigate("/login");
    }
    // console.log(newDoc);
  };

  return (
    <div className={`feature-item ${className}`}>
      <div className="feature-item__image">
        <img src={apartment.avatar} alt="item" />
        <span className="price-per-month">
          <strong>${apartment.pricePerMonth}/</strong>mo
        </span>
        {apartment.avgRate && (
          <span className="stars-rated">
            <strong>{apartment.avgRate}</strong>
            <StarFilled style={{ color: "gold" }} />
          </span>
        )}
      </div>
      {/* delemiter */}
      <div className="feature-item__info">
        <Link to={`/apartments/${apartment.id}`} className="name">
          <p>{apartment.name}</p>
        </Link>
        <p className="location">{apartment.detailedAddress}</p>
        <div className="interior">
          <span className="interior__bed">
            <BiBed className="icon" />{" "}
            <span>
              {apartment.beds} {apartment.beds > 1 ? "beds" : "bed"}
            </span>
          </span>
          <span className="interior__bath">
            <BiBath className="icon" />
            {apartment.baths} {apartment.baths > 1 ? "baths" : "bath"}
          </span>
          <span className="interior__square-metre">
            <BiHomeAlt className="icon" />
            {apartment.area} sqm
          </span>
        </div>
        <div className="actions">
          <span className="actions__quantity-available">{category}</span>
          <span className="actions__watch-later">
            {like ? (
              <AiFillHeart
                className="icon"
                onClick={handleDislikeItem}
                style={{ color: "#eb6753" }}
              />
            ) : (
              <AiOutlineHeart onClick={handleLikeItem} className="icon" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApartmentItem;
