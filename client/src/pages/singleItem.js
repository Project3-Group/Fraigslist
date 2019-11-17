import React, { Component } from 'react'
import API from '../utils/Api';
import './pages.css';
import './modals.css';
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Container, Col, Card } from 'reactstrap';
// const nodemailer = require("nodemailer");
// const oauth2 = require("oauth2");

class SingleItem extends Component {
    state = {
        item: [],
        quantity: "",
        id: "",
        sellerId: "",
        sellerAmountMade: null,
        lowStockModal: false,
        noUserModal: false,
        purchasedModal: false,
        email: ""
    };

    componentDidMount() {
        this.getItemDetails();
        this.getUser();
    };

    getUser = () => {
        axios.get('/api/user/').then(response => {
            // console.log(response.data.user._id)
            if (!response.data.user) {
                return;
            } else {
                this.setState({
                    id: response.data.user._id,
                    email: response.data.user.email
                });
            };
        });
    };

    toggleLowStockModal = () => {
        this.setState({
            lowStockModal: !this.state.lowStockModal
        })
    };

    toggleNoUserModal = () => {
        this.setState({
            noUserModal: !this.state.noUserModal
        })
    };

    togglePurchasedModal = () => {
        this.setState({
            purchasedModal: !this.state.purchasedModal
        })
    };

    redirect = () => {
        window.location.assign('/login');
    };

    getItemDetails = () => {
        API.getItem(this.props.match.params.id)
            .then(res => {
                this.setState({
                    item: res.data,
                    sellerId: res.data.id
                });
                API.getSellerAmountMade(res.data.id).then(res => {
                    this.setState({ sellerAmountMade: res.data.money_made });
                });
            }).catch(err => console.log(err));
    };

    handleInputChange = event => {
        // console.log(event.target);
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("thing of interest")
        console.log(this.state)
        const numPurchased = {
            quantity: this.state.quantity,
        }
        let spent = this.state.quantity * this.state.item.price;
        let newSellerAmountMade = spent + this.state.sellerAmountMade;
        if (!this.state.id) {
            this.toggleNoUserModal();
        } else {
            if (this.state.item.quantity - numPurchased.quantity < 0) {
                this.toggleLowStockModal();
            } else {
                this.togglePurchasedModal();
                API.updateItem(this.props.match.params.id, {
                    quantity: this.state.item.quantity - numPurchased.quantity
                }).then(update => {
                    API.updateSellerAmountMade(this.state.sellerId, {
                        money_made: newSellerAmountMade
                    }).then(update => {
                        console.log('second chance amount made ' + newSellerAmountMade);
                        this.getItemDetails();
                    })
                    // window.location.assign('/');
                }).catch(err => {
                    // console.log(err)
                })

                alert("Congrats")
                //build body object to include in call
                let body = {
                    email: this.state.email,
                    // company: this.state.company,
                    // imageLink: this.state.imageLink,
                    // itemDescription: this.state.itemDescription,
                    // itemName: this.state.itemName,
                    // price: this.state.price
                }

                axios.post("/mail/" + this.state.id, body)
                // .then(response => console.log(response))
            }

        }

    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Card>
                            <Col>
                                <Row className="text-center">
                                    {this.state.item.itemName}
                                </Row>
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
                                    <div style={{ display: "block" }}>Quantity: {this.state.item.quantity}</div>
                                </div>
                                <div className='row'>
                                    <div>Price: USD$: {this.state.item.price}</div>
                                </div>
                                <div className='row'>
                                    <div style={{ display: "block" }}>Item Description: {this.state.item.itemDescription}</div>
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
                            </Col>
                        </Card>
                    </Row>
                </Container>

                <div>
                    <Modal toggle={this.toggleLowStockModal} isOpen={this.state.lowStockModal} style={{ opacity: 1 }}>
                        <ModalHeader>Not Enough Stock!</ModalHeader>
                        <ModalBody>There isn't enough of this in stock for your purchase. Please try a lower amount.</ModalBody>
                        <ModalFooter>
                            <Button color="warning" onClick={this.toggleLowStockModal}>Close</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal toggle={this.redirect} isOpen={this.state.noUserModal} style={{ opacity: 1 }}>
                        <ModalHeader>No User Found!</ModalHeader>
                        <ModalBody>You aren't logged in! Close this and log in to buy.</ModalBody>
                        <ModalFooter>
                            <Button color="warning" onClick={this.redirect}>Close</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal toggle={this.togglePurchasedModal} isOpen={this.state.purchasedModal} style={{ opacity: 1 }}>
                        <ModalHeader>Purchased!</ModalHeader>
                        <ModalBody>You just bought this item. Check your email.</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.togglePurchasedModal}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default SingleItem;