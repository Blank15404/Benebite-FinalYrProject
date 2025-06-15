import React from "react";
import { Link } from "react-router-dom";
import "../pages/LandingPage.css";
import Logo from "../images/benebite-logo.webp"; 

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-text">
          <h1 className="main-title">BeneBite</h1>
          <h2 className="sub-title">TURNING LEFTOVERS INTO LIFELINES</h2>
        </div>
        <div className="logo-container">
          <img src={Logo} alt="BeneBite Logo" className="logo" />
        </div>
      </header>

      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/donor">Become a Donor</Link>
          </li>
          <li>
            <Link to="/receiver">Are You in Need?</Link>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
        <div className="navbar-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </>
  );
};

export default Header;