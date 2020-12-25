import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  console.log(props);
  return(
  <header>
    <div className="nav-bar">
      <div className="logo-nav">
        <h3>CFA</h3>
        <h5>Welcome {props.user.name}!</h5>
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
)};

export default Header;
