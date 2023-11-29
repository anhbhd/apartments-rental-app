import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GeneralProtectedRoutes: React.FC = () => {
  const auth = useAuth();

  return auth.currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default GeneralProtectedRoutes;
