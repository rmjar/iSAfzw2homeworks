import React, { Component, Fragment } from 'react';

import WeatherParamForm from '../WeatherParamForm'
import PresentWeather from '../PresentWeather'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
    }
  }

  onUpdate = (e) => {
    this.setState({
      city: e.target.value
    })
  }


  render() {
    const { city } = this.state;
    return (
      <div>
        <WeatherParamForm onChange={this.onUpdate} />
        <PresentWeather city={city} />
      </div>
    );
  }
}

export default App;