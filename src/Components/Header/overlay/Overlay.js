import React from "react";
import icon from '../../../images/emptyCart.svg';
import CartContext from "../../cart/CartContext";
import Items from "./Items";
import ChangeQuantity from "./ChangeQuantity";
import ImageSlider from "./ImageSlider";
import Summary from "./Summary";
import OverlayButtons from "./OverlayButtons";
import url from "../../../url";

class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    variables = () => {
        const attributes = JSON.parse(localStorage.getItem('cartProducts'));

        return {
            OrderInput: {
                items: attributes.map((attributes, index) => {
                    return {
                        productId: attributes.id,
                        quantity: attributes.length,
                        attributeValues: attributes.items.map((items, itemIndex) => {
                            const sizeID = items?.id;
                            const itemId = attributes.choseItemID?.[sizeID];

                            return {
                                id: items.items[itemId].id,
                                value: items.items[itemId].value
                            }
                        })
                    }
                }),
            }
        }
    };
    deleteLocalStorage = () => {
        this.context.DeleteLocalStorage();
    }

    SendData = async () => {
        const variables = this.variables();
        const query = this.context.placeOrders();
        this.deleteLocalStorage();

        const responseOption = {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables,
            }),
        };

        try {
            const response = await fetch(url, responseOption);
            const responseData = await response.json();

            if (responseData.errors) {
                this.setState({error: responseData.errors[0].message});
            } else {
                this.setState({orderResponse: responseData.data.placeOrder});
            }
        } catch (err) {
            this.setState({error: 'Network error: ' + err.message});
        } finally {
            this.setState({loading: false});
        }
    };

    toggleCart = () => {
        this.props.toggleCart();
    }

    render() {
        return (
            <CartContext.Consumer>
                {({QuantityOfProducts, ChangeProductInCart, cachedData}) => (
                    <div>
                        <div className="basket-container" data-testid='cart-btn' onClick={() => this.toggleCart()}>
                            <img className="basket" src={icon} alt={"basket"}/>
                            <div className="circle">
                                <span className="circle-value"
                                      data-testid="cart-count-bubble">{QuantityOfProducts()}</span>
                            </div>
                        </div>
                        {this.props.showCartOverlay && (
                            <div>
                                <div className="cart-overlay" data-testid="cart-overlay">
                                    <div className="title">
                                        <span className="brand">{"My Bag  , "}</span>
                                        <span className="items">{
                                            QuantityOfProducts() !== 1
                                                ? `${QuantityOfProducts()} items`
                                                : `${QuantityOfProducts()} item`
                                        }</span>
                                    </div>
                                    {cachedData?.map((product, index) => (
                                        <div key={index} className="container-overflow-item">
                                            <Items
                                                chooseItemID={product.choseItemID}
                                                brand={product.brand}
                                                name={product.name}
                                                currency={product.prices}
                                                productAttributes={product.items}
                                                currencyKey={0}
                                            />
                                            <div className="content-right-overflow">
                                                <ChangeQuantity
                                                    ChangeProductInCart={ChangeProductInCart}
                                                    productQuantity={product.length}
                                                    index={index}
                                                />
                                                <ImageSlider
                                                    images={product.gallery}
                                                    imageKey={index}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Summary
                                        currencySymbol={cachedData !== null ?
                                            cachedData[0]?.prices[0].currency.symbol : "$"}
                                        currencyKey={0}
                                        prices={cachedData?.map((value) => value.length * value.prices[0]?.amount)}
                                        QuantityOfProducts={QuantityOfProducts()}
                                    />
                                    <OverlayButtons SendData={this.SendData} close={this.toggleCart}/>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}

Overlay.contextType = CartContext;

export default Overlay