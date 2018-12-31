import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Counter from './../Counter'


import NavBar from './../NavBar';
import Person from './../Person';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" component={NavBar} />
          <Route path="/counter" component={Counter} />
          <Route path="/person" component={Person} />
        </Fragment>
      </Router>
    );
  }
}

export default App;