import React, { Component } from 'react';
// import PropTypes from 'prop-types';

/**
 *@description Login component
 */
export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      login: {
        emailUsername: '',
        password: '',
      },
      signup: {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        othername: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      },
      form: 'login', // default login form
    }
  }

  handleLoginChange = (e) => {
    this.setState({
    login: {
      ...this.state.login,
      [e.target.name]: e.target.value
    }
    });
  }

  handleSignupChange = (e) => {
    this.setState({
    signup: {
      ...this.state.signup,
      [e.target.name]: e.target.value
    }
    });
  }

  renderForm = () => this.state.form === 'login' ? this.loginComp() : this.signUpComp();

  loginComp = () => (
    <form className="signin-form clearfix" onSubmit={ (e) => { e.preventDefault(); } }>
        <h2>
          <span
            className="switch-signup"
            onClick={() => this.setState({ form: 'signup' })}
            style={{color:'#162661'}}>
            SIGNUP
          </span>|
          <span
            className="switch-signin"
            onClick={() => this.setState({ form: 'login' })}
            style={{color:'#fe0100', paddingLeft:'0.5em'}}>
            LOGIN
          </span>
        </h2>
      <input type="text" name="emailUsername" placeholder="email or username" onChange={this.handleLoginChange} required />
      <input type="password" name="password" placeholder="Password" onChange={this.handleLoginChange} required/>
      <span><input type="submit" value="Login"/></span>
      <img
      src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
      className="loader"
      style={{display:'none', width: '20%'}}
      />
      <br />
      <span className="theme-blue">New user?</span>
      <br />
      <br />
      <input type="button" title="new user sign-up" onClick={() => this.setState({ form: 'signup' })} className="switch-signup theme-orange deactivate" value="Create an account here"/>
    </form>
  );

  signUpComp = () => (
    <form className="signup-form clearfix" onSubmit={ (e) => e.preventDefault() } >
      <h2>
        <span
        className="switch-signup"
        onClick={() => this.setState({ form: 'signup' })}
        style={{color:'#fe0100'}}>
        SIGNUP
        </span> |
        <span
        className="switch-signin"
        onClick={() => this.setState({ form: 'login' })}
        style={{color:'#162661'}}>
        LOGIN
        </span>
      </h2>
      <input type="text" name="username" placeholder="Username" onChange={ this.handleSignupChange } required />
      <input type="email" name="email" placeholder="Email" onChange={ this.handleSignupChange } required />
      <input type="text" name="firstname" placeholder="Firstname" onChange={ this.handleSignupChange } required />
      <input type="text" name="lastname" placeholder="Lastname" onChange={ this.handleSignupChange } required />
      <input type="text" name="othername" placeholder="Othername" onChange={ this.handleSignupChange }  />
      <input type="number" name="phoneNumber" placeholder="Phone number" onChange={ this.handleSignupChange } required/>
      <input type="password" name="password" placeholder="Password" onChange={ this.handleSignupChange } required/>
      <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={ this.handleSignupChange } required />
      <input type="submit" value="CREATE ACCOUNT"/>
      <img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif" className="loader" style={{display:'none', width: '20%'}}/>
      <br />
      <span className="theme-blue">Already have an account?</span>
      <br />
      <br />
    <input type="button" title="existing user signin" onClick={() => this.setState({ form: 'login' })} className="switch-signin deactivate" value="Sign in here" />
  </form>
  )

  render() {
    return (
      <React.Fragment>
        {this.renderForm()}
      </React.Fragment>
    )
  }
}
