import products from '../products'
const initState = {
    basket: [{
        uuid: '',
        name: '',
        quantity: 0,
        itemPrice: 0
    }],
    products
}
export const rootReducer = (state = initState, action) => {
    if (action.type === 'BUY_ITEM') {
        //handle list of products
        console.log(state, action)
        let { products, basket } = state;
        const filteredProducts = products.filter(product => product.uuid !== action.uuid);
        const bought = products.filter(product => product.uuid === action.uuid);
        bought.forEach(item => item.quantity -= 1);
        products = [...filteredProducts, ...bought];

        console.log(products)
        //handle basket
        const otherBoughtItems = basket.filter(item => item.uuid !== action.uuid);
        let boughtBasket = basket.filter(item => item.uuid === action.uuid);
        if (boughtBasket.length > 0) {
            boughtBasket.forEach(item => {
                item.quantity += 1
            });
        } else {
            boughtBasket = [{
                uuid: bought[0].uuid,
                name: bought[0].name,
                quantity: 1,
                itemPrice: bought[0].price,
            }];
        }
        basket = [...otherBoughtItems, ...boughtBasket];
        return {
            ...state,
            products,
            basket
        };
    }

    return state;
}

export default rootReducer;