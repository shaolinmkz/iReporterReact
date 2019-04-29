import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { bool, string, func, object as objectProp, number } from "prop-types";
import { bindActionCreators } from "redux";
import { get, delete as axiosDelete } from "axios";
import { toast, ToastType } from "react-toastify";
import { connect } from "react-redux";
import {
  interventionURL as incidentURL,
  redflagURL as url
} from "../../../redux/actionCreators/endPoints";
import notifyUser from "../../Toast.jsx";
import {
  closeModalAction,
  openModalAction
} from "../../../redux/actionCreators/modalActions";
import {
  editLoadingAction,
  editLocationAction,
  editCommentAction,
  stopEditLoadingAction
} from "../../../redux/actionCreators/modifiyRecordAction";
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
    if (localStorage.getItem("updated")) {
      localStorage.removeItem("updated");
      toast(notifyUser("Updated Successfully"), { type: ToastType.SUCCESS });
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

  handleChangeLocationSave = e => {
    e.preventDefault();
    const {
      lng,
      lat,
      match,
      editLocation,
      token,
      triggerEditLoading
    } = this.props;
    const recordId = match.params.id;
    const requestObject = {
      location: `${lat}, ${lng}`
    };

    triggerEditLoading();
    editLocation(requestObject, recordId, token);
  };
  handleDelete = async e => {
    e.preventDefault();
    const { match, token, triggerEditLoading, stopDeleteLoading } = this.props;
    const recordId = match.params.id;
    triggerEditLoading();
    try {
      await axiosDelete(`${incidentURL}/${recordId}`, {
        headers: {
          Authorization: token
        }
      });
      localStorage.setItem("deleted", "true");
      window.location.assign("/profile");
    } catch (err) {
      const { error } = err.response.data;
      toast(notifyUser(error), { type: ToastType.ERROR });
      stopDeleteLoading();
    }
  };
  handleCommentSave = e => {
    e.preventDefault();
    const { value } = this.state;
    const { editComment, match, token, triggerEditLoading } = this.props;
    const recordId = match.params.id;
    const requestObject = {
      comment: value
    };
    triggerEditLoading();
    editComment(requestObject, recordId, token);
  };

  render = () => {
    document.title = "Record";
    const { record, loading, value, type, status } = this.state;
    const {
      isLoggedIn,
      modalDisplay,
      triggerModalOpen,
      token,
      editLoading
    } = this.props;
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
                createdby={record.createdby}
                onMouseDown={triggerModalOpen}
                token={token}
                show
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
                createdby={record.createdby}
                onMouseDown={triggerModalOpen}
                token={token}
                show
              />
            </section>
          )}
        </section>
        {modalDisplay === "block" && (
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
              <form onSubmit={this.handleChangeLocationSave}>
                <h2 className="font-setting">LOCATION</h2>
                <GoogleSuggest
                  style={{
                    display: "block",
                    width: "100%",
                    fontSize: "1.5em",
                    border: "1px solid #162661"
                  }}
                />
                {!editLoading && (
                  <input
                    type="submit"
                    value="SAVE LOCATION"
                    style={{
                      color: "white"
                    }}
                  />
                )}
                {editLoading && (
                  <span
                    style={{
                      position: "relative",
                      display: "block",
                      textAlign: "center"
                    }}>
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
              </form>

              <form onSubmit={this.handleCommentSave}>
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

                {!editLoading && (
                  <input
                    type="submit"
                    value="SAVE COMMENT"
                    style={{ color: "white" }}
                  />
                )}
                {editLoading && (
                  <span
                    style={{
                      position: "relative",
                      display: "block",
                      textAlign: "center"
                    }}>
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
              </form>

              <form onSubmit={this.handleDelete}>
                <h2 style={{ color: "#C53F2E", padding: "1em 0" }}>DELETE</h2>
                <input required type="checkbox" id="deleteCheck" />
                <label
                  style={{ color: "red", cursor: "pointer" }}
                  htmlFor="deleteCheck">
                  * Note that clicking the delete button will delete this record
                </label>
                {!editLoading && (
                  <input
                    id="delete-a-record"
                    type="submit"
                    value="DELETE RECORD"
                  />
                )}
                {editLoading && (
                  <span
                    style={{
                      position: "relative",
                      display: "block",
                      textAlign: "center"
                    }}>
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
              </form>
            </div>
          </ModalComp>
        )}
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
      triggerModalOpen: openModalAction,
      triggerEditLoading: editLoadingAction,
      editLocation: editLocationAction,
      editComment: editCommentAction,
      stopDeleteLoading: stopEditLoadingAction
    },
    dispatch
  );

/**
 * @description Map state to props function
 * @param {object} dispatch
 * @return {JSX} returns javascript syntax extension
 */
const mapStateToProps = ({ userData, modalData, recordData, modifyData }) => {
  const { isLoggedIn, token } = userData;
  const { modalDisplay } = modalData;
  const { lng, lat } = recordData;
  const { editLoading } = modifyData;
  return {
    isLoggedIn,
    modalDisplay,
    token,
    lng,
    lat,
    editLoading
  };
};

DisplayRecord.propTypes = {
  isLoggedIn: bool.isRequired,
  modalDisplay: string.isRequired,
  triggerModalClose: func.isRequired,
  triggerModalOpen: func.isRequired,
  match: objectProp.isRequired,
  token: string.isRequired,
  lng: number,
  lat: number,
  editLoading: bool,
  editLocation: func,
  triggerEditLoading: func,
  editComment: func,
  stopDeleteLoading: func
};

DisplayRecord.defaultProps = {
  lng: 6,
  lat: 2,
  editLoading: false,
  editLocation: () => "do nothing",
  triggerEditLoading: () => "do nothing",
  editComment: () => "do nothing",
  stopDeleteLoading: () => "do nothing"
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayRecord);
