import React from "react";

import HeroSection from "../../components/HeroSection/HeroSection";
import "./Home.scss";
import ServiceSection from "../../components/ServiceSection/ServiceSection";
import FeaturesList from "../../components/FeaturesList/FeaturesList";
import Testimonial from "../../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <ServiceSection />
      <FeaturesList />
      <Testimonial />
    </div>
  );
};

export default Home;
