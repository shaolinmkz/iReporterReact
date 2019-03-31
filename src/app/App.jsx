import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from '../commonViews/Header/Header.jsx';
import Footer from '../commonViews/Footer/Footer.jsx';
import Routes from './routes.jsx';

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
