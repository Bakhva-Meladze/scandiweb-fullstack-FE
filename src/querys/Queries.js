import React from "react";
import CartContext from "../Components/cart/CartContext";

class Queries extends React.Component {
    placeOrders() {
        return `mutation PlaceOrder($OrderInput: OrderInput!) {
        placeOrder(OrderInput: $OrderInput)
      }`
    }

    queryOfProduct(id) {
        return `{
    product(id: "${id}") {
      id
      name
      inStock
      gallery
      description
      category
     attributes {
       id
       name
       type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
  }`;
    }

    queryOfCategory(data) {
        return `{
     products(category: "${data}") { 
     id 
     name 
     inStock 
     brand 
     gallery 
     description 
     prices { 
       amount 
       currency { 
         label 
         symbol }
          }
     attributes { 
       id 
       name 
       type 
       items { 
         id  
         attribute_id 
         value 
         displayValue 
         } 
         } 
     } 
    }`;
    }

    currencyPriceQuery() {
        return `{ categories { name } }`;
    }

    render() {
        const {placeOrders, queryOfProduct, queryOfCategory, currencyPriceQuery} = this;
        return (
            <CartContext.Provider value={{placeOrders, queryOfProduct, queryOfCategory, currencyPriceQuery}}>
                {this.props.children}
            </CartContext.Provider>

        )
    }
}

Queries.contextType = CartContext;

export default Queries