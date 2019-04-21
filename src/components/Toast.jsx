import React from "react";
import "react-toastify/dist/ReactToastify.min.css";

/**
 * @description Notification component
 * @param {string} message - display message
 * @returns {JSX} JSX
 */
const Toast = (message) => {
  return <div>{message}</div>;
};

export default Toast;
