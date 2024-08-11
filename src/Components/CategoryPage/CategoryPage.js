import React from "react";
import url from "../../url.js";
import CartContext from "../cart/CartContext";
import ProductCard from "./ProductCard";
import Loading from "../../Loading";
import {withRouter} from "react-router-dom";

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productsCategory: [],
            selectedCategory: this.props.match.params.item,
            loading: true
        }
    }

    componentDidMount() {
        this.fetchCategoryProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.item !== this.props.match.params.item) {
            this.fetchCategoryProducts();
        }
    }

    fetchCategoryProducts() {
        const response = {
            method: 'POST',
            body: JSON.stringify({
                query: this.context.queryOfCategory(this.props.match?.params.item)
            })
        }

        fetch(url, response).then(response => response.json()).then(responseData => {
            this.setState({
                productsCategory: responseData.data.products,
                loading: false
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
                        <div className="category-page">
                            {this.state.productsCategory.map((productCategory, key) => (

                                <ProductCard
                                    key={productCategory.id}
                                    productCategory={productCategory}
                                    AddProductInCart={AddProductInCart}
                                    currencyKey={0}
                                />
                            ))}
                        </div>
                )}
            </CartContext.Consumer>
        )
    }
}

CategoryPage.contextType = CartContext;

export default withRouter(CategoryPage)
