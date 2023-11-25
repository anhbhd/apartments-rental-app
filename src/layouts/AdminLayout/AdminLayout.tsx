import React, { useEffect } from "react";
import Navbar from "../../components/ADMIN/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/ADMIN/Sidebar/Sidebar";

const AdminLayout = () => {
  useEffect(() => {
    // Set the root font size using a CSS variable
    document.documentElement.style.setProperty("font-size", `16px`);
  }, []);
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
