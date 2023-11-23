import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import "./StarsRating.scss";

interface IStarsRating {
  className?: string;
  style?: React.CSSProperties;
  onRating: (rating: number) => void;
}
const StarsRating = ({ className = "", style, onRating }: IStarsRating) => {
  const [rating, setRating] = useState(1);
  //   console.log(rating);

  const handleRating = (rating: number) => {
    setRating(rating);
    onRating(rating);
  };

  return (
    <span style={style} className={`stars-rating-container ${className}`}>
      {Array.from({ length: 5 }, (_, idx) => (
        <AiFillStar
          className={`icon ${idx < rating ? "gold" : ""}`}
          key={idx}
          onClick={() => {
            handleRating(idx + 1);
          }}
        />
      ))}
    </span>
  );
};

export default StarsRating;
