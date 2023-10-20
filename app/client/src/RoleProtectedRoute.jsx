import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import CourseList from "./pages/CourseList";

const RoleBasedRoute = ({ requiredRoles }) => {
  const { isAuthenticated, userRole } = useAuth();
  console.log(requiredRoles);
  console.log(userRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!requiredRoles.includes(userRole)) {
    return <Navigate to="/error" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
