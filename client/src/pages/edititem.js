import React, { Component } from 'react'
import API from '../utils/Api';
import './pages.css';
import axios from 'axios'

class EditItem extends Component {
    state = {
        item: [],
        quantity: "",
        price: "",
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
                });
            };
        });
    };

    getItemDetails = () => {
        API.getItem(this.props.match.params.id)
            .then(res => this.setState({ item: res.data }))
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(updatedItem)
        const updatedItem = {
            newQuantity: this.state.quantity,
            newPrice: this.state.price
        };
        if (!this.state.id) {
            console.log("Cannot edit item");
            window.location.assign('/login');
        } else {
            API.updateItem(this.props.match.params.id, {
                quantity: updatedItem.newQuantity,
                price: updatedItem.newPrice
            }).then(update => {
                this.getItemDetails();
                // window.location.assign('/');
            }).catch(err => {
                console.log(err)
            });
        };
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className='row'>
                        <div>{this.state.item.itemName}</div>
                    </div>

                    <div className="row image-row">
                        {/* add item detail stuff */}
                        <img
                            src={this.state.item.imageLink}
                            alt={this.state.item.itemName}
                            id={this.state.item.itemName} />
                    </div>

                    <div className='row'>
                        <div>Current Quantity: {this.state.item.quantity}</div>
                        <div>Current Price: USD$: {this.state.item.price}</div>
                    </div>

                    <div className="row description-row">
                        Purchase Quantity:
                    </div>
                    <div className='row'>
                        <form>
                            <input
                                name="quantity"
                                type="number"
                                value={this.state.quantity}
                                onChange={this.handleInputChange}
                                placeholder="New Quantity" />
                            <input
                                name="price"
                                type="number"
                                value={this.state.price}
                                onChange={this.handleInputChange}
                                placeholder="New Price" />

                            <button onClick={this.handleFormSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default EditItem;