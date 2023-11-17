import React from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
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
          <Link to="/search">Listings</Link>
        </li>
        {currentUser && (
          <>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/my_rental_apps">Rental applications</Link>
            </li>
            <li>
              <Link to="/personal_info">Personal Info</Link>
            </li>
            <li className="logout-btn">
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
        {!currentUser && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
