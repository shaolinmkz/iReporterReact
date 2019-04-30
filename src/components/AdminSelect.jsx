import React from "react";
import { Link } from "react-router-dom";
import { func, string, number, bool } from "prop-types";

/**
 * @description Admin Select
 * @param {number} id - record Id
 * @param {string} status - status
 * @param {string} title - title
 * @param {boolean} loading - loading
 * @param {function} onSubmit - submit event
 * @param {function} onClick - click event
 * @param {function} onChange - select event
 * @returns {JSX} JSX
 */
const AdminSelect = ({
  id,
  status,
  title,
  onSubmit,
  loading,
  onClick,
  onChange
}) => (
  <section className="outer-modal" onClick={onClick}>
    <div className="inner-box" style={{ padding: 0 }}>
      <form
        className="update-status-form"
        onSubmit={onSubmit}
        style={{ textAlign: "center" }}>
        <label className="theme-blue">Current Status:</label>
        <span id="current-status"> {status}</span>
        <br />
        <br />
        <label className="theme-orange">Title:</label>
        <span title="Incident title" className="theme-blue">
          {" "}
          {title}
        </span>
        <br />
        <br />
        <select required id="select-status" onChange={onChange}>
          <option>Select an option</option>
          <option>Draft</option>
          <option>Under-Investigation</option>
          <option>Resolved</option>
          <option>Rejected</option>
        </select>
        {!loading && (
          <input
            type="submit"
            id={id}
            value="UPDATE"
            className="admin_update_status"
          />
        )}
        {loading && (
          <div style={{ textAlign: "center" }}>
            <img
              src="https://res.cloudinary.com/shaolinmkz/image/upload/v1550933449/loader_blue.gif"
              id="updateStatusLoader"
            />
          </div>
        )}
        <div>
          <Link to={`/record/${id}`} className="blue admin-view-record">
            View Record
          </Link>
        </div>
      </form>
    </div>
  </section>
);

AdminSelect.propTypes = {
  id: number,
  status: string,
  title: string,
  onSubmit: func,
  loading: bool,
  onClick: func,
  onChange: func
};
AdminSelect.defaultProps = {
  id: 0,
  status: "",
  title: "",
  onSubmit: () => "do nothing",
  loading: false,
  onClick: () => "do nothing",
  onChange: () => "do nothing"
};

export default AdminSelect;
