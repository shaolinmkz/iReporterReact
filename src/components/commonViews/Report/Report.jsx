import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { toast, ToastType } from "react-toastify";
import { bool, number, func } from "prop-types";
import { connect } from "react-redux";
import { post } from "axios";
import { bindActionCreators } from "redux";
import dotenv from 'dotenv';
import notifyUser from "../../Toast.jsx";
import GoogleSuggest from "../../GoogleMapPlaces.jsx";
import {
  redflagCreatenAction,
  interventionCreateAction,
  generalLoadingAction,
  stopGeneralLoadingAction
} from "../../../redux/actionCreators/createRecordAction";

dotenv.config();

/**
 * @description stateful component that handles the Report page
 * @return {undefined}
 */
class Report extends Component {
  /**
   * @description constructor method for the report page
   * @param {object} props
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      incidentType: "",
      geolocation: "",
      address: "",
      images: [],
      videos: [],
      style: "block"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLineBreaks = this.handleLineBreaks.bind(this);
  }

  componentWillReceiveProps = () => {
    const { lng, lat } = this.props;

    this.setState({ lng, lat });
  };

  /**
   * @description handles form field change
   * @param {object} e
   * @return {undefined}
   */
  handleChange(e) {
    if (e.target.name === "images") {
      this.setState({
        imagePreview: [...e.target.files].map(img => URL.createObjectURL(img)),
        [e.target.name]: [...e.target.files]
      });

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      this.setState({ imageFormData: formData });

      return;
    }

    if (e.target.name === "videos") {
      this.setState({
        [e.target.name]: [...e.target.files]
      });

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      this.setState({ videoFormData: formData });
      return;
    }

    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description handles forms line breaks
   * @param {object} n
   * @return {JSX} JSX
   */
  handleLineBreaks(n = 1) {
    const multi = [];
    for (let i = 0; i <= n; i += 1) {
      multi.push(<br key={i} />);
    }
    return <React.Fragment>{multi}</React.Fragment>;
  }

  /**
   * @description handles form submission
   * @param {object} e - event object
   * @return {undefined}
   */
  handleSubmit = async e => {
    e.preventDefault();
    const { imageFormData, videoFormData } = this.state;

    const { createRedflag, createIntervention,dispatchGeneralLoading } = this.props;
    
    dispatchGeneralLoading();

    if (imageFormData) {
      const secureImageUrl = await this.handleImageUpload(imageFormData);
      this.setState({ images: [secureImageUrl] });
    }
    if (videoFormData) {
      const secureVideoUrl = await this.handleVideoUpload(videoFormData);
      this.setState({ videos: [secureVideoUrl] });
    }

    const {
      title,
      comment,
      incidentType,
      lng,
      lat,
      images,
      videos
    } = this.state;

    const requestObject = {
      title,
      comment,
      location: `${lat}, ${lng}`,
      images,
      videos
    };

    if (incidentType === "red-flag") {
      createRedflag(requestObject);
    } else if (incidentType === "intervention") {
      createIntervention(requestObject);
    }
  };

  /**
   * @param {object} imageFormData
   * @returns {undefined}
   */
  handleImageUpload = async imageFormData => {
    const { dispatchGeneralLoading, stopGeneralLoading } = this.props;
    dispatchGeneralLoading();

    const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL;

    try {
      const getImage = await post(CLOUDINARY_UPLOAD_URL, imageFormData, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      const { data } = getImage;
      const secureUrl = data.secure_url;
      return secureUrl;
    } catch (err) {
      toast(notifyUser("COULD NOT UPLOAD IMAGE"), { type: ToastType.ERROR });
      stopGeneralLoading();
    }
  };

  /**
   * @param {object} videoFormData
   * @returns {undefined}
   */
  handleVideoUpload = async videoFormData => {
    const { dispatchGeneralLoading, stopGeneralLoading } = this.props;
    dispatchGeneralLoading();

    const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL;

    try {
      const getVideo = await post(CLOUDINARY_UPLOAD_URL, videoFormData, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      const { data } = getVideo;
      const secureUrl = data.secure_url;
      return secureUrl;
    } catch (err) {
      toast(notifyUser("COULD NOT UPLOAD VIDEO"), { type: ToastType.ERROR });
      stopGeneralLoading();
    }
  };

  /**
   * @description handles form part render
   * @return {JSX} JSX
   */
  handleFormRender() {
    const {imagePreview } = this.state;
    const { generalLoading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <section id="boundary">
          <h2 id="compose-heading">COMPOSE REPORT</h2>
          <h1 className="font-setting">TITLE</h1>
          <br />
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="ENTER TITLE"
            className="title"
            id="title"
            name="title"
            required
          />
          {this.handleLineBreaks(3)}
          <h1 className=" font-setting">COMMENT</h1>
          <textarea
            required
            placeholder="Tell your story..."
            className="post-text-area"
            onChange={this.handleChange}
            id="post-text-area"
            name="comment"
          />
          <br />
          <h1 className=" font-setting">INCIDENT TYPE</h1>
          <br />
          <input
            type="radio"
            name="incidentType"
            id="red-flag"
            required
            value="red-flag"
            onChange={this.handleChange}
          />
          <label htmlFor="red-flag" style={{ cursor: "pointer" }}>
            RED-FLAG
            <img
              src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839745/red_flag.png"
              className="red-flag-icon"
              title="Red-flag"
            />
          </label>
          <span className="separateIncidentType"> &nbsp; </span>
          <input
            type="radio"
            name="incidentType"
            id="intervention"
            value="intervention"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="intervention" style={{ cursor: "pointer" }}>
            INTERVENTION
            <img
              src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839737/intervene_icon.png"
              className="red-flag-icon"
              title="Intervention"
            />
          </label>
          {this.handleLineBreaks()}
          <h1 className=" font-setting">GEOLOCATION</h1>
          <br />
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
            id="loading2"
            title="loading please wait"
            className="loader"
            style={{ width: "50px" }}
          />
          <br />
          <GoogleSuggest />
          {this.handleLineBreaks()}
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
            id="loading"
            title="loading please wait"
            style={{ width: "50px", marginBottom: "-1.2em" }}
          />
          {this.handleLineBreaks(2)}
          <div id="responseMessage" />
          <br />
          <h1 className=" font-setting">FILE UPLOADS</h1>
          <br />
          <small className="theme-orange">
            <strong>Picture</strong> and <strong>Video</strong> evidence(s) are
            not compulsory, but having them will help improve your report
          </small>
          {this.handleLineBreaks(2)}
          <label>Upload Picture Evidence</label>{" "}
          <span className="separateIncidentType"> &nbsp; </span>
          <input
            type="file"
            accept="image/*"
            id="picture-upload"
            name="images"
            onChange={this.handleChange}
          />
          {imagePreview && (
            <div
              style={{
                display: "block",
                marginTop: "2em"
              }}>
              {imagePreview.map((img, index) => (
                <img
                  src={img}
                  alt="image preview"
                  key={index}
                  style={{
                    display: "inline-block",
                    width: "10%",
                    marginLeft: "2em"
                  }}
                />
              ))}
            </div>
          )}
          {this.handleLineBreaks(2)}
          <label>Upload Videos Evidence</label>{" "}
          <span className="separateIncidentType"> &nbsp; </span>
          <input
            type="file"
            accept="video/*"
            id="video-upload"
            name="videos"
            onChange={this.handleChange}
          />
          <br />
          {!generalLoading && (
            <input
              type="submit"
              value="SUBMIT"
              className="report"
              title="submit report"
              id="send-Incident"
            />
          )}
          {generalLoading && (
            <span style={{ position: "relative" }}>
              <img
                style={{
                  position: "relative",
                  display: "inline-block",
                  textAlign: "center",
                  marginTop: "3em"
                }}
                src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
                className="uploadLoader"
              />
            </span>
          )}
          {this.handleLineBreaks(3)}
        </section>
      </form>
    );
  }

  /**
   * @description render method
   * @return {JSX}JSX
   */
  render() {
    document.title = "Report";
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <section
          className="crime-form-container clearfix"
          onLoad={() => this.setState({ style: "none" })}>
          {this.handleFormRender()}
        </section>
        <section className="crime-report-container">
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839779/crime_report.png"
            className="crime_report_image"
          />
          <h1>SEE SOMETHING SAY SOMETHING...</h1>
        </section>
      </React.Fragment>
    );
  }
}

/**
 * @description map dispatch to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createRedflag: redflagCreatenAction,
      createIntervention: interventionCreateAction,
      dispatchGeneralLoading: generalLoadingAction,
      stopGeneralLoading: stopGeneralLoadingAction
    },
    dispatch
  );

/**
 * @description Map state to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapStateToProps = ({ userData, recordData }) => {
  const { isLoggedIn } = userData;
  const { lng, lat, generalLoading } = recordData;
  return {
    isLoggedIn,
    lng,
    lat,
    generalLoading
  };
};

Report.propTypes = {
  isLoggedIn: bool.isRequired,
  lat: number,
  lng: number,
  generalLoading: bool,
  createRedflag: func,
  createIntervention: func,
  dispatchGeneralLoading: func,
  stopGeneralLoading: func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
