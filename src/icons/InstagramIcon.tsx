import React from "react";
import Icon from "../Type/Icon";

const InstagramIcon: React.FC<Icon> = ({ width, height, style }) => {
  return (
    <svg
      style={style}
      height={width}
      width={height}
      viewBox="0 0 152 152"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <linearGradient
        id="linear-gradient"
        gradientUnits="userSpaceOnUse"
        x1="22.26"
        x2="129.74"
        y1="22.26"
        y2="129.74"
      >
        <stop offset="0" stopColor="#fae100" />
        <stop offset=".15" stopColor="#fcb720" />
        <stop offset=".3" stopColor="#ff7950" />
        <stop offset=".5" stopColor="#ff1c74" />
        <stop offset="1" stopColor="#6c1cd1" />
      </linearGradient>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Circle">
          <g id="_03.Instagram" data-name="03.Instagram">
            <rect
              id="Background"
              fill="url(#linear-gradient)"
              height="152"
              rx="76"
              width="152"
            />
            <g fill="#fff">
              <path
                id="Shade"
                d="m133.2 26c-11.08 20.34-26.75 41.32-46.33 60.9s-40.56 35.22-60.87 46.3q-1.91-1.66-3.71-3.46a76 76 0 1 1 107.45-107.48q1.8 1.8 3.46 3.74z"
                opacity=".1"
              />
              <g id="Icon">
                <path d="m94 36h-36a22 22 0 0 0 -22 22v36a22 22 0 0 0 22 22h36a22 22 0 0 0 22-22v-36a22 22 0 0 0 -22-22zm15 54.84a18.16 18.16 0 0 1 -18.16 18.16h-29.68a18.16 18.16 0 0 1 -18.16-18.16v-29.68a18.16 18.16 0 0 1 18.16-18.16h29.68a18.16 18.16 0 0 1 18.16 18.16z" />
                <path d="m90.59 61.56-.19-.19-.16-.16a20.16 20.16 0 0 0 -14.24-5.88 20.52 20.52 0 0 0 -20.38 20.67 20.75 20.75 0 0 0 6 14.61 20.19 20.19 0 0 0 14.42 6 20.73 20.73 0 0 0 14.55-35.05zm-14.59 28a13.56 13.56 0 1 1 13.37-13.56 13.46 13.46 0 0 1 -13.37 13.56z" />
                <path d="m102.43 54.38a4.88 4.88 0 0 1 -4.85 4.92 4.81 4.81 0 0 1 -3.42-1.43 4.93 4.93 0 0 1 3.43-8.39 4.82 4.82 0 0 1 3.09 1.12l.1.1a3.05 3.05 0 0 1 .44.44l.11.12a4.92 4.92 0 0 1 1.1 3.12z" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default InstagramIcon;
