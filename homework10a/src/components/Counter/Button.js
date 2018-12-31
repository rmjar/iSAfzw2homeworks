import React, { Component } from 'react';

class Button extends Component {
   
    render() {
        const { onPress, label } = this.props;
        return (<span onClick={onPress}>| {label} |</span>);
    }
}

export default Button;