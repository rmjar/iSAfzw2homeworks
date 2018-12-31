import React, { Component } from 'react';
import Button from './Button';

class Counter extends Component {

    constructor() {
        super();
        let counter = 0;

        if (typeof (Storage) !== 'undefined') {
            if (localStorage.getItem('mrCounter') != null) {
                counter = (JSON.parse(localStorage.getItem('mrCounter'))).val;
            }
        }

        this.state = {
            val: counter,
        }

    }


    handleClick = (param) => {
        this.setState({
            val: (isNaN(param) ? 0 : this.state.val + Number.parseInt(param, 10))
        }, () => {
            console.log("State " + JSON.stringify(this.state));
            localStorage.setItem('mrCounter', JSON.stringify(this.state));
        });

    }

    render() {
        return (
            <div>
                <Button onPress={() => this.handleClick(-5)} label='-5' />
                <Button onPress={() => this.handleClick(-1)} label='-1' />

                <span style={{ "color": "red", "fontWeight": "bolder" }}>
                    {this.state.val} </span>

                <Button onPress={() => this.handleClick(1)} label='+1' />
                <Button onPress={() => this.handleClick(5)} label='+5' />

                <Button onPress={() => this.handleClick('reset')} label='Reset' />
            </div>
        );
    }
}

export default Counter;