/* eslint-disable require-jsdoc */
import '../../app/App.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      hamburgerOpen: 'none',
      hamburgerClose: 'none',
      navMobile: 'none'
    }
  }

  handleHamburger = () => {
    const state = this.state;
    this.state.hamburgerClose === 'inline-block' ?
    this.setState({ ...state, hamburgerOpen: 'inline-block', hamburgerClose: 'none', navMobile: 'inline-block' }) :
    this.setState({ ...state, hamburgerOpen: 'none', hamburgerClose: 'inline-block', navMobile: 'none' });
  }

  handleOnclick = () => {
    this.setState({ hamburgerOpen: 'none', hamburgerClose: 'inline-block', navMobile: 'none'});
  }

  // componentWillUnmount () {
  //  console.log("Changed to" + window.addEventListener('resize', () => window.innerWidth == '1000px' ? this.setState({ hamburgerClose: 'inline-block'}): this.setState({ hamburgerClose: 'none'})));
  // }

  render() {
    const { navMobile } = this.state;
    return (
      <header className="clearfix">
      <div className="clearfix logo-container">
          <img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839738/ir.png" className="logo" />
      </div>
      <span className="sitename"><label>i</label>Reporter</span>
      <nav className="main-nav clearfix" >
          <ul className="clearfix" id="desktop-nav">
            {navPath.map((link, index) => (
              <li key={index}>
                <Link to={link.to}>
                {link.value}
                </Link>
              </li>
            ))}
          </ul>
      </nav>

      <nav className="main-nav clearfix" id="mobile-nav" style={{display: navMobile}}>
          <ul className="clearfix">
            {navPath.map((link, index) => (
              <li key={index}>
                <Link to={link.to}
                onClick={this.handleOnclick}>
                {link.value}
                </Link>
                </li>
            ))}
          </ul>
      </nav>
      <img
      src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839739/menu_icon.png"
      id="open-hamburger"
      style={{display: this.state.hamburgerClose}}
      onClick={this.handleHamburger}/>
      <img
      src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839739/menu_close_icon.png"
      id="close-hamburger"
      style={{display: this.state.hamburgerOpen}}
      onClick={this.handleHamburger} />
      <div id="generalMessage"></div>
    </header>
    )
  }
}


export default Header;

const navPath = [
  {
    to : '/home',
    value : 'home'
  },
  {
    to : '/howitworks',
    value : 'howitworks'
  },
  {
    to : '/about',
    value : 'about'
  },
  {
    to : '/report',
    value : 'report'
  },
  {
    to : '/profile',
    value : 'profile'
  },
  {
    to : '/admin',
    value : 'admin'
  },
  {
    to : '/',
    value : 'signout'
  }
];
