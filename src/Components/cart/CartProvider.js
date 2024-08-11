import React, {Component} from "react";
import CartContext from "./CartContext";

class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: ""
        }
    }

    QuantityOfProducts = () => {
        let sumResult = 0;
        this.context.cachedData ? this.context.cachedData.map((value) => (
            sumResult += value.length
        )) : sumResult = 0;

        return sumResult;
    }

    render() {
        const {
            placeOrders,
            queryOfProduct,
            queryOfCategory,
            currencyPriceQuery,
            DeleteLocalStorage,
            AddProductInCart,
            ChangeProductInCart,
            cachedData,
            testData,
            productsPrices,
        } = this.context;
        const {openOverlay} = this.state;
        const {QuantityOfProducts} = this;

        return (
            <CartContext.Provider value={{
                placeOrders, cachedData, productsPrices, openOverlay, testData, QuantityOfProducts,
                DeleteLocalStorage, AddProductInCart, queryOfProduct, queryOfCategory,
                currencyPriceQuery, ChangeProductInCart
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

CartProvider.contextType = CartContext;
export default CartProvider;