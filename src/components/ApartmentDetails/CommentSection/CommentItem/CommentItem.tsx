import React from "react";
import { AiFillStar } from "react-icons/ai";

import tmpImg from "./../../../../assets/anonymous-avatarjpg.jpg";
import "./CommentItem.scss";

const CommentItem = () => {
  return (
    <div className="comment-item">
      <div className="comment-item__info-rating">
        <span className="ava-container">
          <img src={tmpImg} alt={tmpImg} />
        </span>

        <div className="text-container">
          <span className="username">Bessie Cooper</span>
          <span className="stars-rating">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </span>
          <span className="comment-date">12 March 2022</span>
        </div>
      </div>
      <div className="comment-item__text-comment">
        Every single thing we tried with John was delicious! Found some awesome
        places we would definitely go back to on our trip. John was also super
        friendly and passionate about Beşiktaş and Istanbul.
      </div>
    </div>
  );
};

export default CommentItem;
