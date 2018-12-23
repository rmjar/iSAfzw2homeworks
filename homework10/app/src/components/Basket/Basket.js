import React, { Component, Fragment } from 'react';
import products from './../../products';
class Basket extends Component {

    renderOptions() {
        const randomProducts = { "": "" };
        const productsCount = products.length;
        for (let i = 0; i < 100; i++) {
            const idx = Math.floor(Math.random() * 10);
            const { name } = products[idx];
            randomProducts[name] = randomProducts[name] ? randomProducts[name] + 1 : 1;
        }
        return Object.entries(randomProducts);
    }

    render() {
        return <span>
            <select name='basket' value='basket' readOnly>
                {this.renderOptions().map((product) => <option value={product[0]} key={product[0]}>
                    {product[0]} {product[0] !== "" ? ', items: ' : ''}{product[1]}</option>)}
            </select>
        </span>;
    }
}

export default Basket;