import React from "react";
import "./HeroSection.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HeroSection = () => {
  const { currentUser } = useAuth();
  return (
    <section className="hero-section">
      <div className="hero-section__text">
        <p>The best way to</p>
        <h2>Find your dream Apartments</h2>
        <p>We’ve more than 745,000 apartments, place & plot.</p>
      </div>
      <div className="hero-section__call-to-actions">
        <button className="button">
          <Link to="/search">Our available Apartments</Link>
        </button>
        {!currentUser && (
          <button className="button signup">
            <Link to="/signup">Create an Account</Link>
          </button>
        )}
        {currentUser && (
          <button className="button signup">
            <Link to="/wishlist">Your Wishlist</Link>
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
