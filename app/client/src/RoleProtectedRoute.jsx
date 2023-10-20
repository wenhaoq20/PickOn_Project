import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleBasedRoute = ({ requiredRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!requiredRoles.includes(userRole)) {
    return <Navigate to="/error" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
