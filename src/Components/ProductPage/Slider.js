import React from "react";

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImageKey: 0
        }
        this.SelectImage = this.SelectImage.bind(this);
    }

    SelectImage(keyOfImg) {
        this.setState({
            currentImageKey: keyOfImg,
        })
    }

    render() {
        return (
            <>
                <div className="container-pic" data-testid='product-gallery'>
                    {this.props.img.map((value, key) => (
                        <div className="select-pic" key={key} onClick={() => this.SelectImage(key)}>
                            <img src={value} alt="Product"/>
                        </div>
                    ))}
                </div>
                <img className="main-picture" src={this.props.img[this.state.currentImageKey]} alt="Product"/>
            </>
        )
    }
}

export default Slider