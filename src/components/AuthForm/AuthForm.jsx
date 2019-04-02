import React, { Component } from "react";

/**
 * @description stateful class based component that handles authentication
 * @return {undefined}
 */
export default class AuthForm extends Component {
  /**
   * @description method that manages component state
   * @param {object} props - component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      login: {
        emailUsername: "",
        password: ""
      },
      signup: {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        othername: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
      },
      form: "login" // default form displayed
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleSignupChange = this.handleSignupChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.switchForm = this.switchForm.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.loginComp = this.loginComp.bind(this);
    this.signUpComp = this.signUpComp.bind(this);
  }

  /**
   * @description handles the login on change
   * @param {object} e
   * @return {undefined}
   */
  handleLoginChange(e) {
    this.setState({
      login: {
        ...this.state.login,
        [e.target.name]: e.target.value
      }
    });
  }

  /**
   * @description handles the signup unchnage
   * @param {object} e
   * @return {undefined}
   */
  handleSignupChange(e) {
    this.setState({
      signup: {
        ...this.state.signup,
        [e.target.name]: e.target.value
      }
    });
  }

  /**
   * @description handles the auth form render
   * @return {undefined}
   */
  renderForm() {
    return this.state.form === "login" ? this.loginComp() : this.signUpComp();
  }

  /**
   * @description handles auth form switching
   * @param {object} e
   * @return {undefined}
   */
  switchForm(e) {
    if (RegExp(e.target.className).test("switch-signup")) {
      e.target.parentNode.parentNode.reset();
      this.setState({ form: "signup" });
    } else {
      e.target.parentNode.parentNode.reset();
      this.setState({ form: "login" });
    }
  }

  /**
   * @description handles login form submit
   * @param {object} e
   * @return {undefined}
   */
  handleLoginSubmit(e) {
    e.preventDefault();
    alert(
      `Logged in! =>
      ${this.state.login.emailUsername},
      ${this.state.login.password}`
    );
  }

  /**
   * @description handles signup form submit
   * @param {object} e
   * @return {undefined}
   */
  handleSignupSubmit(e) {
    e.preventDefault();
    alert(
      "Registered! =>",
      this.state.signup.email,
      this.state.signup.username
    );
  }

  /**
   * @description method that renders login component
   * @return {JSX} returns jsx
   */
  loginComp() {
    return (
      <form
        className="signin-form clearfix"
        onSubmit={e => {
          this.handleLoginSubmit(e);
        }}>
        <h2>
          <span
            className="switch-signup"
            onClick={this.switchForm}
            style={{
              color: "#162661"
            }}>
            SIGNUP
          </span>
          |
          <span
            className="switch-signin"
            onClick={this.switchForm}
            style={{
              color: "#fe0100",
              paddingLeft: "0.5em"
            }}>
            LOGIN
          </span>
        </h2>
        <input
          type="text"
          name="emailUsername"
          placeholder="email or username"
          onChange={this.handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleLoginChange}
          required
        />
        <span>
          <input type="submit" value="Login" />
        </span>
        <img
          src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
          className="loader"
          style={{
            display: "none",
            width: "20%"
          }}
        />
        <br />
        <span className="theme-blue">New user?</span>
        <br />
        <br />
        <input
          type="button"
          title="new user sign-up"
          onClick={e => {
            this.setState({ form: "signup" });
            e.target.parentNode.reset();
          }}
          className="switch-signup theme-orange deactivate"
          value="Create an account here"
        />
      </form>
    );
  }

  /**
   * @description method that renders the signup component
   * @return {JSX} returns jsx
   */
  signUpComp() {
    return (
      <form
        className="signup-form clearfix"
        onSubmit={e => {
          this.handleSignupSubmit(e);
        }}>
        <h2>
          <span
            className="switch-signup"
            onClick={this.switchForm}
            style={{
              color: "#fe0100"
            }}>
            SIGNUP
          </span>
          |
          <span
            className="switch-signin"
            onClick={this.switchForm}
            style={{
              color: "#162661"
            }}>
            LOGIN
          </span>
        </h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={this.handleSignupChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={this.handleSignupChange}
          required
        />
        <input
          type="text"
          name="firstname"
          placeholder="Firstname"
          onChange={this.handleSignupChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          onChange={this.handleSignupChange}
          required
        />
        <input
          type="text"
          name="othername"
          placeholder="Othername"
          onChange={this.handleSignupChange}
        />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone number"
          onChange={this.handleSignupChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleSignupChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={this.handleSignupChange}
          required
        />
        <input type="submit" value="CREATE ACCOUNT" />
        <img
          src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
          className="loader"
          style={{
            display: "none",
            width: "20%"
          }}
        />
        <br />
        <span className="theme-blue">Already have an account?</span>
        <br />
        <br />
        <input
          type="button"
          title="existing user signin"
          onClick={e => {
            this.setState({ form: "login" });
            e.target.parentNode.reset();
          }}
          className="switch-signin deactivate"
          value="Sign in here"
        />
      </form>
    );
  }

  /**
   * @description lifecycle method that handles component render
   * @return {JSX} returns javascript syntax extension
   */
  render() {
    return <React.Fragment>{this.renderForm()}</React.Fragment>;
  }
}
