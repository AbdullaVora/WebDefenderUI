import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("auth_token"); // Retrieve token from localStorage

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;