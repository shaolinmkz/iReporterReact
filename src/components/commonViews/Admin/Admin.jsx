import React, { Component } from "react";

/**
 * @description stateful class based component that the admin page
 * @return {undefined}
 */
class Admin extends Component {
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
      image:
        "",
      username: "",
      email: "",
      phoneNumber: ""
    };
  }

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("user"));

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
    return (
      <div className="profile-details-border">
        <img
          src={this.state.image}
          alt="avatar"
          className="large-avatar"
          id="user-profile-image"
        />
        <br />
        <label htmlFor="uploadProfileImage" className="theme-orange hover">
          change image
        </label>
        <input type="file" id="uploadProfileImage" accept="image/*" />
        <img
          src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
          className="profileLoader"
        />
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

export default Admin;
