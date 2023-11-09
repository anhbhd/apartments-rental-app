import React from "react";
import "./ServiceSection.scss";
import ServiceItem from "./ServiceItem/ServiceItem";
import imgSectionItem from "./../../assets/ServiceSectionImage/house-item-service.svg";

const servicesArray = [
  {
    img: imgSectionItem,
    serviceName: "Rent a house",
    shortDescription:
      "Rent your ideal house with ease. Explore our diverse selection of homes for rent today.",
  },
  {
    img: imgSectionItem,
    serviceName: "Rent an office",
    shortDescription:
      "Find the perfect office space to suit your business needs. Discover a workspace that inspires success.",
  },
  {
    img: imgSectionItem,
    serviceName: "Rent an apartment",
    shortDescription:
      "Discover modern apartments for rent that cater to your lifestyle. Experience comfort and convenience.",
  },
];

const ServiceSection = () => {
  return (
    <section className="service-section">
      <div className="service-section__header-box">
        <h3 className="header-section-title">
          See How <span>Homez</span> Can Help
        </h3>
        <p className="normal-text">see what we can do</p>
      </div>
      <div className="service-section__services-list">
        {servicesArray.map((item, index) => (
          <ServiceItem
            key={index}
            img={item.img}
            serviceName={item.serviceName}
            shortDescription={item.shortDescription}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
