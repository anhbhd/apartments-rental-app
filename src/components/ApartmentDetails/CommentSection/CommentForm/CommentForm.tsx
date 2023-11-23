import React, { FormEvent, useState } from "react";
import "./CommentForm.scss";
import StarsRating from "./StarsRating/StarsRating";
import { useAuth } from "../../../../context/AuthContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../../config/firebase_config";

interface ICommentFormProps {
  aparmentId: string;
  setToggleRefetchReviews: React.Dispatch<React.SetStateAction<boolean>>;
  onMakeANewComment: () => void;
}

const CommentForm: React.FC<ICommentFormProps> = ({
  aparmentId,
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
        await addDoc(collection(db, "reviews"), {
          apartmentId: aparmentId,
          comment: comment,
          numberOfStars: rating,
          userId: currentUser.uid,
          createdDate: Timestamp.now(),
        });

        setIsLoading(false);
        setToggleRefetchReviews((prev: boolean) => !prev);
        onMakeANewComment();
      } catch (err: any) {
        console.error(err);
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

        <button type="submit" className="post-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default CommentForm;
