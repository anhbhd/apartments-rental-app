import React from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <HeaderLogo className="navbar__logo" />
      <ul>
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">Listings</a>
        </li>
        <li>
          <a href="">Watchlist</a>
        </li>
        <li>
          <a href="">Login</a>
        </li>
        <li>
          <a href="">Sign Up</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
