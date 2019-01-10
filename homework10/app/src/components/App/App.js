import React, { Component, Fragment } from 'react';
//import './App.css';

import NavBar from './../NavBar';
import Contact from './../Contact';
import Products from './../Products';


import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
    locationParams = {
      center: {
        lat: 52.229593,
        lng: 21.012355
      },
      zoom: 16
    };

    render() {
      return <div>
        <Router>
          <Fragment>
            <Route path="/" component={NavBar} />
            <Route path="/contact" render={props => <Contact companyName={'Mój Sklep infoShare'}
              companyAddress={'Warszawa, ul. Marszałkowska 1'}
              companyPhone={'+48 22 456 01 01'}
              companyEmail={'mojSklep@info.Share'}
              mapProps={this.locationParams}
              {...props} />} />
            <Route path="/products/:uuid?" component={Products} />
          </Fragment>
        </Router>
      </div>;
    }
  }

export default App;
