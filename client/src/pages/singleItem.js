import React, { Component } from 'react'
import API from '../utils/Api';
import './pages.css';
const nodemailer = require("nodemailer");
const oauth2 = require("oauth2");


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
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                    type: "OAuth2",
                    user: "24hrbidder@gmail.com",
                    clientId: "866019043905-2gotkchkuachnjvvk9shbmhrrl3h5rkp.apps.googleusercontent.com",
                    clientSecret: "XXJxWdO8hDPyjaIE728-aVVr",
                    refreshToken: "1//04drX0PXBQmrDCgYIARAAGAQSNwF-L9IrtQJBpRF-8y2MGxbCWT_n-WNcxM4rDUQnwC3_FDb_6HfAMlaklr7LXQGD32-FGUqGNTk",
                    accessToken: "ya29.Il-wB7ZN6d83Yo2OgjsCUBU49FQsSTcrmLCapQRBCckvy09ktcDhO1S1df5WdOyzbuMWZQP-LuZ9JioZicKLXMw29EjM-qbOiW2kchBcRnTcvBIJnzaPrZzpuylY0oFwEQ"
               
            }
        })
        
        var mailOptions = {
            from: '"24hr Bidder" <24hrbidder@gmail.com>',
            to: "corona.orlando@gmail.com",
            subject: "Nodemailer test",
            text: "Hello World"
        }
        
        transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Email Sent");
        
            }
        })
        /////////////////////////////////////////////////////////////

        if (this.state.item.quantity - numPurchased.quantity >= 0) {
            // console.log("sold!")
            // change page so that it gives an notification that user owes quantity*price
            API.updateItem(this.props.match.params.id, {
                // new: true,
                quantity: this.state.item.quantity - numPurchased.quantity
                // need to update quantity in db after math 1 line above
            }).then(update => {
                this.getItemDetails();
                window.location.assign('/');
            }).catch(err => {
                console.log(err)
            })
        } else {
            alert('not enough');
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