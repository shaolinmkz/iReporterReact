import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const navPath = [
  {
    to: "/home",
    value: "home"
  },
  {
    to: "/howitworks",
    value: "howitworks"
  },
  {
    to: "/about",
    value: "about"
  },
  {
    to: "/report",
    value: "report"
  },
  {
    to: "/profile",
    value: "profile"
  },
  {
    to: "/admin",
    value: "admin"
  },
  {
    to: "/signout",
    value: "signout"
  }
];

/**
 * @description stateless component that handles the header
 * @return {undefined}
 */
class Header extends Component {
  /**
   * @description header constructor
   * @param {object} props - header props
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      hamburgerOpen: "none",
      hamburgerClose: "none",
      navMobile: "none"
    };
    this.handleHamburger = this.handleHamburger.bind(this);
    this.handleOnclick = this.handleOnclick.bind(this);
  }

  /**
   * @description method that changes headers state
   * @returns {undefined}
   */
  componentDidMount() {
    const body = document.body;
    body.onresize = () => {
      if (window.innerWidth <= 1000) {
        this.setState({
          hamburgerClose: "inline-block",
          navMobile: "none",
          hamburgerOpen: "none"
        });
      } else {
        this.setState({
          ...this.state,
          hamburgerClose: "none",
          hamburgerOpen: "none",
          navMobile: "none"
        });
      }
    };
    body.onload = () => {
      if (window.innerWidth <= 1000) {
        this.setState({
          hamburgerClose: "inline-block",
          navMobile: "none",
          hamburgerOpen: "none"
        });
      }
    };
  }
  /**
   * @description method that changes state of the hamburger menu
   * @return {undefined}
   */
  handleHamburger() {
    const { state } = this;
    this.state.hamburgerClose === "inline-block"
      ? this.setState({
        ...state,
        hamburgerOpen: "inline-block",
        hamburgerClose: "none",
        navMobile: "inline-block"
      })
      : this.setState({
        ...state,
        hamburgerOpen: "none",
        hamburgerClose: "inline-block",
        navMobile: "none"
      });
  }
  /**
   * @description method that changes the style of the hamburger menu
   * @return {undefined}
   */
  handleOnclick() {
    this.setState({
      hamburgerOpen: "none",
      hamburgerClose: "inline-block",
      navMobile: "none"
    });
  }

  /**
   * @description method that renders the header component
   * @return {JSX} return JSX
   */
  render() {
    const { navMobile } = this.state;
    return (
      <header className="clearfix">
        <div className="clearfix logo-container">
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839738/ir.png"
            className="logo"
          />
        </div>
        <span className="sitename">
          <label>i</label>Reporter
        </span>
        <nav className="main-nav clearfix">
          <ul className="clearfix" id="desktop-nav">
            {navPath.map((link, index) => (
              <li key={index}>
                <NavLink to={link.to}>{link.value}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          className="main-nav clearfix"
          id="mobile-nav"
          style={{
            display: navMobile
          }}>
          <ul className="clearfix">
            {navPath.map((link, index) => (
              <li key={index}>
                <NavLink to={link.to} onClick={this.handleOnclick}>
                  {link.value}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <img
          src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839739/menu_icon.png"
          id="open-hamburger"
          style={{
            display: this.state.hamburgerClose
          }}
          onClick={this.handleHamburger}
        />
        <img
          src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839739/menu_close_icon.png"
          id="close-hamburger"
          style={{
            display: this.state.hamburgerOpen
          }}
          onClick={this.handleHamburger}
        />
        <div id="generalMessage" />
      </header>
    );
  }
}

export default Header;
