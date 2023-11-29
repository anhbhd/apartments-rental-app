import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateForAdminRoutes: React.FC = () => {
  const { currentUser } = useAuth();

  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateForAdminRoutes;
