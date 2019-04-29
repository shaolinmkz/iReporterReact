import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "../components/commonViews/About/About.jsx";
import HomeView from "../components/commonViews/Home/Home.jsx";
import LandingPage from "../components/commonViews/LandingPage/LandingPage.jsx";
import HowItWorks from "../components/commonViews/HowItWorks/HowItWorks.jsx";
import ProfileView from "../components/commonViews/Profile/Profile.jsx";
import AdminView from "../components/commonViews/Admin/Admin.jsx";
import ReportView from "../components/commonViews/Report/Report.jsx";
import DisplayRecordView from "../components/commonViews/DisplayRecord/DisplayRecord.jsx";
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
    component: HomeView
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
    component: ProfileView
  },
  {
    path: "/admin",
    component: AdminView
  },
  {
    path: "/report",
    component: ReportView
  },
  {
    path: "/record/:id",
    component: DisplayRecordView
  },
  {
    path: "/notfound",
    component: NotFound
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
