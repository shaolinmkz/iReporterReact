import React, { Component } from "react";

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
    this.handleNew = this.handleNew.bind(this);
  }

  /**
   * @description handles form field change
   * @param {object} e
   * @return {undefined}
   */
  handleChange(e) {
    if (e.target.name === "images" || e.target.name === "videos") {
      this.setState({
        [e.target.name]: [...this.state[e.target.name], e.target.value]
      });
      return;
    }
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description handles form part render
   * @param {object} n
   * @return {JSX} JSX
   */
  handleNew(n=1) {
    const multi = [];
    for (let i =0; i <= n; i += 1) {
      multi.push(<br key={i}/>)
    }
    return (
      <React.Fragment>
        {multi}
      </React.Fragment>
    );
  }

  /**
   * @description handles form part render
   * @return {JSX} JSX
   */
  handleFormRender() {
    return (
      <form>
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
          {this.handleNew(3)}
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
          {this.handleNew()}
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
          <input
            type="text"
            id="incident_address"
            placeholder="ENTER INCIDENT ADDRESS"
            name="address"
            onChange={this.handleChange}
          />
          {this.handleNew()}
          <div id="latlongdisplay">
            <div id="map" />
            <label>Latitude : </label>{" "}
            <span id="latitude" className="latlngfont green" />
            {this.handleNew(2)}
            <label>Longitude : </label>{" "}
            <span id="longitude" className="latlngfont green" />
          </div>
          {this.handleNew(2)}
          <small className="theme-orange">
            If your in the current location, then click the{" "}
            <strong>FINDME</strong> button below
          </small>
          {this.handleNew(2)}
          <input type="button" value="FIND ME" id="myCurrentLocation" />{" "}
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
            id="loading"
            title="loading please wait"
            style={{ width: "50px", marginBottom: "-1.2em" }}
          />
          {this.handleNew(2)}
          <div id="responseMessage" />
          <br />
          <h1 className=" font-setting">FILE UPLOADS</h1>
          <br />
          <small className="theme-orange">
            <strong>Picture</strong> and <strong>Video</strong> evidence(s) are
            not compulsory, but having them will help improve your report
          </small>
          {this.handleNew(2)}
          <label>Upload Picture Evidence</label>{" "}
          <span className="separateIncidentType"> &nbsp; </span>
          <input
            type="file"
            accept="image/*"
            id="picture-upload"
            name="images"
            onChange={this.handleChange}
          />
          <span style={{ position: "relative" }}>
            <img
              src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
              className="uploadLoader"
            />
          </span>
          <ul id="place-images" />
          {this.handleNew(2)}
          <label>Upload Videos Evidence</label>{" "}
          <span className="separateIncidentType"> &nbsp; </span>
          <input
            type="file"
            accept="video/*"
            id="video-upload"
            name="videos"
            onChange={this.handleChange}
          />
          <span style={{ position: "relative" }}>
            <img
              src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
              className="uploadLoader"
            />
          </span>
          <ul id="place-videos" />
          <br />
          <input
            type="submit"
            value="SEND"
            className="report"
            title="submit report"
            id="send-Incident"
          />
          <span style={{ position: "relative" }}>
            <img
              src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
              className="uploadLoader"
            />
          </span>
          {this.handleNew(3)}
        </section>
      </form>
    );
  }

  /**
   * @description render method
   * @return {JSX}JSX
   */
  render() {
    document.getElementById("site-title").innerHTML = "Report";
    return (
      <React.Fragment>
        <section
          className="crime-form-container clearfix"
          onLoad={() => this.setState({ style: "none" })}>
          {this.handleFormRender()}
        </section>

        <section className="feeds">
          <section className="post-display" />
        </section>

        <section className="crime-report-container">
          <img
            src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550839779/crime_report.png"
            className="crime_report_image"
          />
          <h1>SEE SOMETHING SAY SOMETHING...</h1>
        </section>

        <section
          id="outer-modal"
          className="outer-modal-loader"
          style={{ display: this.state.style }}>
          <div className="inner-box-loader">
            <img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1546244139/mfwse2iecjdgk7m4sdeb.gif" />
            <h1>PLEASE WAIT</h1>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Report;
