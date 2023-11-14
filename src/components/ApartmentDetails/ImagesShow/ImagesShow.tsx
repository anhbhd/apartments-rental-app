import React from "react";

import "./ImagesShow.scss";
import tempImg from "./../../../assets/FeatureSection/feature-item-image.jpg";

interface IImagesShowProps {
  className?: string;
  style?: React.CSSProperties;
}

const ImagesShow = ({ className, style }: IImagesShowProps) => {
  return (
    <section style={style} className={`images-show ${className}`}>
      <div className="images-show__group1">
        <img src={tempImg} alt={tempImg} />
      </div>
      <div className="images-show__group2">
        <img src={tempImg} alt={tempImg} />
        <img src={tempImg} alt={tempImg} />
        <img src={tempImg} alt={tempImg} />
        <img src={tempImg} alt={tempImg} />
      </div>
    </section>
  );
};

export default ImagesShow;
