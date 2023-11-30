import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

import tmpImg from "./../../../../assets/anonymous-avatarjpg.jpg";
import "./CommentItem.scss";
import { Review } from "../../../../type/Review";

import { User } from "../../../../type/User";
import { secondsToDateTime } from "../../../../utils/SecondToDate";
import { getDocument } from "../../../../services/getDocument";

interface ICommentItemProps {
  review: Review;
}

const CommentItem: React.FC<ICommentItemProps> = ({ review }) => {
  const [userInfo, setUserInfo] = useState<User>();
  useEffect(() => {
    const fetchReviewerInfo = async () => {
      try {
        const userData: User = await getDocument("users", review.userId);
        setUserInfo(userData);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchReviewerInfo();
  }, [review.userId]);

  return (
    <div className="comment-item">
      <div className="comment-item__info-rating">
        <span className="ava-container">
          <img src={userInfo?.avatarUrl || tmpImg} alt={tmpImg} />
        </span>

        <div className="text-container">
          <span className="username">{userInfo?.fullName}</span>
          <span className="stars-rating">
            {Array.from({ length: review.numberOfStars }, (_, index) => (
              <AiFillStar key={index} />
            ))}
          </span>
          <span className="comment-date">
            {secondsToDateTime(review.createdDate.seconds)}
          </span>
        </div>
      </div>
      <div className="comment-item__text-comment">{review.comment}</div>
    </div>
  );
};

export default CommentItem;
