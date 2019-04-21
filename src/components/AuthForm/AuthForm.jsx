import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { func, bool } from "prop-types";
// import { Redirect } from 'react-router-dom';
import {
  authUserLoginAction,
  authUserSignupAction,
  authLoading
} from "../../redux/actionCreators/authActions";

/**
 * @description stateful class based component that handles authentication
 * @return {undefined}
 */
class AuthForm extends Component {
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
  }

  /**
   * @description handles the login on change
   * @param {object} e
   * @return {undefined}
   */
  handleLoginChange = e => {
    this.setState({
      login: {
        ...this.state.login,
        [e.target.name]: e.target.value
      }
    });
  };

  /**
   * @description handles the signup unchnage
   * @param {object} e
   * @return {undefined}
   */
  handleSignupChange = e => {
    this.setState({
      signup: {
        ...this.state.signup,
        [e.target.name]: e.target.value
      }
    });
  };

  /**
   * @description handles the auth form render
   * @return {undefined}
   */
  renderForm = () => {
    return this.state.form === "login" ? this.loginComp() : this.signUpComp();
  };

  /**
   * @description handles auth form switching
   * @param {object} e
   * @return {undefined}
   */
  switchForm = e => {
    if (RegExp(e.target.className).test("switch-signup")) {
      e.target.parentNode.parentNode.reset();
      this.setState({ form: "signup" });
    } else {
      e.target.parentNode.parentNode.reset();
      this.setState({ form: "login" });
    }
  };

  /**
   * @description handles login form submit
   * @param {object} e
   * @return {undefined}
   */
  handleLoginSubmit = e => {
    e.preventDefault();
    const { login } = this.state;
    const { authLoginUser, authLoader } = this.props;
    authLoader();
    authLoginUser(login);
  };

  /**
   * @description handles signup form submit
   * @param {object} e
   * @return {undefined}
   */
  handleSignupSubmit(e) {
    e.preventDefault();
    const { signup } = this.state;
    const { authSignupUser, authLoader } = this.props;
    authLoader();
    authSignupUser(signup);
  }

  /**
   * @description method that renders login component
   * @return {JSX} returns jsx
   */
  loginComp() {
    const { loading } = this.props;
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
        {loading && (
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
            className="loader"
            style={{ width: "20%" }}
          />
        )}
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
    const { loading } = this.props;
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
        {loading && (
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
            className="loader"
            style={{ width: "20%" }}
          />
        )}
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
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/home" />
    }
    return <Fragment>{this.renderForm()}</Fragment>;
  }
}

/**
 * @description map dispatch to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authLoginUser: authUserLoginAction,
      authSignupUser: authUserSignupAction,
      authLoader: authLoading
    },
    dispatch
  );

/**
 * @description Map state to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapStateToProps = ({ authData, userData }) => {
  const { loading } = authData;
  const { isLoggedIn } = userData;
  return {
    loading,
    isLoggedIn
  };
};

AuthForm.propTypes = {
  authLoginUser: func.isRequired,
  authSignupUser: func.isRequired,
  authLoader: func.isRequired,
  loading: bool.isRequired,
  isLoggedIn: bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
