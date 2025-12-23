import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If logged in, block login/signup pages
  if (token) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PublicRoute;
