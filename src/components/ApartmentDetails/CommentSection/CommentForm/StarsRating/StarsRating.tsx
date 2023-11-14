import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import "./StarsRating.scss";

interface IStarsRating {
  className?: string;
  style?: React.CSSProperties;
}
const StarsRating = ({ className = "", style }: IStarsRating) => {
  const [rating, setRating] = useState(0);
  //   console.log(rating);
  return (
    <span style={style} className={`stars-rating-container ${className}`}>
      {Array.from({ length: 5 }, (_, idx) => (
        <AiFillStar
          className={`icon ${idx < rating ? "gold" : ""}`}
          key={idx}
          onClick={() => setRating(idx + 1)}
        />
      ))}
    </span>
  );
};

export default StarsRating;
