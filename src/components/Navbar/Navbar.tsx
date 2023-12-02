import { useEffect, useState } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MenuIcon from "../../icons/MenuIcon";
import { IoCloseSharp } from "react-icons/io5";
import anonyImg from "./../../assets/anonymous-avatarjpg.jpg";
import { toast } from "react-toastify";

interface BackdropProps {
  onClose: () => void;
}
const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className="backdrop" onClick={onClose}></div>;
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { currentUser, logout } = useAuth();

  const { pathname } = useLocation();

  const closeMenu = () => {
    setToggleMenu(false);
  };

  useEffect(() => {
    closeMenu(); // Close the menu when the route changes
  }, [pathname]);

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully!", {
      position: "bottom-right",
      style: { fontSize: "15px" },
      autoClose: 1500,
    });
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <HeaderLogo className="navbar__logo" />
      </Link>
      {toggleMenu && <Backdrop onClose={closeMenu} />}
      <ul className={toggleMenu ? `visibleMenu` : ``}>
        <IoCloseSharp className="close-icon" onClick={closeMenu} />
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

            <Link className="perinfo" to="/personal_info">
              <img src={`${currentUser.photoURL || anonyImg}`} alt="" />
            </Link>

            {currentUser.isAdmin && (
              <li className="dashboard-btn-container">
                <Link className="dashboard-btn" to="/admin/dashboard">
                  Admin Dashboard
                </Link>
              </li>
            )}

            <li className="logout-btn">
              <button onClick={handleLogout}>Logout</button>
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
      <MenuIcon
        className="menuIcon"
        height="45"
        width="3rem"
        onClick={() => setToggleMenu(true)}
      />
    </nav>
  );
};

export default Navbar;
