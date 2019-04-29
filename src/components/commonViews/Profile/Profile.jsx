import "babel-polyfill";
import React, { Component, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { get, post, patch } from "axios";
import { bool, string } from "prop-types";
import { toast, ToastType } from "react-toastify";
import { connect } from "react-redux";
import dotenv from "dotenv";
import notifyUser from "../../Toast.jsx";
import {
  redflagURL,
  interventionURL,
  personalRedflagURL,
  personalInterventionURL,
  profileImageUploadURL
} from "../../../redux/actionCreators/endPoints";
import HelperUtils from "../../../utils/helperUtils";

dotenv.config();

/**
 * @description class based component for the profile page
 * @param {object} e - event object
 * @return {undefined}
 */
export class Profile extends Component {
  /**
   * @description method that describes the state and method usage of the class
   * @param {object} props - component property
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

  componentWillMount = async () => {
    this.setState({ loading: true });
    await this.fetchRedflagCount();
    await this.fetchInterventionCount();
    await this.fetchRedflagRecord();
    await this.fetchInterventionRecord();

    await this.setState({ loading: false });
  };

  fetchRedflagCount = async () => {
    const { token } = this.props;
    try {
      const redflagCount = await get(`${redflagURL}/profile/status`, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
          authorization: token
        }
      });
      const { data } = redflagCount.data;
      this.setState({
        rfDraft: data[0].draft,
        rfResolved: data[0].resolved,
        rfUnderInvestigation: data[0].underInvestigation,
        rfRejected: data[0].rejected
      });
    } catch (err) {
      return err;
    }
  };

  fetchInterventionCount = async () => {
    const { token } = this.props;

    try {
      const interventionCount = await get(`${interventionURL}/profile/status`, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
          authorization: token
        }
      });
      const { data } = interventionCount.data;
      this.setState({
        intDraft: data[0].draft,
        intResolved: data[0].resolved,
        intUnderInvestigation: data[0].underInvestigation,
        intRejected: data[0].rejected
      });
    } catch (err) {
      return err;
    }
  };

  fetchRedflagRecord = async () => {
    const { token } = this.props;

    try {
      const redflagReport = await get(personalRedflagURL, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
          authorization: token
        }
      });
      const { data } = redflagReport.data;
      this.setState({ redflagRecord: data });
    } catch (err) {
      return err;
    }
  };
  fetchInterventionRecord = async () => {
    const { token } = this.props;
    try {
      const interventionReport = await get(personalInterventionURL, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
          authorization: token
        }
      });
      const { data } = interventionReport.data;
      this.setState({ interventionRecord: data });
    } catch (err) {
      return err;
    }
  };

  componentDidMount = async () => {
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

    if (localStorage.getItem("deleted")) {
      localStorage.removeItem("deleted");
      toast(notifyUser("Deleted Successfully"), { type: ToastType.SUCCESS });
    }
  };

  handleImageUpload = async e => {
    this.setState({ uploading: true });
    const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_IMAGE_UPLOAD_URL;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

    try {
      const getImage = await post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      const { data } = getImage;
      const secureUrl = data.secure_url;

      this.setState({ previewImage: secureUrl });
      this.updateProfileImage(secureUrl);
    } catch (err) {
      toast(notifyUser("Could not upload profile image"), {
        type: ToastType.ERROR
      });
      this.setState({ uploading: false });
    }
  };

  /**
   * @description Update Profile Image
   * @param {string} secureUrl
   * @returns {object} set state
   */
  updateProfileImage = async secureUrl => {
    const { token } = this.props;
    try {
      await patch(
        profileImageUploadURL,
        { profileImage: secureUrl },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json",
            authorization: token
          }
        }
      );

      const user = JSON.parse(localStorage.getItem("user"));
      user.profileImage = secureUrl;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("newImage", secureUrl);
      toast(notifyUser("Profile image uploaded successfully"), {
        type: ToastType.SUCCESS
      });
      return this.setState({ uploading: false, image: secureUrl });
    } catch (err) {
      this.setState({ uploading: false });
      toast(notifyUser("Profile image failed to update"), {
        type: ToastType.ERROR
      });
      return err;
    }
  };

  /**
   * @description loads the profile details
   * @return {JSX} returns JSX
   */
  loadProfileDetails = () => {
    const { uploading, image, newImage } = this.state;

    return (
      <div className="profile-details-border">
        <img
          src={newImage ? newImage : image}
          alt="avatar"
          className="large-avatar"
          id="user-profile-image"
        />
        <br />
        {!uploading && (
          <label htmlFor="uploadProfileImage" className="theme-orange hover">
            change image
          </label>
        )}
        <input
          type="file"
          id="uploadProfileImage"
          accept="image/*"
          onChange={this.handleImageUpload}
        />
        {uploading && (
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
            className="profileLoader"
          />
        )}
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
  };
  /**
   * @description loads the intervention count details
   * @return {JSX} returns JSX
   */
  loadInterventionCount = () => {
    const {
      intDraft,
      intResolved,
      intUnderInvestigation,
      intRejected
    } = this.state;
    return (
      <React.Fragment>
        <h1>INTERVENTION STATUS</h1>
        <div className="record-count .border-radius-bl">
          <label className="grey" id="int-draft">
            {intDraft}
          </label>
          <br />
          <span className="grey">DRAFT</span>
        </div>
        <div className="record-count middle .border-radius-bl">
          <label className="green" id="int-resolved">
            {intResolved}
          </label>
          <br />
          <span className="green">RESOLVED</span>
        </div>
        <div className="record-count middle .border-radius-br">
          <label className="yellow" id="int-under-investigation">
            {intUnderInvestigation}
          </label>
          <br />
          <span className="yellow">UNDER INVESTIGATION</span>
        </div>
        <div className="record-count .border-radius-br">
          <label className="red" id="int-rejected">
            {intRejected}
          </label>
          <br />
          <span className="red">REJECTED</span>
        </div>
      </React.Fragment>
    );
  };

  /**
   * @description loads RedFlag count details
   * @return {JSX} returns JSX
   */
  loadRedflagCount = () => {
    const {
      rfDraft,
      rfResolved,
      rfUnderInvestigation,
      rfRejected
    } = this.state;
    return (
      <React.Fragment>
        <h1>RED FLAG STATUS</h1>
        <div className="record-count .border-radius-bl">
          <label className="grey" id="rf-draft">
            {rfDraft}
          </label>
          <br />
          <span className="grey">DRAFT</span>
        </div>
        <div className="record-count middle .border-radius-bl">
          <label className="green" id="rf-resolved">
            {rfResolved}
          </label>
          <br />
          <span className="green">RESOLVED</span>
        </div>
        <div className="record-count middle .border-radius-br">
          <label className="yellow" id="rf-under-investigation">
            {rfUnderInvestigation}
          </label>
          <br />
          <span className="yellow">UNDER INVESTIGATION</span>
        </div>
        <div className="record-count .border-radius-br">
          <label className="red" id="rf-rejected">
            {rfRejected}
          </label>
          <br />
          <span className="red">REJECTED</span>
        </div>
      </React.Fragment>
    );
  };

  /**
   * @description renders the profile to the DOM
   * @return {JSX} returns JSX
   */
  render() {
    document.title = "Profile";
    const { isLoggedIn } = this.props;
    const { redflagRecord, interventionRecord, loading } = this.state;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
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
              {redflagRecord.length > 0 &&
                redflagRecord.map(record => (
                  <li key={record.id}>
                    <Link to={`/record/${record.id}`} className="redflag-link">
                      {`${record.title.slice(0, 30)}...`}
                    </Link>
                    <img
                      src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839745/red_flag.png"
                      className="red-flag-icon"
                      title="red-flag"
                      alt="red-flag"
                    />
                  </li>
                ))}
              {redflagRecord.length < 1 && (
                <h2
                  style={{
                    color: "grey",
                    padding: "0.55em 0 0 0",
                    textAlign: "center",
                    fontSize: "1.2em"
                  }}>
                  NO RED-FLAG RECORDS
                </h2>
              )}
            </ul>

            <ul className="intervention-list clearfix" id="intervention-list">
              <h2 className="font-setting theme-blue">INTERVENTION</h2>
              {interventionRecord.length > 0 &&
                interventionRecord.map(record => (
                  <li key={record.id}>
                    <Link
                      to={`/record/${record.id}`}
                      className="intervention-link">
                      {`${record.title.slice(0, 30)}...`}
                    </Link>
                    <img
                      src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839737/intervene_icon.png"
                      className="red-flag-icon"
                      title="intervention"
                      alt="red-flag"
                    />
                  </li>
                ))}
              {interventionRecord.length < 1 && (
                <Fragment>
                  <h2
                    style={{
                      color: "grey",
                      padding: "0.55em 0 0 0",
                      textAlign: "center",
                      fontSize: "1.2em"
                    }}>
                    NO INTERVENTION RECORDS
                  </h2>
                </Fragment>
              )}
            </ul>
          </section>
        </section>
        {loading && (
          <div
            style={{
              position: "fixed",
              zIndex: "11000",
              left: "0",
              top: "0",
              height: "100%",
              width: "100%",
              overflow: "auto",
              backgroundColor: "rgba(255, 255, 255, 1)",
              cursor: "wait",
              textAlign: "center"
            }}>
            <img
              src="https://res.cloudinary.com/shaolinmkz/image/upload/v1546244139/mfwse2iecjdgk7m4sdeb.gif"
              alt="loader"
              style={{
                top: "50%",
                left: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)"
              }}
            />
          </div>
        )}
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
  const { isLoggedIn, token } = userData;
  return {
    isLoggedIn,
    token
  };
};

Profile.propTypes = {
  isLoggedIn: bool.isRequired,
  token: string.isRequired
};

export default connect(mapStateToProps)(Profile);
