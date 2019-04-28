import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { bool, string, func, object as objectProp } from "prop-types";
import { bindActionCreators } from "redux";
import { get } from "axios";
import { connect } from "react-redux";
import { redflagURL as url } from "../../../redux/actionCreators/endPoints";
import {
  closeModalAction,
  openModalAction
} from "../../../redux/actionCreators/modalActions";
import DisplayRecordCard from "../../DisplayRecordCard.jsx";
import ModalComp from "../../Modal.jsx";
import GoogleSuggest from "../../GoogleMapPlaces.jsx";

const init = {
  comment: "",
  createdby: 11,
  createdon: "",
  email: "",
  firstname: "",
  id: 0,
  images: [],
  isadmin: false,
  lastname: "",
  location: "0, 0",
  othername: "",
  phonenumber: "",
  profileimage: "",
  status: "",
  title: "",
  type: "",
  username: "",
  videos: []
};

/**
 * @description class based method for displaying a single record
 * @param {object} e - event object
 * @returns {JSX} JSX
 */
export class DisplayRecord extends Component {
  state = {
    record: init,
    loading: true,
    type: "",
    value: localStorage.getItem("comment") || ""
  };

  /**
   * @description component will mount
   * @param {object} localStorage - local storage
   * @returns {JSX} JSX
   */
  componentWillMount = async () => {
    const { match, token, isLoggedIn } = this.props;
    const recordId = match.params.id;
    const recordUrl = url;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      this.setState({ loading: true });
      try {
        const redflagRecord = await get(`${recordUrl}/${recordId}`, {
          headers: {
            Authorization: token
          }
        });
        const { data } = redflagRecord.data;
        this.setState({ record: data[0], type: data[0].type });
        this.setState({ loading: false });
      } catch (err) {
        const { status } = err.response.data;
        this.setState({ loading: false, status });
        return { err };
      }
    }
  };

  handleChange = e => {
    localStorage.removeItem("comment");
    this.setState({ value: e.target.value });
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
    document.title = "Record";
    const { record, loading, value, type, status } = this.state;
    const { isLoggedIn, modalDisplay, triggerModalOpen } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    if (status === 404) {
      return <Redirect to="/notfound" />;
    }

    return (
      <Fragment>
        <section className="home-feeds">
          {loading && (
            <div style={{ textAlign: "center" }}>
              <img
                src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
                className="homeLoader"
                style={{ width: "10%" }}
              />
            </div>
          )}
          {type === "red-flag" && (
            <section className="post-display">
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
                onMouseDown={triggerModalOpen}
              />
            </section>
          )}
          {type === "intervention" && (
            <section className="post-display">
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
                onMouseDown={triggerModalOpen}
              />
            </section>
          )}
        </section>
        {
          <ModalComp
            parentStyle={{ display: modalDisplay }}
            innerBox={{ overflow: "scroll", height: "80%" }}
            onClick={this.closeModal}>
            <a
              href="#delete-a-record"
              id="toggleMover"
              title="scroll down to reveal more features"
              style={{
                background: "#162661",
                position: "fixed",
                left: "1em",
                top: "4em",
                display: "inline-block",
                padding: "0.5em",
                borderRadius: "50%"
              }}>
              <i
                className="fas fa-angle-double-down"
                title="scroll down to reveal more features"
                style={{
                  fontSize: "2em",
                  color: "white"
                }}
              />
            </a>
            <div id="parentFlexModal">
              <h1 className="font-setting">RECORD MANAGER</h1>
              <form>
                <h2 className="font-setting">LOCATION</h2>
                <GoogleSuggest
                  style={{
                    display: "block",
                    width: "100%",
                    fontSize: "1.5em",
                    border: "1px solid #162661"
                  }}
                />
                <input
                  type="submit"
                  value="SAVE LOCATION"
                  style={{
                    color: "white"
                  }}
                />
              </form>

              <form>
                <h2 className="font-setting">COMMENT</h2>
                {
                  <textarea
                    required
                    placeholder="Edit your story..."
                    className="post-text-area"
                    id="post-text-area"
                    name="comment"
                    onChange={this.handleChange}
                    value={
                      localStorage.getItem("comment")
                        ? localStorage.getItem("comment")
                        : value
                    }
                  />
                }

                <input
                  type="submit"
                  value="SAVE COMMENT"
                  style={{ color: "white" }}
                />
              </form>

              <form>
                <h2 style={{ color: "red" }}>DELETE</h2>
                <input
                  required
                  type="checkbox"
                  style={{
                    boxShadow: "1px 1px 1px 1px #162661",
                    cursor: "pointer"
                  }}
                />
                <span style={{ color: "red" }}>
                  * Note that clicking the delete button will delete this record
                </span>
                <input
                  id="delete-a-record"
                  type="submit"
                  value="DELETE RECORD"
                  style={{ color: "white", background: "red" }}
                />
              </form>
            </div>
          </ModalComp>
        }
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

DisplayRecord.propTypes = {
  isLoggedIn: bool.isRequired,
  modalDisplay: string.isRequired,
  triggerModalClose: func.isRequired,
  triggerModalOpen: func.isRequired,
  match: objectProp.isRequired,
  token: string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayRecord);
