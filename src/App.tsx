import React from 'react';
import Main from "./components/Main"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Nav from './components/Nav'

import './App.css';

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  )
}
export default App;
