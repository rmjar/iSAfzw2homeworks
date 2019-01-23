import React, { Component, Fragment } from 'react';

const cities = [{
  city: "",
  country: ""
}, {
  city: "Warsaw",
  country: "pl"
}, {
  city: "Paris",
  country: "fr"
}, {
  city: "London",
  country: "uk"
}, {
  city: "Madrid",
  country: "es"
}, {
  city: "Berlin",
  country: "de"
}
]

class WeatherParamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onChange: this.props.onChange,
      city: this.props.city
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
  }

  mapOptions = (options) => {
    return options.map(option => <option value={`${option.city},${option.country}`} key={option.city}> {option.city} </option>)
  }

  render() {
    const { onChange: handleChange } = this.state;
    return (
      <form style={{ display: 'inline-block' }} onSubmit={this.handleSubmit}>
        <label htmlFor="city"> City:</label>
        <select name="city" onChange={handleChange}>
          {this.mapOptions(cities)}
        </select>
      </form>
    );
  }
}

export default WeatherParamForm;