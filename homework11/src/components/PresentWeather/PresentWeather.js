import React, { Component, Fragment } from 'react';
import degToCompass from './degToCompass';

import PresentWeatherDate from './PresentWeatherDate';

class PresentWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city
    }
  }

  async updateWeather() {
    if (this.state.city && this.state.city !== ',') {
      const API = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&APPID=e174a64cd4eafd4f2c23e15892964bd1`;
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
      this.setState({
        dateInd: 0
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.city !== prevState.city) {
      return ({
        city: nextProps.city,
        dateInd: 0
      }) // <- this is setState equivalent
    }
    return null;
  }

  onUpdateDate = (e) => {
    this.setState({
      dateInd: e.target.value
    });
  }

  mapItems(name, data) {
    return data.map(i => i[name]);
  }


  render() {
    if (this.state && this.state.results) {
      const { city, dateInd } = this.state;
      const { name } = this.state.results.city;
      const dates = this.mapItems('dt_txt', this.state.results.list);

      const date = dateInd ?
        this.state.results.list[dateInd].dt_txt :
        null;

      const { main: { temp, pressure, humidity, temp_min, temp_max } } = date ?
        this.state.results.list[dateInd] :
        this.state.results.list[0];

      const { wind } = date ?
        this.state.results.list[dateInd] :
        this.state.results.list[0];

      return (
        <Fragment>
          {
            city &&
            <PresentWeatherDate onChange={this.onUpdateDate} dates={dates} />
          }
          {
            date && city &&
            <Fragment>
              <h4>Weather for {name}, time {date}</h4>
              <div>Temperature {temp}°C, min {temp_min}°C, max {temp_max}°C</div>
              <div>Pressure {pressure}hPa</div>
              <div>Humidity {humidity}%</div>
              <div>Wind speed {wind.speed}{wind.deg ? `, direction ${degToCompass(wind.deg)}` : ``}</div>
            </Fragment>
          }


        </Fragment>

      );
    }
    return null;
  }
}

export default PresentWeather;