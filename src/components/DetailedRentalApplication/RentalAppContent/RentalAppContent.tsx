import React from "react";
import "./RentalAppContent.scss";
import { Link } from "react-router-dom";
const RentalAppContent = () => {
  return (
    <div className="rental-app-content">
      <div className="rental-app-content__info">
        <p className="line">
          <label>Created date</label>
          <span>Nov 22, 2023</span>
        </p>
        <p className="line">
          <label>Start date</label>
          <span>Nov 22, 2023</span>
        </p>
        <p className="line">
          <label>End date</label>
          <span>Nov 22, 2023</span>
        </p>
        <p className="line">
          <label>Deposit</label>
          <span>1154545</span>
        </p>
        <p className="line">
          <label>Status</label>
          <span>Pending</span>
        </p>
        <div className="note">
          <label>Note</label>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            totam ratione impedit doloremque, adipisci dolorem, non sequi animi
            cumque architecto, voluptas quia voluptate a fuga quae consectetur
            debitis aliquid! Libero!
          </p>
        </div>
      </div>
      <div className="rental-app-content__tenant-info">
        <p className="line">
          <label>Fullname</label>
          <span>Luke deVilos</span>
        </p>
        <p className="line">
          <label>Gender</label>
          <span>Luke deVilos</span>
        </p>
        <p className="line">
          <label>Date of birth</label>
          <span>Luke deVilos</span>
        </p>
        <p className="line">
          <label>Phone number</label>
          <span>032548484</span>
        </p>
        <p className="line">
          <label>Email</label>
          <span>Luke deVilos</span>
        </p>
      </div>
      <div className="rental-app-content__apartment-info">
        <p>Click here to view the apartment information:</p>
        <Link to="/">Link to the apartment info</Link>
      </div>

      <div className="rental-app-content__actions">
        <button>Request to cancel</button>
      </div>
    </div>
  );
};

export default RentalAppContent;
