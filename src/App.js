import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Header from "./Components/Header/Header";
import React from "react";
import {Route, Redirect, BrowserRouter, Switch} from "react-router-dom";
import ProductPage from "./Components/ProductPage/ProductPage";
import "./Style/Style.css";
import CartProvider from "./Components/cart/CartProvider";
import Queries from "./querys/Queries";
import UpdateCart from "./Components/cart/UpdateCart";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Queries>
                    <UpdateCart>
                        <CartProvider>
                            <BrowserRouter>
                                <Header/>
                                <Switch>
                                    <Route exact path="/">
                                        <Redirect to="/all"/>
                                    </Route>
                                    <Route path="/product/:productId">
                                        <ProductPage/>
                                    </Route>
                                    <Route path="/:item">
                                        <CategoryPage/>
                                    </Route>
                                </Switch>
                            </BrowserRouter>
                        </CartProvider>
                    </UpdateCart>
                </Queries>
            </div>
        )
    }
}

export default App