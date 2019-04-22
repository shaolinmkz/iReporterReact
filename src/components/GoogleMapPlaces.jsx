/* eslint-disable valid-jsdoc */
import React, { Component } from "react";
import { object, func } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import ReactGoogleMap from "react-google-map";
import dotenv from "dotenv";
import { dispatchGeolocationAction } from "../redux/actionCreators/createRecordAction";

dotenv.config();

/**
 * @description google map component
 * @returns {JSX} JSX
 */
export class GoogleMapComponent extends Component {
  render = () => {
    const { geolocation } = this.props;
    return (
      <ReactGoogleMapLoader
        params={{
          key: process.env.GOOGLE_API_KEY,
          libraries: "places,geometry"
        }}
        render={googleMaps =>
          googleMaps && (
            <div style={{ height: "300px" }}>
              <ReactGoogleMap
                googleMaps={googleMaps}
                center={geolocation}
                zoom={8}                
              />
            </div>
          )
        }
      />
    );
  }
}

GoogleMapComponent.propTypes = {
  geolocation: object.isRequired
};

/**
 * @description google suggest
 * @param {string} suggest
 * @returns {JSX} JSX
 */
class GoogleSuggest extends Component {
  state = {
    search: "",
    value: ""
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value });
  };

  handleSelectSuggest = suggest => {
    const { dispatchGeolocation } = this.props;
    const geoCord = {
      lng: suggest.geometry.location.lng(),
      lat: suggest.geometry.location.lat()
    };
    this.setState({ search: "", value: suggest.formatted_address });
    dispatchGeolocation(geoCord);
  };

  render = () => {
    const { search, value } = this.state;
    const { style } = this.props;

    return (
      <ReactGoogleMapLoader
        params={{
          key: process.env.GOOGLE_API_KEY,
          libraries: "places,geocode"
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{ input: search }}
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest}>
                <input
                  type="text"
                  id="incident_address"
                  style={style}
                  placeholder="ENTER INCIDENT ADDRESS"
                  value={value}
                  name="address"
                  onChange={this.handleInputChange}
                  required
                />
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
    );
  };
}

/**
 * @description map dispatch to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatchGeolocation: dispatchGeolocationAction
    },
    dispatch
  );

/**
 * @description Map state to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapStateToProps = ({ recordData }) => {
  const { geolocation } = recordData;
  return {
    geolocation
  };
};

GoogleSuggest.propTypes = {
  dispatchGeolocation: func.isRequired,
  style: object
};

GoogleSuggest.defaultProps = {
  style: {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleSuggest);
