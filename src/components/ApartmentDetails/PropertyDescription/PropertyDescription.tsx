import React from "react";

import "./PropertyDescription.scss";
const PropertyDescription = () => {
  return (
    <section className="property-description">
      <div className="property-description-container">
        <h3 className="property-description__title">Property Description</h3>
        <p className="property-description__des-text">
          This 3-bed with a loft, 2-bath home in the gated community of The
          Hideout has it all. From the open floor plan to the abundance of light
          from the windows, this home is perfect for entertaining. The living
          room and dining room have vaulted ceilings and a beautiful fireplace.
          You will love spending time on the deck taking in the beautiful views.
          In the kitchen, you'll find stainless steel appliances and a tile
          backsplash, as well as a breakfast bar.
        </p>
      </div>

      <div className="property-description-container">
        <h3 className="property-description__title">Property Details</h3>
        <div className="property-details">
          <div className="property-details__item">
            <label>Price</label>
            <span>$252,000/month</span>
          </div>
          <div className="property-details__item">
            <label>Property Size</label>
            <span>1500 sqm</span>
          </div>
          <div className="property-details__item">
            <label>Bathrooms</label>
            <span>3</span>
          </div>
          <div className="property-details__item">
            <label>Bedrooms</label>
            <span>4</span>
          </div>
          <div className="property-details__item">
            <label>Year Built</label>
            <span>2018</span>
          </div>
          <div className="property-details__item">
            <label>Property Type</label>
            <span>Apartment</span>
          </div>
          <div className="property-details__item">
            <label>Property Status</label>
            <span>Available</span>
          </div>
        </div>
      </div>

      <div className="address-section">
        <h3 className="address-section__title">Address</h3>
        <div className="address-section__info-container">
          <div className="address-section__text-details">
            <p className="item">
              <label>Address</label>
              <span>$252,000/month</span>
            </p>
            <p className="item">
              <label>City</label>
              <span>1500 sqm</span>
            </p>
            <p className="item">
              <label>District</label>
              <span>3</span>
            </p>
          </div>
        </div>
      </div>

      <section className="features-amenities">
        <h3 className="features-amenities__title">Features & Amenities</h3>
        <ul className="features-amenities__items-container">
          <li>Air Conditioning</li>
          <li>Air Conditioning</li>
          <li>Air Conditioning</li>
          <li>Air Conditioning</li>
          <li>Air Conditioning</li>
          <li>Air Conditioning</li>
          <li>Air Conditioning</li>
        </ul>
      </section>
    </section>
  );
};

export default PropertyDescription;
