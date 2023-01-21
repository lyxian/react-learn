import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Button from "./components/Button";

const localhost = process.env.LOCALHOST;

class App extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.firstNameInput = this.firstNameInput.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      token: "",
      checkUser: false,
      showError: false,
      authFirstName: "",
      authLastName: "",
    };
  }

  firstNameInput(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  lastNameInput(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  emailInput(e) {
    this.setState({
      email: e.target.value,
    });
  }

  passwordInput(e) {
    this.setState({
      password: e.target.value,
    });
  }

  submitForm() {
    console.log("Submitting form");

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(data);

    axios
      .post(`${localhost}/api/register`, data)
      .then((res) => {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        console.log("Form submitted");
      })
      .catch((err) => {
        alert("Error in adding task!");
        // console.log("Error in adding task!");
      });
  }

  loginForm() {
    console.log("Validate login credentials");

    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(data);

    axios
      .post(`${localhost}/api/login`, data)
      .then((res) => {
        this.setState({
          email: "",
          password: "",
          token: res.data.token,
        });
        console.log("Login completed");
      })
      .catch((err) => {
        alert("Error in login");
        // console.log("Error in adding task!");
      });
  }

  handleAuth() {
    console.log(`Using token-${this.state.token}`);
    axios
      .get(`${localhost}/api/welcome`, {
        headers: {
          "x-access-token": this.state.token,
        },
      })
      .then((res) => {
        this.setState({
          checkUser: true,
          showError: false,
          authFirstName: res.data.firstName,
          authLastName: res.data.lastName,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        this.setState({
          checkUser: false,
          showError: true,
        });
        // console.log(err);
        // alert("Error in login");
        // console.log("Error in adding task!");
      });
  }

  render() {
    return (
      <div className="app">
        <h1>This is Heading 1.</h1>
        <Button name="Authenticate" submitForm={this.handleAuth} />
        {this.state.checkUser && (
          <div>
            <hr />
            <p>
              Welcome, {this.state.authFirstName} {this.state.authLastName}
            </p>
            <hr />
          </div>
        )}
        {this.state.showError && (
          <div>
            <hr />
            <p>Bad credentials, please try again</p>
            <hr />
          </div>
        )}
        <p>I am a paragraph.</p>
        <h3>Registration</h3>
        <form>
          <div className="form">
            <div>
              <span>Enter firstName: </span>
              <input
                name="firstName"
                type="text"
                onChange={(e) => this.firstNameInput(e)}
                value={this.state.firstName}
              ></input>
            </div>
            <div>
              <span>Enter lastName: </span>
              <input
                name="lastName"
                type="text"
                onChange={(e) => this.lastNameInput(e)}
                value={this.state.lastName}
              ></input>
            </div>
            <div>
              <span>Enter email: </span>
              <input
                name="email"
                type="text"
                onChange={(e) => this.emailInput(e)}
                value={this.state.email}
              ></input>
            </div>
            <div>
              <span>Enter password: </span>
              <input
                name="password"
                type="password"
                onChange={(e) => this.passwordInput(e)}
                value={this.state.password}
              ></input>
            </div>
            <div>
              <Button submitForm={this.submitForm} />
            </div>
          </div>
        </form>
        <h3>Login</h3>
        <form>
          <div className="form">
            <div>
              <span>Email: </span>
              <input
                name="email"
                type="text"
                onChange={(e) => this.emailInput(e)}
                value={this.state.email}
              ></input>
            </div>
            <div>
              <span>Password: </span>
              <input
                name="password"
                type="password"
                onChange={(e) => this.passwordInput(e)}
                value={this.state.password}
              ></input>
            </div>
            <div>
              <Button submitForm={this.loginForm} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
