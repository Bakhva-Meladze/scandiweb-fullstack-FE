import React from "react";
import url from "../../url";
import parse from "html-react-parser";
import Slider from "./Slider";
import Items from "./Items";
import CartContext from "../cart/CartContext"
import Loading from "../../Loading";
import {withRouter} from 'react-router-dom';

class ProductPage extends React.Component {
    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            description: '',
            attributes: [],
            hasError: "",
            currencySymbol: [],
            img: [],
            loading: true,
            key: null,
            permissionToAddDataInCart: false
        }

    }

    componentDidMount() {
        this.fetchProductData();
    }

    fetchProductData() {
        const responseOptions = {
            method: 'POST',
            body: JSON.stringify({
                query: this.context.queryOfProduct(this.props.match.params.productId)
            })
        }

        fetch(url, responseOptions).then(response => response.json()).then(responseData => {
            console.log(responseData);
            this.setState({
                product: responseData.data.product,
                img: responseData.data.product.gallery,
                attributes: responseData.data.product.attributes,
                description: responseData.data.product.description,
                currencySymbol: responseData.data.product.prices,
                loading: false

            });
        }).catch(error => {
            console.error('Error in ProductPage:', error);

            throw error
        })
    }

    addSelectItem = (selectedAttributes, count) => {
        this.setState({
            selectedAttributes,
        }, () => {
            this.setState({
                permissionToAddDataInCart: this.state.product?.attributes?.length === Object.keys(this.state.selectedAttributes)?.length
            })
        });
    }

    render() {

        return (
            <CartContext.Consumer>
                {({AddProductInCart}) => (
                    this.state.loading ?
                        <Loading/>
                        :
                        <div className="main-product">
                            <Slider className="container-pic" img={this.state.img}/>
                            <div className="product-details">
                                <div>
                                    <p className="brand">{this.state.product?.brand}</p>
                                    <p className="name">{this.state.product?.name}</p>
                                    <Items itemAttributes={this.state.attributes}
                                           addSelectItem={this.addSelectItem}
                                    />
                                    <p className="price"> Price:</p>
                                    <div className='currency'>
                                        {`${this.state.currencySymbol[0]?.currency.symbol} ${this.state.currencySymbol[0]?.amount}`}
                                    </div>
                                    <button className={!this.state.product.inStock ||
                                    (this.state.attributes.length !== 0 && !this.state.permissionToAddDataInCart)? "disable" : "buttonAdd"}
                                            disabled={!this.state.product.inStock ||
                                                (this.state.attributes.length !== 0 && !this.state.permissionToAddDataInCart)}
                                            onClick={() =>
                                                this.state.permissionToAddDataInCart || this.state.product?.attributes?.length === 0 ?
                                                    AddProductInCart(this.state.product, this.state.selectedAttributes)
                                                    :
                                                    alert("please select one of these options")}
                                            data-testid='add-to-cart'
                                    >
                                        {this.state.product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                                    </button>
                                    <div data-testid='product-description'>
                                        {parse(this.state.product.description ? this.state.product.description : "")}
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default withRouter(ProductPage)
