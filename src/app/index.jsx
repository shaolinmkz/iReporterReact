import "babel-polyfill";
import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer, Bounce } from 'react-toastify';
import store from "../redux/store";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer
      pauseOnFocusLoss={false}
      transition={Bounce}
      className="toast-container"
      toastClassName="default-toast"
      autoClose={4000}
      position="top-right"
    />
  </Provider>,
  document.getElementById("root")
);
