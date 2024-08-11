import React from "react";
import {NavLink, withRouter} from "react-router-dom";

class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            existingCategoryName: 'all' // default category
        }

    }

    changeCategoryName(data) {
        this.setState({
            existingCategoryName: data,
        })

    }


    render() {
        return (
            <div className="navigation">
                {this.props.categories.map((category, key) => (
                    <label key={key}
                           className={`btn ${this.state.existingCategoryName === category.name ? 'select-btn' : ''}`}>
                        <NavLink className={`btns ${this.state.existingCategoryName} `}
                                 data-testid={this.state.existingCategoryName === category.name ? 'active-category-link' : 'category-link'}
                                 key={category.name}
                                 to={"/" + category.name}
                                 onClick={() => this.changeCategoryName(category.name)}
                        >
                            {category.name}
                        </NavLink>
                    </label>
                ))}
            </div>
        )
    }
}

export default withRouter(Category);