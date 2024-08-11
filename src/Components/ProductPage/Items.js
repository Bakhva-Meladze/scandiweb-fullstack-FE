import React from "react";

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    addSelectItem = (id, items) => {
        this.setState({
                [id]: items
            }, () => {
                this.props.addSelectItem(this.state);
            }
        );
    }

    render() {
        return (
            <div>
                {this.props.itemAttributes?.map((attributes, key) => (
                    <div key={key}>
                        <p key={attributes.id} className="size">{attributes.id}</p>
                        <div className="items"
                             data-testid={`product-attribute-${attributes.name.replace(/\s+/g, '-').toLowerCase()}`}>
                            {attributes.items?.map((item, index) => (
                                attributes.id === "color" ?
                                    <div style={{backgroundColor: item.value}}
                                         className={`${index === this.state[attributes.id] ? "color select-color item" : "item"}`}
                                         key={item.value}
                                         onClick={() => this.addSelectItem(attributes.id, index)}
                                         data-testid={`product-attribute-${
                                             attributes.name.replace(/\s+/g, '-').toLowerCase()
                                         }-${
                                             item.displayValue.replace(/\s+/g, '-')
                                         }${index === this.state[attributes.id] ? '-selected' : ''}`}
                                    >
                                    </div>
                                    :
                                    <div className={`${index === this.state[attributes.id] ? "color item" : "item"}`}
                                         key={index}
                                         onClick={() => this.addSelectItem(this.props.itemAttributes[key].id, index)}
                                         data-testid={`product-attribute-${
                                             attributes.name.replace(/\s+/g, '-').toLowerCase()
                                         }-${
                                             item.value.replace(/\s+/g, '-')
                                         }${index === this.state[attributes.id] ? '-selected' : ''}`}
                                    >
                                        <p className="value">{item.value}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                ))
                }
            </div>
        )
    }
}

export default Items