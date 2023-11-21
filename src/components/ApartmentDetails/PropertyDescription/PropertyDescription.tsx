import "./PropertyDescription.scss";
import { Apartment } from "../../../type/Apartment";
import { formatter } from "../../../utils/FormatMoney";
import { Amenity } from "../../../type/Amenity";

interface IPropertyDescriptionProps {
  apartment: Apartment;
  amenities: Amenity[];
  className?: string;
}

const PropertyDescription = ({
  apartment,
  amenities,
  className,
}: IPropertyDescriptionProps) => {
  return (
    <section className={`property-description ${className || ""}`}>
      <div className="property-description-container">
        <h3 className="property-description__title">Property Description</h3>
        <p className="property-description__des-text">
          {apartment?.detailedDescription}
        </p>
      </div>

      <div className="property-description-container">
        <h3 className="property-description__title">Property Details</h3>
        <div className="property-details">
          <div className="property-details__item">
            <label>Price</label>
            <span>{formatter.format(apartment?.pricePerMonth)}/month</span>
          </div>
          <div className="property-details__item">
            <label>Property Size</label>
            <span>{apartment?.area} sqm</span>
          </div>
          <div className="property-details__item">
            <label>Bathrooms</label>
            <span>{apartment?.baths}</span>
          </div>
          <div className="property-details__item">
            <label>Bedrooms</label>
            <span>{apartment?.beds}</span>
          </div>
          <div className="property-details__item">
            <label>Year Built</label>
            <span>{apartment?.yearBuild}</span>
          </div>
          <div className="property-details__item">
            <label>Property Type</label>
            <span>Apartment</span>
          </div>
          <div className="property-details__item">
            <label>Property Status</label>
            <span>{apartment?.rented ? "Rented" : "Available"}</span>
          </div>
          <div className="property-details__item">
            <label>Number of floors</label>
            <span>{apartment?.numberOfFloors}</span>
          </div>
          <div className="property-details__item">
            <label>Direction</label>
            <span>{apartment?.direction}</span>
          </div>
          <div className="property-details__item">
            <label>Front width</label>
            <span>{apartment?.frontWidth} m</span>
          </div>
          <div className="property-details__item">
            <label>Owner</label>
            <span>{apartment?.owner}</span>
          </div>
          <div className="property-details__item">
            <label>Owner's phone number</label>
            <span>{apartment?.ownerPhoneNumber}</span>
          </div>
          <div className="property-details__item">
            <label>Contract duration</label>
            <span>{apartment?.contractDuration} year(s)</span>
          </div>
          <div className="property-details__item">
            <label>Deposit Money</label>
            <span>{apartment?.depositMoney} dollars</span>
          </div>
        </div>
      </div>

      <div className="address-section">
        <h3 className="address-section__title">Address</h3>
        <div className="address-section__info-container">
          <div className="address-section__text-details">
            <p className="item">
              <label>Address</label>
              <span>{apartment?.detailedAddress}</span>
            </p>
            <p className="item">
              <label>City</label>
              <span>{apartment?.city}</span>
            </p>
            <p className="item">
              <label>District</label>
              <span>{apartment?.district}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="address-section">
        <h3 className="address-section__title">Terms</h3>
        <div className="address-section__info-container">
          <div className="address-section__text-details">
            {apartment?.terms.map((term, index) => {
              return (
                <p key={index} className="item">
                  <label>{index + 1}</label>
                  <span>{term}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <section className="features-amenities">
        <h3 className="features-amenities__title">Features & Amenities</h3>
        <ul className="features-amenities__items-container">
          {amenities?.map((amenity, index) => (
            <li key={index}>{amenity.name}</li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default PropertyDescription;
