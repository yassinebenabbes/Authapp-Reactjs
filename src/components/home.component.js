import React, { Component } from "react";

export default class Home extends Component {
  
 
  render() {
    if(this.props.user){ // if user data exists show his first name and last name
      return <h2> Welcome {this.props.user.first_name } {this.props.user.last_name}</h2>;
    }
    return(<h2> you are not logged in</h2>) ; //else show youre no logged in F
  }
}
