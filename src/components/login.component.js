import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
export default class Login extends Component {
  state = {};
  SubmitForm = (e) => {
    e.preventDefault();
    const data = {
      email: this.email,
      password: this.password,
    };
    axios
      .post("http://127.0.0.1:8000/api/login", data) // send data to login route api
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.setState({
          logged: true,
        });
        this.props.setdatauser(res.data.user);
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
        e.target.reset();
      });
  };
  render() {
    if (this.state.logged) {
      return <Redirect to={"/"} />;
    }
    let error = "";
    if (this.state.message) {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    }
    return (
      <form onSubmit={this.SubmitForm}>
        {error}
        <h3>Login</h3>
        <div className="form-group">
          <label> Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => (this.email = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label> Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => (this.password = e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary btn-block">Login</button>
        <p className="forgot-password text-right">
          <Link to={"/forgot"}> Forgot password </Link>
        </p>
      </form>
    );
  }
}
