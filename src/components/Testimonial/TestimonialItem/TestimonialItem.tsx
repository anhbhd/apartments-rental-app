import React from "react";
import "./TestimonialItem.scss";

import testimonialAva from "./../../../assets/TestimonialAvatars/testimonial-avatar.jpg";
import QuotationMark from "../../../icons/QuotationMark";

const TestimonialItem = () => {
  return (
    <div className="testimonial-item">
      <div className="testimonial-item__review">
        <div className="compliment">Great Work</div>
        <span className="quotation-marks">
          <QuotationMark
            className="mark"
            width={40}
            height={40}
            fill="#fef7f6"
          />
        </span>
        <p className="detail">
          Amazing design, easy to customize and a design quality superlative
          account on its cloud platform for the optimized performance. And we
          didn’t on our original designs.
        </p>
      </div>
      <div className="testimonial-item__reviewer-box">
        <span className="avatar">
          <img src={testimonialAva} alt="ava" />
        </span>
        <div className="reviewer-info">
          <p className="name">Floyd Miles</p>
          <p className="career">
            <em>Bank of America</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
