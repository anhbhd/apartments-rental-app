import React from "react";
import "./TestimonialItem.scss";

import testimonialAva from "./../../../assets/TestimonialAvatars/testimonial-avatar.jpg";
import QuotationMark from "../../../icons/QuotationMark";

interface ITestimonialItemProps {
  compliment: string;
  detail: string;
  customerName: string;
  career: string;
  className?: string;
  style?: {};
}

const TestimonialItem = ({
  compliment,
  detail,
  customerName,
  career,
}: ITestimonialItemProps) => {
  return (
    <div className="testimonial-item">
      <div className="testimonial-item__review">
        <div className="compliment">{compliment}</div>
        <span className="quotation-marks">
          <QuotationMark
            className="mark"
            width={40}
            height={40}
            fill="#fef7f6"
          />
        </span>
        <p className="detail">{detail}</p>
      </div>
      <div className="testimonial-item__reviewer-box">
        <span className="avatar">
          <img src={testimonialAva} alt="ava" />
        </span>
        <div className="reviewer-info">
          <p className="name">{customerName}</p>
          <p className="career">
            <em>{career}</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
