import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
export default class Forgot extends Component {
  state = {};
  SubmitForm = (e) => {
    e.preventDefault();
    const data ={
      email : this.email
    };
    axios
    .post("http://127.0.0.1:8000/api/forgot", data) //send data to api backend forgot route
    .then((res) => {
      e.target.reset(); //clear form
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "check your email",
            showConfirmButton: false,
            timer: 1500,
          }); // message to check email 
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email dosent exists", 
      }); // error generated in api backend if email desoent exists in database
    });

  };
  render() {
    return (
      <form onSubmit={this.SubmitForm}>
        <h3>Forgot Password</h3>
        <div className="form-group">
          <label> Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => (this.email = e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary btn-block">Submit</button>
      </form>
    );
  }
}
