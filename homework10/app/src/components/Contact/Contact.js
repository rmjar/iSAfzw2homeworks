import React, { Component, Fragment } from 'react';

class Contact extends Component {
    
    render() {
        return <div>
            <h2>Contact:</h2>
            <div>Company: {this.props.companyName}</div>
            <div>Address: {this.props.companyAddress}</div>
            <div>Phone: {this.props.companyPhone}</div>
            <div>Email: {this.props.companyEmail}</div>
        </div>
    }
}

export default Contact;