import React, { Component } from 'react';
import Map from './Map'

class Contact extends Component {


    render() {
        return <div>
            <h2>Contact:</h2>
            <div>Company: {this.props.companyName}</div>
            <div>Address: {this.props.companyAddress}</div>
            <div>Phone: {this.props.companyPhone}</div>
            <div>Email: {this.props.companyEmail}</div>
            <div><Map {...this.props.mapProps}/></div>
        </div>
    }
}

export default Contact;