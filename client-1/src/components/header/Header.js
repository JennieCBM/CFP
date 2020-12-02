import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => (
  <header>
    <div className="nav-bar">
      <div className="logo-nav">
        <h3>CFA</h3>
      </div>
      <nav>
        <NavLink exact activeClassName="active" to="/">
          My records
        </NavLink>
        <NavLink activeClassName="active" to="/all-operations">
          All my operations
        </NavLink>
      </nav>
    </div>
  </header>
);

export default Header;
