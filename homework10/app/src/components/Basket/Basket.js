import React, { Component } from 'react';

import { connect } from 'react-redux';

class Basket extends Component {



    renderOptions() {
        const { basket } = this.props;
        return basket.map(item => {
            return <option value={item['name']} key={item['name']}>
                {item['name']} {item['name'] !== '' ? ', items: ' + item['quantity'] : ''}
                {item['name'] !== '' ? ', total price: ' + item['quantity'] * item['itemPrice'] : ''}
            </option>
        })
    }

    render() {
        return <span>
            <select name='basket' value='basket' readOnly>
                {this.renderOptions()}
            </select>
        </span>;
    }
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket
    }
}

export default connect(mapStateToProps)(Basket);
