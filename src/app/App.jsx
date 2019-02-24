import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from '../commonViews/Header/Header.jsx';
import Footer from '../commonViews/Footer/Footer.jsx';
import Routes from './routes.jsx';

const App = () => (
  <BrowserRouter>
    <div>
      <Route component={Header} />
      <Route component={Routes} />
      <Route component={Footer} />
    </div>
</BrowserRouter>
);

export default App;
