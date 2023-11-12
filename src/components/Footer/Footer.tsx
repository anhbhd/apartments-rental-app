import React from "react";
import FooterLogo from "./FooterLogo/FooterLogo";
import "./Footer.scss";
import FacebookIcon from "../../icons/FacebookIcon";
import InstagramIcon from "../../icons/InstagramIcon";
import TweeterIcon from "../../icons/TweeterIcon";
import LinkedinIcon from "../../icons/LinkedinIcon";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__leftside">
        <Link to="/">
          <FooterLogo />
        </Link>
        <div className="support-box">
          <div className="support-box__phone">
            <span>Total Free Customer Care</span>
            <span>+(84) 34 864 1180</span>
          </div>
          <div className="support-box__email">
            <span>Need Live Support?</span>
            <span>anhbhd@vmogroup.com</span>
          </div>
        </div>
        <div className="social-box">
          <p>Follow us on social media</p>
          <p>
            <Link to="https://www.facebook.com/ducanh.buihoang/">
              <FacebookIcon width="40" height="40" />
            </Link>
            <Link to="https://www.instagram.com/ko_phai_duc_anh/">
              <InstagramIcon width="40" height="40" />
            </Link>
            <TweeterIcon width="40" height="40" />
            <LinkedinIcon width="40" height="40" />
          </p>
        </div>
      </div>
      <div className="footer__rightside">
        <ul className="rightside__popular-search">
          <li>Popular Search</li>
          <li>
            <a href="#">Apartment for Rent</a>
          </li>
          <li>
            <a href="#">Apartment Low to High</a>
          </li>
          <li>
            <a href="#">Offices for Buy</a>
          </li>
          <li>
            <a href="#">Offices for Rent</a>
          </li>
        </ul>
        <ul className="rightside__quick-links">
          <li>Quick Links</li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Pricing Plans</a>
          </li>
          <li>
            <a href="#">Our Services</a>
          </li>
          <li>
            <a href="#">Contact Support</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
        </ul>
        <ul className="rightside__discover">
          <li>Discover</li>
          <li>
            <a href="#">Miami</a>
          </li>
          <li>
            <a href="#">Los Angeles</a>
          </li>
          <li>
            <a href="#">Chicago</a>
          </li>
          <li>
            <a href="#">New York</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
