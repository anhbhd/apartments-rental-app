import React from "react";
import "./CommonSection1.scss";
import { Link } from "react-router-dom";
import buildingImage from "./../../../assets/cta-building-1.png";
import { useAuth } from "../../../context/AuthContext";

const CommonSection1: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <div className="common-section-1">
      <div className="text-btn-container">
        <div className="text">
          <h2>Get Your Dream House</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam odit
            consequatur, illum.
          </p>
        </div>
        <div className="btn">
          {currentUser ? (
            <Link to={"/search"}>
              <button>Discover our website</button>
            </Link>
          ) : (
            <Link to={"/signup"}>
              <button>Register now</button>
            </Link>
          )}
        </div>
      </div>
      <div className="image-container">
        <img src={buildingImage} alt="building" />
      </div>
    </div>
  );
};

export default CommonSection1;
