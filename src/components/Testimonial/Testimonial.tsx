import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialItem from "./TestimonialItem/TestimonialItem";
import "swiper/css";
import "./Testimonial.scss";

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
          800: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: any) => console.log(swiper)}
      >
        <SwiperSlide>
          <TestimonialItem />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialItem />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialItem />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialItem />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Testimonial;
