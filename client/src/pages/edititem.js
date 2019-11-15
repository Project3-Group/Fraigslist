import React, { Component } from 'react'
import API from '../utils/Api';
import './pages.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import axios from 'axios'

class EditItem extends Component {
    state = {
        item: [],
        quantity: "", // this.state.item.quantity
        price: "",
        description: "",
        id: "",
        updateModal: "",
        deleteItemModal: "",
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

    redirect = () => {
        window.location.assign('/useritems/'+this.props.match.params.id);
    };
    
    toggleUpdateModal = () => {
        this.setState({
            updateModal: !this.state.updateModal
        })
    };

    toggleDeleteModal = () => {
        this.setState({
            deleteItemModal: !this.state.deleteItemModal
        })
    };

    getItemDetails = () => {
        API.getItem(this.props.match.params.id)
            .then(res => this.setState({ item: res.data }))
            // .catch(err => console.log(err));
    };

    handleDeleteRequest = id => {
        // console.log(this.props.match.params.id)
        API.deleteItem(this.props.match.params.id)
          .then(res => this.toggleDeleteModal())        
        //   .catch(err => console.log(err));
      };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(value)
        console.log(this.state)

    };

    handleFormSubmit = event => {
        event.preventDefault();
        const updatedItem = {
            newQuantity: this.state.quantity,
            newPrice: this.state.price,
            newDesc: this.state.description
        };


        let price = !this.state.price ? this.state.item.price : this.state.price;
        let quantity = !this.state.quantity ? this.state.item.quantity : this.state.quantity;
        let itemDescription = !this.state.description ? this.state.item.itemDescription : this.state.description;

        if (!this.state.id) {
            // console.log("Cannot edit item");
            window.location.assign('/login');
        } else {
            this.toggleUpdateModal();
            API.updateItem(this.props.match.params.id, {
                quantity,
                price,
                itemDescription,
            }).then(update => {
                this.getItemDetails();
                // window.location.assign('/');
            }).catch(err => {
                // console.log(err)
            });
        };
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className='row'>
                        <div className="col-md-4">
                            <div>{this.state.item.itemName}</div>
                            <div className="row image-row">
                                {/* add item detail stuff */}
                                <img
                                    src={this.state.item.imageLink}
                                    alt={this.state.item.itemName}
                                    id={this.state.item.itemName} />
                            </div>
                            <div className='row'>
                                <div>Current Quantity: {this.state.item.quantity}</div>
                            </div>
                            <div className='row'>
                                <div>Current Price: USD$: {this.state.item.price}</div>
                            </div>
                            <div className='row'>
                                <div>Current Description: {this.state.item.itemDescription}</div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div>Submit your new information below.</div>
                            <form>
                                <div className='row'>
                                    <input
                                        name="quantity"
                                        type="number"
                                        value={this.state.quantity}
                                        onChange={this.handleInputChange}
                                        placeholder="Default: Current" />
                                </div>
                                <div className='row'>
                                    <input
                                        name="price"
                                        type="number"
                                        value={this.state.price}
                                        onChange={this.handleInputChange}
                                        placeholder="Default: Current" />
                                </div>
                                <div className='row'>

                                    <div class="form-group">
                                        <label for="itemDescription">Edit Description</label>
                                        <textarea
                                            name="description"
                                            class="form-control"
                                            id="itemDescription"
                                            rows="3"
                                            type="text"
                                            placeholder="Enter new description.
                                            Default: Current"
                                            // value={this.state.description}
                                            onChange={this.handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>

                                <button onClick={this.handleFormSubmit}>Submit</button>
                            </form>
                        </div>

                        <div className="col-md-4">
                            <div>If you don't want this item anymore, you can edit the amount to be 0 and hide it from the store, or hit the delete button and remove it.</div>

                            <button onClick={() => this.handleDeleteRequest(this.props.match.params.id)}>Delete Item</button>

                        </div>

                    </div>
                </div>
                <div>
                <Modal toggle={this.redirect} isOpen={this.state.updateModal} style={{ opacity: 1 }}>
                        <ModalHeader>Updated!</ModalHeader>
                        <ModalBody>Your item has been updated. Close to view your items.</ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.redirect}>Close</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal toggle={this.redirect} isOpen={this.state.deleteItemModal} style={{ opacity: 1 }}>
                        <ModalHeader>Item removed!</ModalHeader>
                        <ModalBody>This item has been removed from your store.</ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.redirect}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    </div>
            </div>
        );
    };
};

export default EditItem;