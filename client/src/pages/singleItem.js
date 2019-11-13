import React, { Component } from 'react'
import API from '../utils/Api';
import './pages.css';
const nodemailer = require("nodemailer");
const oauth2 = require("oauth2")


class SingleItem extends Component {
    state = {
        item: [],
        quantity: "",
    };

    componentDidMount() {
       this.getItemDetails()
    }

    getItemDetails = () => {
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
        // console.log(this.props.match.params.id)

        /////////////////////////////////////////////////////////////
        
        /////////////////////////////////////////////////////////////

        if (this.state.item.quantity - numPurchased.quantity >= 0) {
            // console.log("sold!")
            // change page so that it gives an notification that user owes quantity*price

            API.updateItem(this.props.match.params.id, {
                // new: true,
                quantity: this.state.item.quantity - numPurchased.quantity
                // need to update quantity in db after math 1 line above
            }).then(update => {
                this.getItemDetails()
            }).catch(err => {
                console.log(err)
            })
        } else {
            // change page so that it gives an notification that there isn't enough stock
            // console.log("not enough to sell")
        }
    }



    render() {
        return (
            <div>
                <div className="container">
                    <div className='row'>
                        <div>Price: USD$: {this.state.item.price}</div>

                        <div>{this.state.item.itemName}</div>
                    </div>

                    <div className="row image-row">
                        {/* columns not working the way outside of react maybe need reactstrap? */}
                        {/* {console.log(this.state.item)} */}
                        {/* add item detail stuff */}
                        <img
                            src={this.state.item.imageLink}
                            alt={this.state.item.itemName}
                            id={this.state.item.itemName} />
                    </div>
                    <div className='row'>
                        <div>Quantity: {this.state.item.quantity}</div>
                    </div>

                    <div className="row description-row">

                        {/* stuff to handle item purchases */}
                        Purchase Quantity:
                        {/* figure out how to make this box smaller - aethetic purposes only */}
                    </div>
                    <div className='row'>
                        <form>
                            <input
                                name="quantity"
                                type="number"
                                value={this.state.quantity}
                                onChange={this.handleInputChange}
                                placeholder="quantity" />

                            <button onClick={this.handleFormSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}

export default SingleItem;