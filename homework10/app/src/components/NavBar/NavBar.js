import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Basket from './../Basket';
import "./NavBar.css";

class NavBar extends Component {

    render() {
        return <div>
            <Link to="/contact">Contact</Link>
            <Link to="/products">Products</Link>
            <Basket className='basket' />
        </div>;
    }
}

export default NavBar;