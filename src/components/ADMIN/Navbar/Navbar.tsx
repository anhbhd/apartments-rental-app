import logoImg from "./../../../assets/header-logo-admin.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: currentUser.email,
    },

    {
      key: "2",
      danger: true,
      label: "Logout",
      onClick: () => {
        logout();
      },
    },
  ];
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link to="/" className="flex ms-2 md:me-24">
              <img src={logoImg} className="h-10 me-3" alt="Homez Logo" />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <Dropdown menu={{ items }}>
                  <button
                    onClick={(e) => e.preventDefault()}
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={currentUser.photoURL}
                      alt="user"
                    />
                  </button>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
