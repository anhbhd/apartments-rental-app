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
import { mapCollectionToArrayObject } from "../../../utils/Mapper";
import { calculateAverageStars } from "../../../utils/calculateAverageStars";
import { updateDocument } from "../../../services/updateDocument";

interface ICommentsSectionProps {
  reviews: Review[];
  totalReviews: number;
  onShowMore: () => void;
  apartment: Apartment | undefined;
  setToggleRefetchReviews: React.Dispatch<React.SetStateAction<boolean>>;
  filterStarsComments: number;
  onChangeFilterStarsComment: React.Dispatch<React.SetStateAction<number>>;
  showedReviews: Review[];
  onHideAllReviews: () => void;
}

const CommentsSection: React.FC<ICommentsSectionProps> = ({
  totalReviews,
  onShowMore,
  apartment,
  setToggleRefetchReviews,
  onChangeFilterStarsComment,
  showedReviews,
  onHideAllReviews,
}) => {
  const [userAlreadyCommentOrDidNotRent, setUserAlreadyCommentOrDidNotRent] =
    useState<boolean>(true);
  const { currentUser } = useAuth();

  const [message, setMessage] = useState<string>("");

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
          if (rentalsCollectionSnapshot.docs.length > 0) {
            setUserAlreadyCommentOrDidNotRent(false);
          } else {
            setMessage(
              "You cannot rate because you haven't rented this apartment"
            );
          }
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };

    if (currentUser) {
      checkUserAlreadyCommentOrDidNotRent();
    } else {
      return;
    }
  }, [apartment?.id, currentUser]);

  const handleUserMakeANewComment = () => {
    setUserAlreadyCommentOrDidNotRent(true);
  };

  return (
    <div className="comments-section">
      <div className="comments-section__reviews-sorting">
        <span className="num-reviews">{totalReviews} Reviews</span>
        <div className="sorting">
          <span>Filter by</span>
          <select
            defaultValue={0}
            onChange={(e) => {
              onChangeFilterStarsComment(Number(e.target.value));
            }}
            name="sortByStar"
            id=""
          >
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
          <span onClick={() => onShowMore()}>Show more</span>
        </p>
      )}
      {showedReviews.length > 3 && (
        <p className="hide-all">
          <span onClick={() => onHideAllReviews()}>Hide all</span>
        </p>
      )}
      {userAlreadyCommentOrDidNotRent ? (
        <p className="reviewed-and-rated-message">{message}</p>
      ) : (
        <CommentForm
          onMakeANewComment={handleUserMakeANewComment}
          setToggleRefetchReviews={setToggleRefetchReviews}
          apartmentId={apartment?.id as string}
        />
      )}
    </div>
  );
};

export default CommentsSection;
