import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface IGeneralProtectedRouteProps {
  element: React.ReactElement;
  redirectTo: string;
  path: string;
}

const GeneralProtectedRoute: React.FC<IGeneralProtectedRouteProps> = ({
  element,
  redirectTo,
  ...rest
}: IGeneralProtectedRouteProps) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      element={auth.user ? <Navigate to={redirectTo} /> : element}
    />
  );
};

export default GeneralProtectedRoute;
