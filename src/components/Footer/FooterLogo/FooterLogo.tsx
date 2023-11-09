import React from "react";
import footerLogo from "../../../assets/footer-logo.svg";

interface IFooterLogoProps {
  className?: string;
}
const FooterLogo: React.FC<IFooterLogoProps> = ({ className }) => {
  return (
    <span className={className}>
      <img src={footerLogo} alt="footer logo" />
    </span>
  );
};

export default FooterLogo;
