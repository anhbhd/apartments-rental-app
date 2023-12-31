import React from "react";

interface IMenuIconProps {
  onClick: () => void;
  width: string;
  height: string;
  className?: string;
  style?: React.CSSProperties;
}

const MenuIcon = ({
  width,
  height,
  className,
  style,
  onClick,
}: IMenuIconProps) => {
  return (
    <span onClick={onClick} className={className} style={style}>
      <svg
        id="Слой_1"
        enableBackground="new 0 0 512 512"
        height={height}
        viewBox="0 0 512 512"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="m40.421 296.421c-22.289 0-40.421-18.132-40.421-40.421s18.132-40.421 40.421-40.421h431.158c22.289 0 40.421 18.132 40.421 40.421s-18.132 40.421-40.421 40.421z" />
          <path d="m40.421 107.789c-22.289 0-40.421-18.131-40.421-40.421s18.132-40.421 40.421-40.421h431.158c22.289 0 40.421 18.132 40.421 40.421s-18.132 40.421-40.421 40.421z" />
          <path d="m40.421 485.053c-22.289 0-40.421-18.132-40.421-40.421s18.132-40.421 40.421-40.421h431.158c22.289 0 40.421 18.132 40.421 40.421s-18.132 40.421-40.421 40.421z" />
        </g>
      </svg>
    </span>
  );
};

export default MenuIcon;
