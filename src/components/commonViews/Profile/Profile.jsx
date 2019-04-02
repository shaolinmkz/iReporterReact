import React, { Component } from "react";

/**
 * @description class based component for the profile page
 * @return {undefined}
 */
class Profile extends Component {
/**
 * @description method that describes the state and method usage of the class
 * @param {object} props - component property
 * @returns {undefined}
 */
  constructor(props) {
    super(props);
    this.state = {
      firstname: "Chukwuemeka",
      lastname: "Nwabuzor",
      image:
        "https://res.cloudinary.com/shaolinmkz/image/upload/v1553840626/ynkw4qvugqyfjoklt" +
        "yrx.jpg",
      username: "shaolinmkz",
      email: "nwabuzor.obiora@gmail.com",
      phoneNumber: "07067443245"
    };
    this.loadProfileDetails = this.loadProfileDetails.bind(this);
    this.loadInterventionCount = this.loadInterventionCount.bind(this);
    this.loadRedflagCount = this.loadRedflagCount.bind(this);
  }

  /**
   * @description loads the profile details
   * @return {JSX} returns JSX
   */
  loadProfileDetails() {
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
   * @description loads the intervention count details
   * @return {JSX} returns JSX
   */
  loadInterventionCount() {
    return (
      <React.Fragment>
        <h1>INTERVENTION STATUS</h1>
        <div className="record-count .border-radius-bl">
          <label className="grey" id="int-draft">
            0
          </label>
          <br />
          <span className="grey">DRAFT</span>
        </div>
        <div className="record-count middle .border-radius-bl">
          <label className="green" id="int-resolved">
            0
          </label>
          <br />
          <span className="green">RESOLVED</span>
        </div>
        <div className="record-count middle .border-radius-br">
          <label className="yellow" id="int-under-investigation">
            0
          </label>
          <br />
          <span className="yellow">UNDER INVESTIGATION</span>
        </div>
        <div className="record-count .border-radius-br">
          <label className="red" id="int-rejected">
            0
          </label>
          <br />
          <span className="red">REJECTED</span>
        </div>
      </React.Fragment>
    );
  }

  /**
   * @description loads RedFlag count details
   * @return {JSX} returns JSX
   */
  loadRedflagCount() {
    return (
      <React.Fragment>
        <h1>RED FLAG STATUS</h1>
        <div className="record-count .border-radius-bl">
          <label className="grey" id="rf-draft">
            0
          </label>
          <br />
          <span className="grey">DRAFT</span>
        </div>
        <div className="record-count middle .border-radius-bl">
          <label className="green" id="rf-resolved">
            0
          </label>
          <br />
          <span className="green">RESOLVED</span>
        </div>
        <div className="record-count middle .border-radius-br">
          <label className="yellow" id="rf-under-investigation">
            0
          </label>
          <br />
          <span className="yellow">UNDER INVESTIGATION</span>
        </div>
        <div className="record-count .border-radius-br">
          <label className="red" id="rf-rejected">
            0
          </label>
          <br />
          <span className="red">REJECTED</span>
        </div>
      </React.Fragment>
    );
  }

  /**
   * @description renders the profile to the DOM
   * @return {JSX} returns JSX
   */
  render() {
    return (
      <React.Fragment>
        <section className="profile" id="profile">
          <section className="inner-profile-border clearfix">
            <div className="profile-image-container clearfix">
              {this.loadProfileDetails()}
            </div>

            <div className="redflag-count-container clearfix">
              {this.loadRedflagCount()}
            </div>

            <div className="intervention-count-container clearfix">
              {this.loadInterventionCount()}
            </div>
          </section>

          <section className="record-list clearfix">
            <h1>YOUR RECORDS</h1>
            <ul className="redflag-list clearfix" id="redflag-list">
              <h2 className="font-setting theme-orange">RED FLAGS</h2>
            </ul>

            <ul className="intervention-list clearfix" id="intervention-list">
              <h2 className="font-setting theme-blue">INTERVENTION</h2>
            </ul>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default Profile;
