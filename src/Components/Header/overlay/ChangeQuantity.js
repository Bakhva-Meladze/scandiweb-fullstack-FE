import React from "react";

class ChangeQuantity extends React.Component {
    UpdateCart = (type) => {
        this.props.ChangeProductInCart(type, this.props.index);
    }

    render() {
        return (<div className="quantity-switcher-overlay">
                <div className="sum-overlay">
                    <div onClick={() => this.UpdateCart("increase")} className="sum-button"
                         data-testid='cart-item-amount-increase'
                    >
                        +
                    </div>
                    <span data-testid='cart-item-amount'>
                        {this.props.productQuantity}
                    </span>
                    <div onClick={() => this.UpdateCart("decrease")} className="sum-button"
                         data-testid='cart-item-amount-decrease'
                    >
                        -
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangeQuantity