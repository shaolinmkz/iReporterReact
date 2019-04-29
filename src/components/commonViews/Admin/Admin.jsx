import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bool, string } from "prop-types";
import { connect } from "react-redux";
import HelperUtils from "../../../utils/helperUtils";

/**
 * @description stateful class based component that the admin page
 * @return {undefined}
 */
export class Admin extends Component {
  /**
   * @description method that manages component state
   * @param {object} props - component properties
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      image: "",
      username: "",
      email: "",
      phoneNumber: "",
      interventionRecord: [],
      redflagRecord: [],
      loading: false,
      uploading: false,
      newImage: localStorage.getItem("newImage")
    };
  }

  componentDidMount = () => {
    const { token } = this.props;
    const user = HelperUtils.verifyToken(token);

    this.setState({
      firstname: user.firstname,
      lastname: user.lastname,
      image: user.profileImage,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  };

  /**
   * @description method that renders the profile detalis
   * @returns {JSX} JSX
   */
  loadProfileDetails = () => {
    const { image, newImage } = this.state;
    return (
      <div className="profile-details-border">
        <img
          src={newImage ? newImage : image}
          alt="avatar"
          className="large-avatar"
          id="user-profile-image"
        />
        <br />
        <h1>
          {this.state.firstname}, {this.state.lastname}
        </h1>
        <div className="profile-details">
          <label className="blue">Username:</label>
          <span>{this.state.username}</span>
          <br />
          <label className="blue">Email:</label>
          <a href={`mailto:${this.state.email}`}>{this.state.email}</a>
          <br />
          <label className="blue">Phone:</label>
          <a href={`tel:${this.state.phoneNumber}`}>{this.state.phoneNumber}</a>
          <br />
        </div>
      </div>
    );
  }

  /**
   * @description method that renders user records display
   * @returns {JSX} JSX
   */
  loadRecords = () => {
    return (
      <div className="admin-container clearfix">
        <section className="admin-nav clearfix">
          <h1>CATEGORY</h1>
          <nav>
            <ul>
              <li className="admin-current" id="admin-red-flag">
                RED FLAG
              </li>
              <li id="admin-intervention">INTERVENTION</li>
            </ul>
          </nav>
        </section>

        <section className="list-of-records clearfix">
          <h1>RECORDS</h1>
          <div
            style={{
              textAlign: "center"
            }}>
            <img
              src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
              id="adminRecordLoader"
              style={{
                display: "none"
              }}
            />
          </div>

          <ul
            className="admin-intervention-list"
            style={{
              display: "none"
            }}
          />
        </section>

        <section className="outer-modal">
          <div className="inner-box">
            <form className="update-status-form" />
          </div>
        </section>
      </div>
    );
  }

  /**
   * @description lifecycle method that manages admin component render
   * @returns {JSX} JSX
   */
  render() {
    document.title = "Admin";
    const { isLoggedIn, isAdmin } =  this.props;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    } else if (!isAdmin) {
      return <Redirect to="/profile" />
    }
    return (
      <React.Fragment>
        <section className="admin profile" id="admin">
          <div className="profile-image-container clearfix">
            {this.loadProfileDetails()}
          </div>
          <div className="admin-container clearfix">
            <section className="admin-nav clearfix">
              <h1>CATEGORY</h1>
              <nav>
                <ul>
                  <li className="admin-current" id="admin-red-flag">
                    RED FLAG
                  </li>
                  <li id="admin-intervention">INTERVENTION</li>
                </ul>
              </nav>
            </section>
            <section className="list-of-records clearfix">
              <h1>RECORDS</h1>
              <div
                style={{
                  textAlign: "center"
                }}>
                <img
                  src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
                  id="adminRecordLoader"
                />
              </div>
              <ul className="admin-redflag-list" />
              <ul
                className="admin-intervention-list"
                style={{
                  display: "none"
                }}
              />
            </section>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

/**
 * @description Map state to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
export const mapStateToProps = ({ userData }) => {
  const { isLoggedIn, token, isAdmin } = userData;
  return {
    isLoggedIn,
    token,
    isAdmin
  };
};

Admin.propTypes = {
  isLoggedIn: bool.isRequired,
  isAdmin: bool.isRequired,
  token: string.isRequired
};

export default connect(mapStateToProps)(Admin);
