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
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/howitworks" component={HowItWorks} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin" component={Admin} />
      <Route path="/report" component={Report} />
      <Route path="/displayrecord" component={DisplayRecord} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default Router;
