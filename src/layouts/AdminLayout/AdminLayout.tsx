import React, { useEffect } from "react";
import Navbar from "../../components/ADMIN/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/ADMIN/Sidebar/Sidebar";

const AdminLayout = () => {
  let location = useLocation();

  useEffect(() => {
    document.documentElement.style.setProperty("font-size", `16px`);
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="mt-16 ml-72">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
