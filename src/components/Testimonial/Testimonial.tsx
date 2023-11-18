import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialItem from "./TestimonialItem/TestimonialItem";
import "swiper/css";
import "./Testimonial.scss";

const testimonialItems = [
  {
    compliment: "Great Work",
    detail:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.",
    customerName: "Floyd Miles",
    career: "Bank of America",
  },
  {
    compliment: "Exceptional Service",
    detail:
      "The team delivered an exceptional service! The design was not only visually appealing but also highly customizable. The cloud platform's performance optimization exceeded our expectations. We are thoroughly impressed and would highly recommend their services.",
    customerName: "Alice Rodriguez",
    career: "Tech Innovations Inc.",
  },
  {
    compliment: "Outstanding Design",
    detail:
      "The design work was outstanding! It was not only aesthetically pleasing but also incredibly easy to customize. The cloud platform's performance was top-notch, enhancing the overall user experience. We are extremely satisfied with the results.",
    customerName: "David Thompson",
    career: "XYZ Corporation",
  },
  {
    compliment: "Top-notch Quality",
    detail:
      "The design quality is top-notch, and the customization options provided an added layer of flexibility. The cloud platform's performance optimization significantly contributed to the overall success of our project. We are more than satisfied with the outcome.",
    customerName: "Gregory Ward",
    career: "Global Innovations Ltd.",
  },
  {
    compliment: "Excellent Collaboration",
    detail:
      "We experienced excellent collaboration with the team. The design was not only visually appealing but also tailored to our specific needs. The cloud platform's performance optimization was crucial for the success of our project. We appreciate the dedication and expertise demonstrated by the team.",
    customerName: "Olivia Simmons",
    career: "Tech Dynamics Solutions",
  },
  {
    compliment: "Spectacular Results",
    detail:
      "Spectacular results achieved! The design surpassed our expectations, and the customization options provided the flexibility we needed. The cloud platform's optimized performance played a key role in the success of our project. We are extremely pleased with the outcome.",
    customerName: "Michael Turner",
    career: "Innovate Solutions Group",
  },
];

const Testimonial = () => {
  return (
    <section className="testimonial">
      <h3 className="testimonial__title-section">
        People Love Living with <span>Testimonial</span>
      </h3>
      <p className="testimonial__small-quote">
        Aliquam lacinia diam quis lacus euismod
      </p>

      <Swiper
        className="testimonial__testimonials-container"
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {testimonialItems.map((item, index) => (
          <SwiperSlide key={index}>
            <TestimonialItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
