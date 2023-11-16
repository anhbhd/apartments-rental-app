import React from "react";

import "./ImagesShow.scss";

interface IImagesShowProps {
  className?: string;
  style?: React.CSSProperties;
  images: string[];
}

const ImagesShow = ({ className, style, images }: IImagesShowProps) => {
  return (
    <section style={style} className={`images-show ${className}`}>
      <div className="images-show__group1">
        {images && <img src={images[0]} alt={images[0]} />}
      </div>
      <div className="images-show__group2">
        {images && images.slice(1).map((img) => <img src={img} alt={img} />)}
      </div>
    </section>
  );
};

export default ImagesShow;
