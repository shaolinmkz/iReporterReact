import React from "react";

/**
 * @description The NotFoundPage component
 * @returns {JSX} JSX
 */
const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "5%" }}>
    <img
      src="https://res.cloudinary.com/shaolinmkz/image/upload/v1546244507/ioo3lcog8akrjyybpqwn.gif"
      alt="404 PAGE"
      width="50%"
    />
    <h2
      style={{
        textAlign: "center",
        fontSize: "1.1em",
        color: "#fe0100",
        padding: "0.5em 0"
      }}>
      {"SORRY!... WHAT YOU'RE LOOKING FOR ISN'T HERE"}
    </h2>
    <h1
      style={{
        textAlign: "center",
        fontSize: "1.5em",
        color: "#162661",
        padding: "0.5em 0",
        marginBottom: "10%"
      }}>
      PAGE NOT FOUND
    </h1>
  </div>
);

export default NotFound;
