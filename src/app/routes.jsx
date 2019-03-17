/* eslint-disable import/no-unresolved */
import React from "react";
import { Switch, Route } from "react-router-dom";
import About from '../commonViews/About/About.jsx';
import Home from '../commonViews/Home/Home.jsx';
import LandingPage from '../commonViews/LandingPage/LandingPage.jsx';
import HowItWorks from '../commonViews/HowItWorks/HowItWorks.jsx';
import Profile from '../commonViews/Profile/Profile.jsx';
import Admin from '../commonViews/Admin/Admin.jsx';
import Report from '../commonViews/Report/Report.jsx';
import DisplayRecord from '../commonViews/DisplayRecord/DisplayRecord.jsx';
import NotFound from "../commonViews/404/404.jsx";


const Router = () => (
  <div>
    <Switch>
      {routeProps.map((route, index) => (
        <Route exact path={route.path} component={route.component} key={index}/>
      ))}
    </Switch>
  </div>
);

export default Router;

const routeProps = [
  {
    path: '/',
    component: LandingPage
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/howitworks',
    component: HowItWorks
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/report',
    component: Report
  },
  {
    path: '/displayrecord',
    component: DisplayRecord
  },
  {
    path: '*',
    component: NotFound
  }
];
