import React from "react";
import { Redirect } from "react-router-dom";
import { bool } from 'prop-types';
import { connect } from "react-redux";

/**
 * @description Home
 * @returns {JSX} JSX
 */
const Home = ({isLoggedIn}) => {
  document.title = "Home";
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

/**
 * @description Map state to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapStateToProps = ({ userData }) => {
  const { isLoggedIn } = userData;
  return {
    isLoggedIn
  };
};

Home.propTypes = {
  isLoggedIn: bool.isRequired
};


export default connect(mapStateToProps)(Home);
