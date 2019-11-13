import React, { Component } from 'react'
import API from '../utils/Api';
import './pages.css';
import axios from 'axios'
const nodemailer = require("nodemailer");
const oauth2 = require("oauth2")



class SingleItem extends Component {
    state = {
        item: [],
        quantity: "",
        id: ""
    };

    componentDidMount() {
        this.getItemDetails();
        this.getUser();
    }

    getUser = () => {
        axios.get('/api/user/').then(response => {
            // console.log(response.data.user._id)
            if (!response.data.user) {
                return;
            } else {
                this.setState({
                    id: response.data.user._id
                })
            }
        })
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
        if (!this.state.id) {
            alert("Can't purchase without logging in");
            window.location.assign('/login');
        } else {
            if (this.state.item.quantity - numPurchased.quantity < 0) {
                alert('not enough');
            } else {
                API.updateItem(this.props.match.params.id, {
                    quantity: this.state.item.quantity - numPurchased.quantity
                }).then(update => {
                    this.getItemDetails();
                    window.location.assign('/');
                }).catch(err => {
                    console.log(err)
                })
            }

        }

    }



    render() {
        return (
            <div>
                <div className="container">
                    <div className='row'>
                        <div>Price: USD$: {this.state.item.price}</div>
                        {console.log('ITEMS')}
                        {console.log(this.state)}

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