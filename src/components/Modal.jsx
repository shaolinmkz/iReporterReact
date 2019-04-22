import React from "react";
import { object, func, node } from "prop-types";

/**
 * @description Modal component
 * @param {object} props component props
 * @returns {JSX} JSX
 */
const Modal = ({ children, parentStyle, innerBox, onClick }) => (
  <section className="outer-modal" style={parentStyle} onClick={onClick}>
    <div className="inner-box" style={innerBox}>
      {children}
    </div>
  </section>
);

Modal.propTypes = {
  children: node.isRequired,
  parentStyle: object.isRequired,
  innerBox: object.isRequired,
  onClick: func.isRequired
};

export default Modal;
