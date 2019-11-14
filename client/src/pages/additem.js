import React, { Component } from "react";
import API from '../utils/Api';
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddItem extends Component {
    state = {
        itemName: "",
        imageLink: "",
        quantity: "",
        price: "",
        itemDescription: "",
        company: "",
        inCart: false,
        id: "",
        itemAddedModal: false
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        axios.get('/api/user/').then(response => {
            // console.log(response.data.user._id)
            this.setState({
                id: response.data.user._id
            })
        })
    }

    toggleitemAddedModal = () => {
        this.setState({
            itemAddedModal: !this.state.itemAddedModal
        })
    };

    handleInputChange = event => {
        console.log(event.target);
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();

        const newItem = {
            itemName: this.state.itemName,
            imageLink: this.state.imageLink,
            quantity: this.state.quantity,
            price: this.state.price,
            itemDescription: this.state.itemDescription,
            company: this.state.itemDescription,
            id: this.state.id
            // inCart: this.state.inCart,

        }
        console.log(newItem);

        // axios
        API.addItem(newItem);

        this.setState(
            {
                itemName: "",
                imageLink: "",
                quantity: "",
                price: "",
                itemDescription: "",
                company: "",
            }
        )
        this.toggleitemAddedModal();
    };

    render() {
        return (
            <div>
                <form>
                    <input
                        name="itemName"
                        type="text"
                        value={this.state.itemName}
                        onChange={this.handleInputChange}
                        placeholder="itemName" />
                    <input
                        name="imageLink"
                        type="text"
                        value={this.state.imageLink}
                        onChange={this.handleInputChange}
                        placeholder="imageLink" />
                    <input
                        name="quantity"
                        type="number"
                        value={this.state.quantity}
                        onChange={this.handleInputChange}
                        placeholder="quantity" />
                    <input
                        name="price"
                        value={this.state.price}
                        onChange={this.handleInputChange}
                        type="number"
                        placeholder="price" />
                    <input
                        name="company"
                        value={this.state.company}
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="company" />
                    <input
                        name="itemDescription"
                        type="text"
                        value={this.state.itemDescription}
                        onChange={this.handleInputChange}
                        placeholder="itemDescription" />
                    <button onClick={this.handleFormSubmit}>Submit</button>
                </form>

                <Modal toggle={this.toggleitemAddedModal} isOpen={this.state.itemAddedModal} style={{ opacity: 1 }}>
                    <ModalHeader>Item Added!</ModalHeader>
                    <ModalBody>Your item has been added.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleitemAddedModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddItem;
