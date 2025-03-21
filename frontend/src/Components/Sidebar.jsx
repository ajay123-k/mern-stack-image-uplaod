import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          easyUplaod
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              <NavLink
                to="/image-gallery"
                className={({ isActive }) =>
                  isActive ? "text-white nav-link" : "nav-link"
                }
              >
                <i className="fa fa-image me-2"></i> Gallery
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink
                to="/upload-image"
                className={({ isActive }) =>
                  isActive ? "text-white nav-link" : "nav-link"
                }
              >
                <i className="fa fa-upload me-2"></i> Uplaod
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-white nav-link" : "nav-link"
                }
              >
                <i className="fa fa-user me-2"></i> Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
