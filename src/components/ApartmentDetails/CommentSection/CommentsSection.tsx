import React from "react";

import "./CommentsSection.scss";
import CommentItem from "./CommentItem/CommentItem";
import CommentForm from "./CommentForm/CommentForm";
const CommentsSection = () => {
  return (
    <div className="comments-section">
      <div className="comments-section__reviews-sorting">
        <span className="num-reviews">3 Reviews</span>
        <div className="sorting">
          <span>Sort by</span>
          <select name="sortByStar" id="">
            <option value="1">1 Star</option>
            <option value="1">2 Stars</option>
            <option value="1">3 Stars</option>
            <option value="1">4 Stars</option>
            <option value="1">5 Stars</option>
          </select>
        </div>
      </div>

      {/* list comment */}
      <CommentItem />
      <CommentItem />
      <CommentItem />

      <p className="show-more">
        <span>Show more</span>
      </p>

      <CommentForm />
    </div>
  );
};

export default CommentsSection;
