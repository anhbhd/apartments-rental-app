import React from "react";
import "./ServiceItem.scss";
import { Link } from "react-router-dom";

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
      <Link to="/search">
        <button className="service-item__action">Discovery now</button>
      </Link>
    </div>
  );
};

export default ServiceItem;
