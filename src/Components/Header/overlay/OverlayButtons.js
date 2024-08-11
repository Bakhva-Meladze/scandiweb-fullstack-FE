import React from "react";
import {withRouter} from "react-router-dom";

class OverlayButtons extends React.Component {
    render() {
        return (
            <div>
                <button className="overlay-button-placeOrder" data-testid="place-order-btn"
                        onClick={() => this.props.SendData()}>
                    PLACE ORDER
                </button>
            </div>
        )
    }
}

export default withRouter(OverlayButtons)