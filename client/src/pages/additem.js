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
        // console.log(event.target);
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleImageChange = event => {
        // console.log(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
            this.setState({
                imageLink: e.target.result
            })
        }
        reader.readAsDataURL(file);
    }

    redirect = () => {
        window.location.assign('/useritems/' + this.props.match.params.id);
    };

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

        // console.log(newItem);

        // axios
        API.addItem(newItem).then(() => {
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
        })
        // .catch(err =>console.log(err));

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
                        placeholder="itemName" /><br></br>
                    <input
                        name="imageLink"
                        type="file"
                        accept='image/*'
                        onChange={this.handleImageChange}
                        placeholder="imageLink" /><br></br>
                    <input
                        name="quantity"
                        type="number"
                        value={this.state.quantity}
                        onChange={this.handleInputChange}
                        placeholder="quantity" /><br></br>
                    <input
                        name="price"
                        value={this.state.price}
                        onChange={this.handleInputChange}
                        type="number"
                        placeholder="price" /><br></br>
                    <input
                        name="company"
                        value={this.state.company}
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="company" /><br></br>
                    <input
                        name="itemDescription"
                        type="text"
                        value={this.state.itemDescription}
                        onChange={this.handleInputChange}
                        placeholder="itemDescription" /><br></br>
                    <button onClick={this.handleFormSubmit}>Submit</button>
                </form>

                <Modal toggle={this.redirect} isOpen={this.state.itemAddedModal} style={{ opacity: 1 }}>
                    <ModalHeader>Item Added!</ModalHeader>
                    <ModalBody>Item has been added to your store.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.redirect}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddItem;
