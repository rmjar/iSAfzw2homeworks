import React, { Component } from 'react';


class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('https://randomuser.me/api/');
            if (!response.ok) {
                this.setState({ err: 'Error fetching data' })
            }
            const { results } = await response.json();
            this.setState({ results });
        } catch (err) {
            console.warn(err);
        }
    }

    renderData = (results) => {
        const { name: { title, first, last } } = results;
        const { dob: { age } } = results;
        const { picture: { medium: pic } } = results;
        const { location: { city, postcode, state, street } } = results;
        return (
            <div>
                <img src={pic} alt='Person thumbnail' />
                <div>{title} {first} {last}</div>
                <div>{street}</div>
                <div>{city} {postcode}</div>
                <div>{state}</div>
                <div>age {age}</div>
                <hr />
            </div>
        )
    }

    render() {
        const { results } = this.state;
        let renderedPage = null;
        if (results) {
            console.log(results)
            renderedPage = this.renderData(results[0]);
        }
        return renderedPage;
    }
}


export default Person;