import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Nav extends Component {
  logout = () => {
    localStorage.clear();
    this.props.setdatauser(null);
  }; // function for logout using clear token
  render() {
    let html; // customize view for user if connected or not
    if (this.props.user) {
      //if user is connected show logout
      html = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              style={{ color: "white" }}
              onClick={this.logout}
              className="nav-link"
            >
              log out
            </Link>
          </li>
        </ul>
      );
    } else {
      //else show login and sign up
      html = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link style={{ color: "white" }} to={"/login"} className="nav-link">
              login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={{ color: "white" }}
              to={"/register"}
              className="nav-link"
            >
              Sign up
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <a className="navbar-brand">
         <img src="https://www.3wa.ma/assets/img/logos/logo-2-dark.png" width="50" height="50" alt=""/>
        </a>
        <div className="container">
          <Link style={{ color: "white" }} to={"/"} className="navbar-brand">
            Home
          </Link>
          {/* html is dynamic depending on the user data*/}
          <div className="collapse navbar-collapse">{html}</div>
        </div>
      </nav>
    );
  }
}
