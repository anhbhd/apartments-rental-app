import Navbar from "../../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";

const MainLayout = () => {
  let location = useLocation();

  useEffect(() => {
    document.documentElement.style.setProperty("font-size", `10px`);
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
