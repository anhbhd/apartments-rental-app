import React from "react";
import "./HeroSection.scss";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__text">
        <p>The best way to</p>
        <h2>Find your dream Apartments</h2>
        <p>We’ve more than 745,000 apartments, place & plot.</p>
      </div>
      <div className="hero-section__call-to-actions">
        <button className="button">
          <Link to="search">Our available Apartments</Link>
        </button>

        <button className="button">
          <Link to="sign_up">Create an Account</Link>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
