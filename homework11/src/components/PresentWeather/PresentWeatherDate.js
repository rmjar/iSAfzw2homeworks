import React, { Component } from 'react';



class PresentWeatherDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onChange: this.props.onChange,
      city: this.props.city,
      value: 0,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.city !== this.state.city) {
      this.setState({
        ...this.state,
        city: nextProps.city,
        value: 0,
      });
    }
    return true;
  }

  mapOptions = (options) => {
    return options.map((option, ind) => <option value={ind} key={option}>{option}</option>)
  }

  render() {
    const { onChange: handleChange } = this.state;
    return (
      <form style={{ display: 'block' }} onSubmit={this.handleSubmit}>
        <label htmlFor="item">Forecast date:</label>
        <select name="item" onChange={(e) => {
          console.log(e.target.value);
          this.setState({
            ...this.state,
            value: parseInt(e.target.value, 10),
          })
          handleChange(e)
        }}
          value={parseInt(this.state.value, 10)}>
          {this.mapOptions(this.props.dates)}
        </select>
      </form>
    );
  }
}

export default PresentWeatherDate;