import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { bool, string, func } from "prop-types";
import { bindActionCreators } from "redux";
import { get } from "axios";
import { connect } from "react-redux";
import {
  interventionURL,
  redflagURL
} from "../../../redux/actionCreators/endPoints";
import {
  closeModalAction,
  openModalAction
} from "../../../redux/actionCreators/modalActions";
import DisplayRecordCard from "../../DisplayRecordCard.jsx";

/**
 * @description Home
 * @param {object} e
 * @returns {JSX} JSX
 */
export class Home extends Component {
  state = {
    redflagRecords: [],
    interventionRecords: [],
    loading: true,
    show: "red-flag",
    redFlagActive: "",
    interventionActive: "",
    value: localStorage.getItem("comment") | ""
  };

  componentWillMount = async () => {
    const { token, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      this.setState({ loading: true });
      const redflagRecords = await get(redflagURL, {
        headers: {
          Authorization: token
        }
      });
      const { data } = redflagRecords.data;

      this.setState({ loading: false, redflagRecords: data });

      this.setState({ loading: false, redFlagActive: "default" });
    }
  };

  handleRedflagSwitch = async () => {
    const { token } = this.props;
    this.setState({
      loading: true,
      redFlagActive: "default",
      interventionActive: "",
      show: ""
    });
    const redflagRecords = await get(redflagURL, {
      headers: {
        Authorization: token
      }
    });
    const { data } = redflagRecords.data;
    this.setState({ show: "red-flag", loading: false, redflagRecords: data });
  };

  handleChange = e => {
    localStorage.removeItem("comment");
    this.setState({ value: e.target.value });
  };

  handleInterventionSwitch = async () => {
    const { token } = this.props;
    this.setState({
      loading: true,
      redFlagActive: "",
      interventionActive: "default",
      show: ""
    });
    const interventionRecords = await get(interventionURL, {
      headers: {
        Authorization: token
      }
    });
    const { data } = interventionRecords.data;

    this.setState({ interventionRecords: data });
    this.setState({ loading: false, show: "intervention" });
  };

  scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      left: 0
    });
  };

  closeModal = e => {
    const { triggerModalClose } = this.props;
    if (e.target.className === "outer-modal") {
      triggerModalClose();
    }
  };

  render = () => {
    document.title = "Home";
    const {
      redflagRecords,
      interventionRecords,
      loading,
      show,
      redFlagActive,
      interventionActive
    } = this.state;
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <section className="home-feeds">
          <div className="choose-record">
            <input
              type="button"
              value="RED FLAG"
              id="redflag-record"
              className={redFlagActive}
              onClick={this.handleRedflagSwitch}
            />
            <input
              type="button"
              value="INTERVENTION"
              id="intervention-record"
              className={interventionActive}
              onClick={this.handleInterventionSwitch}
            />
          </div>
          {loading && (
            <div style={{ textAlign: "center" }}>
              <img
                src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
                className="homeLoader"
                style={{ width: "10%" }}
              />
            </div>
          )}
          {show === "red-flag" && (
            <section className="post-display">
              {redflagRecords.map(record => (
                <DisplayRecordCard
                  key={record.id}
                  id={record.id}
                  profileImage={record.profileimage}
                  username={record.username}
                  title={record.title}
                  incidentIcon="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839745/red_flag.png"
                  comment={record.comment}
                  status={record.status}
                  location={record.location}
                  images={record.images}
                  videos={record.videos}
                />
              ))}
            </section>
          )}

          {show === "intervention" && (
            <section className="post-display">
              {interventionRecords.map(record => (
                <DisplayRecordCard
                  key={record.id}
                  id={record.id}
                  profileImage={record.profileimage}
                  username={record.username}
                  title={record.title}
                  incidentIcon="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839737/intervene_icon.png"
                  comment={record.comment}
                  status={record.status}
                  location={record.location}
                  images={record.images}
                  videos={record.videos}
                />
              ))}
            </section>
          )}
        </section>
        <span
          onClick={this.scrollTop}
          style={{
            background: "#162661",
            position: "fixed",
            right: "1em",
            bottom: "4em",
            zIndex: 5000,
            cursor: "pointer",
            display: "inline-block",
            padding: "0.5em",
            borderRadius: "50%"
          }}>
          <i
            className="fas fa-angle-double-up"
            style={{
              fontSize: "2em",
              color: "white"
            }}
          />
        </span>
      </Fragment>
    );
  };
}

/**
 * @description map dispatch to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      triggerModalClose: closeModalAction,
      triggerModalOpen: openModalAction
    },
    dispatch
  );

/**
 * @description Map state to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapStateToProps = ({ userData, modalData }) => {
  const { isLoggedIn, token } = userData;
  const { modalDisplay } = modalData;
  return {
    isLoggedIn,
    modalDisplay,
    token
  };
};

Home.propTypes = {
  isLoggedIn: bool.isRequired,
  modalDisplay: string.isRequired,
  triggerModalClose: func.isRequired,
  triggerModalOpen: func.isRequired,
  token: string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
