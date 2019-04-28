import React from "react";
import { Link } from "react-router-dom";
import { string, number, array, func } from "prop-types";
import { GoogleMapComponent } from "./GoogleMapPlaces.jsx";

/**
 * @param {object} props
 * @returns {JSX} JSX
 */
const DisplayRecordCard = ({
  profileImage,
  username,
  title,
  incidentIcon,
  comment,
  status,
  location,
  images,
  videos,
  id,
  onMouseDown
}) => (
  <div className="post">
    <article className="actual-post" id={id}>
      <img src={profileImage} className="avatar" title="avatar" />{" "}
      <i className="profile-name">
        <span>{username}</span>
      </i>
      <br />
      <h1> <Link to={`/record/${id}`}>{title}</Link></h1>
      <img src={incidentIcon} className="red-flag-icon" title="Red flag" />
      <div className="story">
        <p>{comment}</p>
      </div>
      <br />
      <br />
      <label className="blue">STATUS</label> : <span>{status}</span> <br />
      <label className="blue">LOCATION</label> : <span>{location}</span>
      <GoogleMapComponent
        geolocation={{
          lat: Number(location.split(",")[0]),
          lng: Number(location.split(",")[1])
        }}
      />
      <span> &nbsp; </span>{" "}
      <span className="insert-location-editing-tag-here" />
      <br />
      <br />
      <br />
      <div className="image-display">
        {images[0] ? (
          <img
            src={images[0]}
            alt="incident image"
            className="picture-evidence"
            title="picture-evidence"
          />
        ) : (
          <h3 style={{ color: "grey" }}>NO IMAGE EVIDENCE</h3>
        )}
      </div>
      <br />
      <div className="video-display">
        {videos[0] ? (
          <video controls className="video-evidence">
            {" "}
            <source src={videos[0]} />{" "}
          </video>
        ) : (
          <h3 style={{ color: "grey" }}>NO VIDEO EVIDENCE</h3>
        )}
      </div>
      <div className="delete-record-container">
        <button
          className="blue edit"
          onMouseEnter={e => {
            localStorage.setItem("recordId", e.target.parentNode.parentNode.id);
            localStorage.setItem(
              "comment",
              e.target.parentNode.parentNode.children[5].children[0].innerHTML
            );
          }}
          onMouseDown={onMouseDown}>
          EDIT RECORD
        </button>
      </div>
    </article>
  </div>
);

DisplayRecordCard.propTypes = {
  profileImage: string.isRequired,
  username: string.isRequired,
  title: string.isRequired,
  incidentIcon: string.isRequired,
  comment: string.isRequired,
  status: string.isRequired,
  location: string.isRequired,
  images: array.isRequired,
  videos: array.isRequired,
  id: number.isRequired,
  onMouseDown: func.isRequired
};

export default DisplayRecordCard;
