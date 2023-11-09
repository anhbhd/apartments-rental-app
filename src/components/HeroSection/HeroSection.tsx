import React from "react";
import "./HeroSection.scss";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__text">
        <p>The best way to</p>
        <h2>Find your dream Apartments</h2>
        <p>We’ve more than 745,000 apartments, place & plot.</p>
      </div>
      <div className="hero-section__call-to-actions">
        <button className="button">Our available Apartments</button>
        <button className="button">Create an Account</button>
      </div>
    </section>
  );
};

export default HeroSection;
