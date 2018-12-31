import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {

    render() {
        return <div>
            <Link to="/counter">Counter</Link>
            <Link to="/person">Person</Link>
        </div>;
    }
}

export default NavBar;