import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

export default class Register extends Component {
  state = {};
  // submit form
  SubmitForm = (e) => {
    e.preventDefault();
    const data = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      password_confirm: this.passwordconf,
    }; // getting data from <form>
    if (data.password === data.password_confirm) {
      // if pass and passw confirm is the same -> make register
      axios
        .post("http://127.0.0.1:8000/api/register", data)
        .then((res) => {
          // if registry is done show message done
          // console.log(res.data);
          e.target.reset(); //clear form
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You are registred succesfuly",
            showConfirmButton: false,
            timer: 1500,
          });

          return <Redirect to={"/"} />;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and password confirm is not the same",
      }); // show message error with sweeetalert if pwd and confirm pass is !=
    }
  };
  render() {
    return (
      <form onSubmit={this.SubmitForm}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label> First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            required
            onChange={(e) => (this.firstName = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label> Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            required
            onChange={(e) => (this.lastName = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label> Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            onChange={(e) => (this.email = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label> Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={(e) => (this.password = e.target.value)}
          />
        </div>

        <div className="form-group">
          <label> Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            required
            onChange={(e) => (this.passwordconf = e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary btn-block">Sign Up</button>
      </form>
    );
  }
}
