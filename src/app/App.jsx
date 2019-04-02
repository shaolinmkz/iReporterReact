import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../components/commonViews/Header/Header.jsx";
import Footer from "../components/commonViews/Footer/Footer.jsx";
import Routes from "./routes.jsx";

/**
 * @description stateless component with user routes
 * @returns {JSX} JSX
 */
const App = () => (
  <Router>
    <div>
      <Route component={Header} />
      <Route component={Routes} />
      <Route component={Footer} />
    </div>
  </Router>
);

export default App;
