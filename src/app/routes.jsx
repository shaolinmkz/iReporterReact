import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "../components/commonViews/About/About.jsx";
import Home from "../components/commonViews/Home/Home.jsx";
import LandingPage from "../components/commonViews/LandingPage/LandingPage.jsx";
import HowItWorks from "../components/commonViews/HowItWorks/HowItWorks.jsx";
import Profile from "../components/commonViews/Profile/Profile.jsx";
import Admin from "../components/commonViews/Admin/Admin.jsx";
import Report from "../components/commonViews/Report/Report.jsx";
import DisplayRecord from "../components/commonViews/DisplayRecord/DisplayRecord.jsx";
import NotFound from "../components/commonViews/404/404.jsx";

const routeProps = [
  {
    path: "/signout",
    component: LandingPage
  },
  {
    path: "/",
    component: LandingPage
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/howitworks",
    component: HowItWorks
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/admin",
    component: Admin
  },
  {
    path: "/report",
    component: Report
  },
  {
    path: "/displayrecord",
    component: DisplayRecord
  },
  {
    path: "*",
    component: NotFound
  }
];

/**
 * @description method that handles the page-route rendering
 * @returns {JSX} JSX
 */
const Router = () => (
  <div>
    <Switch>
      {routeProps.map((route, index) => (
        <Route
          exact
          path={route.path}
          component={route.component}
          key={index}
        />
      ))}
    </Switch>
  </div>
);

export default Router;
