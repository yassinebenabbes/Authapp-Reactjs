import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home.component";
import Nav from "./components/nav.component";
import Login from "./components/login.component";
import Forgot from "./components/forgot.component";
import Register from "./components/register.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

export default class App extends Component {
  state = {};
  setdatauser = (user) => {
    this.setState({
      user: user,
    });
  };//set data user 
  componentDidMount = () => {
    if(localStorage.getItem("token") != null){ //if token exists get data of user else show youre not login in home.component
      const head = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("http://127.0.0.1:8000/api/user", head) //get data user from api laravel and specify token 
      .then((res) => {
        // console.log(res.data);
        this.setdatauser(res.data); //set user data using the function setdatauser defined
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav user={this.state.user} setdatauser={this.setdatauser} />
          <div className="auth-wrapper">
            <div className="auth-inner">
              {/* switch for routes  */}
              <Switch>  
                {/* route home with user data */}
                <Route
                  exact
                  path="/"
                  component={() => <Home user={this.state.user} />}
                />
                {/* route login with user data for testing if is already connected */}
                <Route
                  exact
                  path="/login"
                  component={() => <Login setdatauser={this.setdatauser} />}
                />
                {/* Route for register */}
                <Route exact path="/register" component={Register} />
                <Route exact path="/Forgot" component={Forgot} />
              </Switch>
              {/* end switch */}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

