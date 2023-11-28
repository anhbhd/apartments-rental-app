import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForbiddenLoggedRoute: React.FC = () => {
  const auth = useAuth();

  return !auth.currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default ForbiddenLoggedRoute;
