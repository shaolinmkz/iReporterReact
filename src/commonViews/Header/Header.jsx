import '../../app/App.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="clearfix">
    <div className="clearfix logo-container">
        <img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839738/iReporter/ir.png" className="logo" />
    </div>
    <span className="sitename"><label>i</label>Reporter</span>
    <nav className="main-nav clearfix">
        <ul className="clearfix" id="desktop-nav">
          <li><Link to="/home">home</Link></li>
          <li><Link to="/howitworks">how it works</Link></li>
          <li><Link to="/about">about</Link></li>
          <li><Link to="/report">report</Link></li>
          <li><Link to="/profile">profile</Link></li>
          <li className="adminNav"><Link to="./admin">admin</Link></li>
          <li><Link to="/" className="signout">signout</Link></li>
        </ul>
    </nav>

    <nav className="main-nav clearfix" id="mobile-nav">
        <ul className="clearfix">
          <li><Link to="/home">home</Link></li>
          <li><Link to="/howitworks">how it works</Link></li>
          <li><Link to="/about">about</Link></li>
          <li><Link to="/report">report</Link></li>
          <li><Link to="/profile">profile</Link></li>
          <li className="adminNav"><Link to="/admin">admin</Link></li>
          <li><Link to="/" className="signout">signout</Link></li>
        </ul>
    </nav>
    <img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839739/iReporter/menu_icon.png" id="open-hamburger" />
    <img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839739/iReporter/menu_close_icon.png" id="close-hamburger" />
    <div id="generalMessage"></div>
  </header>
  );

export default Header;
