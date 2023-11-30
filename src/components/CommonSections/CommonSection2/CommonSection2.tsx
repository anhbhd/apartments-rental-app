import React from "react";
import "./CommonSection2.scss";
import { Link } from "react-router-dom";
import img1 from "./../../../assets/commonSections/about-1.jpg";
import img2 from "./../../../assets/commonSections/about-2.jpg";
import img3 from "./../../../assets/commonSections/about-3.png";
import { FaCheckCircle } from "react-icons/fa";
const CommonSection2 = () => {
  return (
    <div className="common-section-2">
      <div className="common-section-2__text-btn">
        <h3>Let’s find the right selling option for you</h3>
        <p>
          Discover the perfect housing solution for you As the intricacy of
          buildings rises, the world of architecture evolves.
        </p>
        <ul>
          <li>
            <FaCheckCircle />
            Uncover fantastic housing opportunities
          </li>
          <li>
            <FaCheckCircle />
            Find excellent deals
          </li>
          <li>
            <FaCheckCircle />
            Fast support
          </li>
          <li>
            <FaCheckCircle />
            Showcase your dream property
          </li>
        </ul>
        <Link to="/search" className="btn">
          Learn more
        </Link>
      </div>
      <div className="common-section-2__images-container">
        <img src={img1} alt="img1" className="img1" />
        <img src={img2} alt="img2" className="img2" />
        <div className="img3-container">
          <img src={img3} alt="img3" className="img3" />
        </div>
      </div>
    </div>
  );
};

export default CommonSection2;
