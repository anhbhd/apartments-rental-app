import "./PropertyDescription.scss";
import { Apartment } from "../../../type/Apartment";
import { formatter } from "../../../utils/FormatMoney";
import { useEffect, useState } from "react";

interface IPropertyDescriptionProps {
  apartment: Apartment;
  className?: string;
}

const PropertyDescription = ({
  apartment,
  className,
}: IPropertyDescriptionProps) => {
  const [cityName, setCityName] = useState<string>("");
  const [district, setDistrictName] = useState<string>("");

  useEffect(() => {
    const fetchCityName = async () => {
      try {
        const provinceRes = await fetch(
          `https://provinces.open-api.vn/api/p/${apartment.city}`
        );
        const provinceData = await provinceRes.json();
        setCityName(provinceData.name);

        const districtRes = await fetch(
          `https://provinces.open-api.vn/api/d/${apartment.district}`
        );
        const districtData = await districtRes.json();
        setDistrictName(districtData.name);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchCityName();
  }, [apartment]);

  return (
    <section className={`property-description ${className || ""}`}>
      <div className="property-description-container">
        <h3 className="property-description__title">Property Description</h3>
        <div
          className="property-description__des-text"
          dangerouslySetInnerHTML={{ __html: apartment?.detailedDescription }}
        ></div>
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
              <span>{cityName}</span>
            </p>
            <p className="item">
              <label>District</label>
              <span>{district}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="address-section">
        <h3 className="address-section__title">Terms</h3>
        <div className="address-section__info-container">
          <div
            className="address-section__text-details"
            dangerouslySetInnerHTML={{ __html: apartment?.terms }}
          ></div>
        </div>
      </div>
      <div className="address-section">
        <h3 className="address-section__title">Additional fees</h3>
        <div className="address-section__info-container">
          <div
            className="address-section__text-details"
            dangerouslySetInnerHTML={{ __html: apartment?.additionalFees }}
          ></div>
        </div>
      </div>
      <section className="features-amenities">
        <h3 className="features-amenities__title">Features & Amenities</h3>
      </section>
    </section>
  );
};

export default PropertyDescription;
