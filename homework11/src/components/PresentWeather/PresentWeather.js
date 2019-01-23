import React, { Component, Fragment } from 'react';
import degToCompass from './degToCompass';
import { unixToTime, unixToDateTime } from './unixToTime';

class PresentWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city
    }
  }

  async updateWeather() {
    if (this.state.city && this.state.city !== ',') {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&APPID=e174a64cd4eafd4f2c23e15892964bd1`;
      try {
        const response = await fetch(API);
        if (!response.ok) {
          this.setState({ err: 'Error fetching data' })
        }
        const results = await response.json();
        this.setState({ results });
      } catch (err) {
        console.warn(err);
      }
    }
  }

  componentDidMount() {
    this.updateWeather()
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;
    if (city !== prevState.city) {
      this.updateWeather();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.city !== prevState.city) {
      return ({ city: nextProps.city }) // <- this is setState equivalent
    }
    return null;
  }

  render() {
    if (this.state && this.state.results) {
      const { dt } = this.state.results;
      const { weather } = this.state.results;
      const { main: { temp, pressure, humidity, temp_min, temp_max } } = this.state.results;
      const { visibility, wind } = this.state.results;
      const { name } = this.state.results;
      const { sys: { sunrise, sunset } } = this.state.results;

      return (
        <div>
          <h4>Weather for {name}, time {unixToDateTime(dt)}</h4>
          <div>Temperature {temp}°C, min {temp_min}°C, max {temp_max}°C</div>
          <div>Pressure {pressure}hPa</div>
          <div>Humidity {humidity}%</div>

          <div>Wind speed {wind.speed}{wind.deg ? `, direction ${degToCompass(wind.deg)}` : ``}</div>
          <div>Sunrise {unixToTime(sunrise)}, sunset {unixToTime(sunset)}</div>
          <div>Visibility {visibility}m</div>
        </div>
      );
    }
    return null;
  }
}

export default PresentWeather;