import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, authRoute }) => {
  const user = useSelector((state) => state.user);

  // If it's an auth route (Login/Register) and the user is logged in, redirect to the gallery
  if (authRoute && user) {
    return <Navigate to="/image-gallery" />;
  }

  // If it's a private route and the user is not logged in, redirect to login
  if (!authRoute && !user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
