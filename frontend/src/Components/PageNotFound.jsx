import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "easyUplaod | Page Not Found";
  });
  return (
    <div className="container text-center d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-3 text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
