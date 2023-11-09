import React from "react";
import "./ServiceItem.scss";

interface IServiceItemProps {
  img: any;
  serviceName: string;
  shortDescription: string;
}

const ServiceItem = ({
  img,
  serviceName,
  shortDescription,
}: IServiceItemProps) => {
  return (
    <div className="service-item">
      <div className="service-item__image">
        <img src={img} alt={serviceName} />
      </div>
      <p className="service-item__name">{serviceName}</p>
      <p className="service-item__short-description">{shortDescription}</p>
      <button className="service-item__action">Discovery now</button>
    </div>
  );
};

export default ServiceItem;
