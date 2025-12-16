import React, { useState } from "react";
import Logo from "../assets/TitleLogo3.png"
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={Logo}
            alt="Logo"
            className="rounded-circle me-2"
            height="40"
            width="40"
          />
          <span className="fw-bold">Company</span>
        </a>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link" href="#">Properties</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Rewards</a>
            </li>
            <li className="nav-item me-lg-2">
              <a className="nav-link position-relative" href="#">
                {/* Notification Icon */}
                <i className="bi bi-bell"></i>
                <span
                  className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                ></span>
              </a>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary me-2">
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary">
                    Sign Up
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={Logo}
                    alt="User"
                    className="rounded-circle me-1"
                    height="32"
                    width="32"
                  />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li><a className="dropdown-item" href="#">Dashboard</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Help</a></li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}