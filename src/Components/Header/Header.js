import React from "react";
import iconBox from "../../images/logo.svg";
import url from "../../url";
import Category from "./Category";
import CartContext from "../cart/CartContext";
import Overlay from "./overlay/Overlay";
import Loading from "../../Loading";
import {withRouter} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            error: null,
            loading: true,
            showCartOverlay: false
        }
    }

    async componentDidMount() {
        await this.fetchCurrencyData();
    }

    async fetchCurrencyData() {
        const responseOption = {
            method: 'POST',
            body: JSON.stringify({
                query: this.context.currencyPriceQuery()
            })
        }
        try {
            const response = await fetch(url, responseOption);
            const responseData = await response.json();
            this.setState({
                categories: responseData.data.categories,
                loading: false
            });
        } catch (Error) {
            this.setState({
                error: Error
            })
        }
    }

    toggleCart = () => {
        this.setState({
            showCartOverlay: !this.state.showCartOverlay
        })
    }

    render() {
        return (
            <CartContext.Consumer>
                {() => (
                    <>
                        <div className="header">
                            {this.state.loading ? <Loading/> : ''}
                            <Category
                                categories={this.state.categories}
                            />
                            <div className="logo"><img src={iconBox} alt="logo"/></div>
                            <div className="right">
                                <Overlay toggleCart={this.toggleCart} showCartOverlay={this.state.showCartOverlay}/>
                            </div>
                        </div>
                        {this.state.showCartOverlay ?
                            <div onClick={() => this.toggleCart()} className='overlay'></div> : ''}
                    </>
                )}
            </CartContext.Consumer>
        )
    }
}

Header.contextType = CartContext;

export default withRouter(Header)