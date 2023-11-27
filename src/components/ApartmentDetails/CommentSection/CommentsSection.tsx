import React, { useEffect, useState } from "react";

import "./CommentsSection.scss";
import CommentItem from "./CommentItem/CommentItem";
import CommentForm from "./CommentForm/CommentForm";
import { Review } from "../../../type/Review";
import { useAuth } from "../../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { Apartment } from "../../../type/Apartment";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";

interface ICommentsSectionProps {
  reviews: Review[];
  totalReviews: number;
  onShowMore: () => void;
  apartment: Apartment | undefined;
  setToggleRefetchReviews: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentsSection: React.FC<ICommentsSectionProps> = ({
  reviews,
  totalReviews,
  onShowMore,
  apartment,
  setToggleRefetchReviews,
}) => {
  const [showedReviews, setShowedReviews] = useState<Review[]>([]);
  const [userAlreadyCommentOrDidNotRent, setUserAlreadyCommentOrDidNotRent] =
    useState<boolean>(true);
  const { currentUser } = useAuth();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (showedReviews.length < 3) {
      setShowedReviews(reviews.slice(0, 3));
    }
  }, [reviews]);

  function handleShowMoreReviews(): void {
    setShowedReviews((prev) => [
      ...prev,
      ...reviews.slice(prev.length, prev.length + 3),
    ]);
    onShowMore();
  }
  function handleHideAllReviews(): void {
    setShowedReviews((prev) => [...prev.slice(0, 3)]);
  }

  useEffect(() => {
    const checkUserAlreadyCommentOrDidNotRent = async () => {
      try {
        const reviewsCollectionRef = collection(db, "reviews");
        let q = query(
          reviewsCollectionRef,
          where("apartmentId", "==", apartment?.id),
          where("userId", "==", currentUser.uid)
        );

        const reviewCollectionSnapshot = await getDocs(q);

        if (reviewCollectionSnapshot.docs.length > 0) {
          setMessage("You have already reviewed and rated before");
          return;
        } else {
          const rentalsCollectionRef = collection(db, "rentalApplications");
          let q = query(
            rentalsCollectionRef,
            where("apartmentId", "==", apartment?.id),
            where("tenantId", "==", currentUser.uid),
            where("status", "not-in", [
              RentAppStatus.PENDING,
              RentAppStatus.PROCESSING,
              RentAppStatus.CANCELED,
            ])
          );

          const rentalsCollectionSnapshot = await getDocs(q);
          // console.log(rentalsCollectionSnapshot.docs.at(0)?.data());
          if (rentalsCollectionSnapshot.docs.length > 0) {
            setUserAlreadyCommentOrDidNotRent(false);
          } else {
            setMessage(
              "You cannot rate because you haven't rented this appartment"
            );
          }
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };

    if (currentUser?.uid) {
      checkUserAlreadyCommentOrDidNotRent();
    }
  }, [apartment?.id, currentUser?.uid]);

  const handleUserMakeANewComment = () => {
    setUserAlreadyCommentOrDidNotRent(true);
  };

  return (
    <div className="comments-section">
      <div className="comments-section__reviews-sorting">
        <span className="num-reviews">{totalReviews} Reviews</span>
        <div className="sorting">
          <span>Filter by</span>
          <select defaultValue={0} name="sortByStar" id="">
            <option value={0}>All</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
      </div>

      {/* list comment */}
      {showedReviews.map((review) => (
        <CommentItem review={review} key={review.id} />
      ))}

      {showedReviews.length < totalReviews && (
        <p className="show-more">
          <span onClick={handleShowMoreReviews}>Show more</span>
        </p>
      )}
      {showedReviews.length > 3 && (
        <p className="hide-all">
          <span onClick={handleHideAllReviews}>Hide all</span>
        </p>
      )}
      {userAlreadyCommentOrDidNotRent ? (
        <p className="reviewed-and-rated-message">{message}</p>
      ) : (
        <CommentForm
          onMakeANewComment={handleUserMakeANewComment}
          setToggleRefetchReviews={setToggleRefetchReviews}
          aparmentId={apartment?.id as string}
        />
      )}
    </div>
  );
};

export default CommentsSection;
