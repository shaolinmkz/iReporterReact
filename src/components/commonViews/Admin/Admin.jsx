import "babel-polyfill";
import React, { Component } from "react";
import { get, patch } from "axios";
import { toast, ToastType } from "react-toastify";
import { Redirect, Link } from "react-router-dom";
import { bool, string } from "prop-types";
import { connect } from "react-redux";
import notifyUser from "../../Toast.jsx";
import HelperUtils from "../../../utils/helperUtils";
import {
  redflagURL,
  interventionURL
} from "../../../redux/actionCreators/endPoints";
import AdminSelect from "../../AdminSelect.jsx";

/**
 * @description stateful class based component that the admin page
 * @param {object} e - event object
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
      newImage: localStorage.getItem("newImage"),
      showRed: true,
      showInt: false,
      activeRfTab: "admin-current",
      activeIntTab: "",
      showModal: false,
      loader: false
    };
  }

  componentDidMount = () => {
    this.setState({ loader: true });
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

    this.fetchRedflag();
    this.fetchIntervention();
  };

  fetchRedflag = async () => {
    const { token } = this.props;
    try {
      const redflagReport = await get(redflagURL, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
          authorization: token
        }
      });
      const { data } = redflagReport.data;
      this.setState({ redflagRecord: data, loader: false });
    } catch (err) {
      const { error } = err.response.data;
      toast(notifyUser(error), {
        type: ToastType.ERROR
      });
      return err;
    }
  };
  fetchIntervention = async () => {
    const { token } = this.props;
    try {
      const interventionReport = await get(interventionURL, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
          authorization: token
        }
      });
      const { data } = interventionReport.data;
      this.setState({ interventionRecord: data, loader: false });
    } catch (err) {
      const { error } = err.response.data;
      toast(notifyUser(error), {
        type: ToastType.ERROR
      });
      return err;
    }
  };

  handleRFSwitch = () => {
    this.setState({
      showRed: true,
      showInt: false,
      activeRfTab: "admin-current",
      activeIntTab: ""
    });
  };

  handleIntSwitch = () => {
    this.setState({
      showRed: false,
      showInt: true,
      activeIntTab: "admin-current",
      activeRfTab: ""
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
  };
  /**
   * @description Update state with status
   * @param {number} id
   * @param {string} status
   * @param {string} title
   * @returns {undefined}
   */
  handleUpdate = (id, status, title) => {
    this.setState({ recordId: id, status, title, showModal: true });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const incidentUrl = interventionURL;
    const { recordId, statusValue } = this.state;
    const { token } = this.props;
    try {
      const request = await patch(
        `${incidentUrl}/${recordId}/status`,
        { status: statusValue },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json",
            authorization: token
          }
        }
      );
      const { data } = request.data;
      toast(notifyUser(data[0].message), {
        type: ToastType.SUCCESS
      });
      this.setState({ loading: false, showModal: false, statusValue: "" });
    } catch (err) {
      const { error } = err.response.data;
      this.setState({ loading: false });
      toast(notifyUser(error), {
        type: ToastType.ERROR
      });
      return err;
    }
  };

  hideModal = e => {
    if (e.target.className === "outer-modal") {
      this.setState({ showModal: false });
    }
  };

  handleSelect = e => {
    this.setState({ statusValue: e.target.value });
  };

  /**
   * @description lifecycle method that manages admin component render
   * @returns {JSX} JSX
   */
  render() {
    document.title = "Admin";
    const { isLoggedIn, isAdmin } = this.props;
    const {
      loading,
      redflagRecord,
      interventionRecord,
      showRed,
      showInt,
      activeRfTab,
      activeIntTab,
      showModal,
      recordId,
      status,
      title,
      loader
    } = this.state;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    } else if (!isAdmin) {
      return <Redirect to="/profile" />;
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
                  <li
                    className={activeRfTab}
                    id="admin-red-flag"
                    onClick={this.handleRFSwitch}>
                    RED FLAG
                  </li>
                  <li
                    className={activeIntTab}
                    id="admin-intervention"
                    onClick={this.handleIntSwitch}>
                    INTERVENTION
                  </li>
                </ul>
              </nav>
            </section>
            <section className="list-of-records clearfix">
              <h1>RECORDS</h1>
              {loader && (
                <div
                  style={{
                    textAlign: "center"
                  }}>
                  <img
                    src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
                    alt="loader"
                    style={{ width: "20%" }}
                  />
                </div>
              )}
              {showRed && (
                <ul className="admin-redflag-list">
                  {redflagRecord.map(record => (
                    <li style={{ paddingTop: "0.5em" }} key={record.id}>
                      <Link
                        to={`/record/${record.id}`}
                        className="admin-redflag-link">
                        {record.title.slice(0, 30)}...
                      </Link>
                      <img
                        src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839745/red_flag.png"
                        className="red-flag-icon"
                        title="Red flag"
                      />
                      <button
                        className="change"
                        onClick={() => {
                          this.handleUpdate(
                            record.id,
                            record.status,
                            record.title
                          );
                        }}>
                        change
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {showInt && (
                <ul className="admin-intervention-list">
                  {interventionRecord.map(record => (
                    <li style={{ paddingTop: "0.5em" }} key={record.id}>
                      <Link
                        to={`/record/${record.id}`}
                        className="admin-redflag-link">
                        {`${record.title.slice(0, 30)}...`}
                      </Link>
                      <img
                        src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839737/intervene_icon.png"
                        className="red-flag-icon"
                        title="Red flag"
                      />
                      <button
                        className="change"
                        onClick={() =>
                          this.handleUpdate(
                            record.id,
                            record.status,
                            record.title
                          )
                        }>
                        change
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </section>
        {showModal && (
          <AdminSelect
            id={recordId}
            title={title}
            status={status}
            onSubmit={this.handleSubmit}
            loading={loading}
            onClick={this.hideModal}
            onChange={this.handleSelect}
          />
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
