import React from "react";
import logo from "../../assets/header-logo.svg";

interface HeaderLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  className,
  style,
}: HeaderLogoProps) => {
  return (
    <img className={className} style={style} src={logo} alt="header logo" />
  );
};

export default HeaderLogo;
