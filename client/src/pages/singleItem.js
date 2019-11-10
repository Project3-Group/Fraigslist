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

    handleFormSubmit = event => {
        event.preventDefault();
        const numPurchased = {
            quantity: this.state.quantity,
        }
            // // database number
            // console.log(this.state.item.quantity)
            // // user input number
            // console.log(numPurchased.quantity)

        if (this.state.item.quantity - numPurchased.quantity >= 0) {
            console.log("sold!")
            API.updateItem(this.props.match.params.id, {
                new: true,
                quantity: this.state.item.quantity - numPurchased.quantity
                // need to update quantity in db after math 1 line above
            })
        } else {
            console.log("not enough to sell")
        }
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