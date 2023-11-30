import React, { FormEvent, useState } from "react";
import "./CommentForm.scss";
import StarsRating from "./StarsRating/StarsRating";
import { useAuth } from "../../../../context/AuthContext";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { addDocument } from "../../../../services/addDocument";
import { Review } from "../../../../type/Review";
import { db } from "../../../../config/firebase_config";
import { mapCollectionToArrayObject } from "../../../../utils/Mapper";
import { calculateAverageStars } from "../../../../utils/calculateAverageStars";
import { updateDocument } from "../../../../services/updateDocument";

interface ICommentFormProps {
  apartmentId: string;
  setToggleRefetchReviews: React.Dispatch<React.SetStateAction<boolean>>;
  onMakeANewComment: () => void;
}

const CommentForm: React.FC<ICommentFormProps> = ({
  apartmentId,
  setToggleRefetchReviews,
  onMakeANewComment,
}) => {
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();

  const handleRating = (rating: number) => {
    setRating(rating);
  };

  function handleSubmitReview(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    async function addNewReview() {
      setIsLoading(true);
      try {
        await addDocument("reviews", {
          apartmentId: apartmentId,
          comment: comment,
          numberOfStars: rating,
          userId: currentUser.uid,
          createdDate: Timestamp.now(),
        });

        // calculate average rating star again for the apartment

        const reviewsDataRef = collection(db, "reviews");
        let q = query(reviewsDataRef, where("apartmentId", "==", apartmentId));
        const reviewsDataCollectionSnapshot = await getDocs(q);
        const reviewsData: Review[] = mapCollectionToArrayObject(
          reviewsDataCollectionSnapshot
        );

        let newAverageRating = calculateAverageStars(reviewsData);
        console.log(newAverageRating);
        await updateDocument("apartments", apartmentId, {
          avgRate: newAverageRating,
        });

        // to force the comment section fetch new reviews
        setToggleRefetchReviews((prev: boolean) => !prev);
        onMakeANewComment();
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    addNewReview();
  }

  return (
    <section className="comment-form">
      <h3 className="comment-form__title">Write your comment</h3>
      <form onSubmit={handleSubmitReview} className="comment-form__form">
        <p className="stars-rating">
          <span>Give us a rating</span>
          <StarsRating onRating={handleRating} />
        </p>

        <textarea
          style={{
            width: "100%", // Set the width to 100%
            padding: "10px", // Add some padding for better appearance
            boxSizing: "border-box", // Include padding in the total width
            border: "1px solid #ccc", // Add a border for visual clarity
            borderRadius: "5px",
          }}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows={5}
        ></textarea>

        <button type="submit" disabled={isLoading} className="post-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default CommentForm;
