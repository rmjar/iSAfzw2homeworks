import React, { Component } from 'react';



class PresentWeatherDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onChange: this.props.onChange,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  mapOptions = (options) => {
    return options.map((option, ind) => <option value={ind} key={option}> {option} </option>)
  }

  render() {
    const { onChange: handleChange } = this.state;
    return (
      <form style={{ display: 'block' }} onSubmit={this.handleSubmit}>
        <label htmlFor="item"> Forecast date:</label>
        <select name="item" onChange={handleChange} >
          {this.mapOptions(this.props.dates)}
        </select>
      </form>
    );
  }
}

export default PresentWeatherDate;