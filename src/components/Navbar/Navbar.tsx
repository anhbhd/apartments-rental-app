import React from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <HeaderLogo className="navbar__logo" />
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="search">Listings</Link>
        </li>
        <li>
          <Link to="wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="">Login</Link>
        </li>
        <li>
          <Link to="">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
