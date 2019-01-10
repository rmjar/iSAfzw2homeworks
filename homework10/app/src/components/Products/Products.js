import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { handleBuy } from '../../actions/postActions'


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            category: '',
            sortAsc: true,
            showAll: false,
            showDiscounts: false,
        };
    }


    handleChange = (event) => {
        const { value, name } = event.target; //event.target przekazuje nazwę danego pola i wartość danego pola

        this.setState({
            [name]: value, // [klucz] - wyciągnij nazwę klucza z obiektu i przypisz wartość value odpowiednik obj[name] = value
        });
    }

    handleChecked = (event) => {
        const { checked, name } = event.target; //event.target przekazuje nazwę danego pola i wartość danego pola
        this.setState({
            [name]: checked, // [klucz] - wyciągnij nazwę klucza z obiektu i przypisz wartość value odpowiednik obj[name] = value
        });
    }

    handleSort = () => {
        this.setState((prevState) => ({
            sortAsc: !prevState.sortAsc,
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleBuyClick = (productUuid) => {
        this.props.handleBuy(productUuid);
    }

    filterByUuid = (productUuid) => {
        const { match: { params: { uuid } } } = this.props;
        return productUuid === uuid || uuid === undefined;
    }

    getProductByUuid = uuid => this.props.products.find(p => p.uuid === uuid);

    renderProduct = (product) => {
        const { uuid, name, category, quantity, promotion } = product;
        return <div key={uuid}><li><Link key={uuid} to={`/products/${uuid}`}>{`${name}`} </Link>{`,  ${category},  ` +
            `${promotion ? " promotion " : " "}, items: ${quantity}`}
            <button disabled={quantity === 0 ? "disabled" : ""} onClick={() => this.handleBuyClick(uuid)}>
                {quantity === 0 ? "Sold out" : "Buy"}
            </button>
        </li>
        </div>
    }

    renderSingleProduct(product) {
        const { name, category, quantity, promotion, price, imageUrl, description } = product;
        return <div>
            <h2>{name}, {category}</h2>
            <img src={imageUrl} alt="" />
            <div>{description}</div>
            <div>Price: {price}</div>
            <div>Availability: {quantity} items</div>
            <div>Promotion: {promotion ? 'yes' : 'no'}</div>
        </div>
    }

    renderForm() {
        const { search, category, sortAsc, showAll, showDiscounts } = this.state;
        return <div>
            <span onClick={this.handleSort}>Sort: {sortAsc ? `↑  ` : `↓  `}</span>
            <form style={{ display: 'inline-block' }} onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} name="search" value={search} placeholder="search product..." />
                <label htmlFor="category"> category:</label>
                <select name="category" onChange={this.handleChange} value={category} >
                    {this.props.categories.map((category) => <option value={category} key={category}>{category}</option>)}
                </select>
                <label htmlFor="showAll"> only available:</label>
                <input type="checkbox" onChange={this.handleChecked} name="showAll" checked={showAll} />
                <label htmlFor="showDiscounts"> only promotion:</label>
                <input type="checkbox" onChange={this.handleChecked} name="showDiscounts" checked={showDiscounts} />
                {/* <button type="submit">Add</button> */}
            </form>
        </div>
    }

    render() {
        const { match: { params: { uuid } }, products: prods } = this.props;
        const { sortAsc, showDiscounts } = this.state;
        console.log(this.props)
        return (
            <Fragment>
                <h2>Products</h2>
                {
                    this.renderForm()
                }
                {
                    prods
                        .filter(({ name, category, quantity, promotion }) => {
                            const { search, category: cat, showAll } = this.state;
                            return ((name.toLowerCase().includes(search.toLowerCase()) || (!search)) &&
                                (category === cat || !cat) && (quantity || !showAll) && (promotion || !showDiscounts));
                        })
                        .filter(this.filterByUuid)
                        .sort(({ name: nameA }, { name: nameB }) => {
                            return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
                        })
                        .map(this.renderProduct)
                }
                {
                    uuid &&
                    <div>
                        {this.renderSingleProduct(this.getProductByUuid(uuid))}
                        <Link to="/products">Full list</Link>
                    </div>
                }
            </Fragment >
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        basket: state.basket,
        products: state.products,
        categories: state.products.reduce((acc, product) => {
            if (!acc.includes(product.category)) {
                acc.push(product.category);
            }
            return acc;
        }, ['']),
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleBuy: uuid => { dispatch(handleBuy(uuid)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
