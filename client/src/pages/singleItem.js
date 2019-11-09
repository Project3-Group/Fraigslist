import React, { Component } from 'react'
import API from '../utils/Api';


class SingleItem extends Component {
    state = {
        item: [],
        quantity: "",
    };

    componentDidMount() {
        API.getItem(this.props.match.params.id)
            .then(res => this.setState({ item: res.data }))
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        // console.log(event.target);
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    // need to add math to take total - numpurchased
    handleFormSubmit = event => {
        event.preventDefault();
        const numPurchased = {
            quantity: this.state.quantity,
        }

        console.log(this.state.item.quantity)
        console.log(numPurchased)

        API.updateItem(this.props.match.params.id)
            .then(data => this.setState({/* not sure how to update total - numPurchased */ })
            )
    }



    render() {
        return (
            <div> test test test test test test test
                <div className="container">
                    <div className="row">
                        {/* columns not working the way outside of react maybe need reactstrap? */}
                        {/* {console.log(this.state.item)} */}
                        {/* add item detail stuff */}
                        <div>{this.state.item.itemName}</div>
                        <div>Item Quantity: {this.state.item.quantity}</div>
                        <img
                            src={this.state.item.imageLink}
                            alt={this.state.item.itemName}
                            id={this.state.item.itemName} />
                    </div>

                    <div className="row">

                        {/* stuff to handle item purchases */}
                        Purchase Quantity:
                        {/* figure out how to make this box smaller - aethetic purposes only */}
                        <input
                            name="quantity"
                            type="number"
                            value={this.state.quantity}
                            onChange={this.handleInputChange}
                            placeholder="quantity" />

                        <button onClick={this.handleFormSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )

    }
}

export default SingleItem;