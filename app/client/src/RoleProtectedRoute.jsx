import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleBasedRoute = ({ requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (location.pathname !== "/error" && userRole !== requiredRole) {
    console.log("here");
    return <Navigate to="/error" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
