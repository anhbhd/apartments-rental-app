import React from "react";
import "./CommentForm.scss";
import StarsRating from "./StarsRating/StarsRating";
const CommentForm = () => {
  return (
    <section className="comment-form">
      <h3 className="comment-form__title">Write your comment</h3>
      <form className="comment-form__form">
        <p className="stars-rating">
          <p>Give us a rating</p>
          <StarsRating />
        </p>

        <textarea
          style={{
            width: "100%", // Set the width to 100%
            padding: "10px", // Add some padding for better appearance
            boxSizing: "border-box", // Include padding in the total width
            border: "1px solid #ccc", // Add a border for visual clarity
            borderRadius: "5px", // Optional: Add rounded corners
          }}
          rows={5}
        ></textarea>

        <button className="post-btn">Submit</button>
      </form>
    </section>
  );
};

export default CommentForm;
