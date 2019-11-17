import React, { Component } from "react";
import API from '../utils/Api';
import axios from 'axios'
import {
    Card, CardText, CardBody, Row, Container, Col, Jumbotron,
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

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
                <Jumbotron className="text-center">
                    <h1 className="display-3">Add a new item!</h1>
                    <p className="lead">Fill out the form with the required fields. We'll update your page with how much money you made!</p>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Card body outline color="secondary" className="addCard">
                                <CardBody>
                                    <CardText>
                                        <form>
                                            <div>Listing Title</div>
                                            <input
                                                name="itemName"
                                                type="text"
                                                value={this.state.itemName}
                                                onChange={this.handleInputChange}
                                                placeholder="Item Name" /><br></br>
                                            <div>Add an image.</div>
                                            <input
                                                name="imageLink"
                                                type="file"
                                                accept='image/*'
                                                onChange={this.handleImageChange}
                                                placeholder="imageLink" /><br></br>
                                            <div>Quantity if your item.</div>
                                            <input
                                                name="quantity"
                                                type="number"
                                                value={this.state.quantity}
                                                onChange={this.handleInputChange}
                                                placeholder="Quantity" /><br></br>
                                            <div>Price of your item.</div>
                                            <input
                                                name="price"
                                                value={this.state.price}
                                                onChange={this.handleInputChange}
                                                type="number"
                                                placeholder="Price" /><br></br>
                                            <div>Brand of your item.</div>
                                            <input
                                                name="company"
                                                value={this.state.company}
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="Company/Brand" /><br></br>
                                            <div>Provide a description of your item.</div>
                                            <div class="form-group">
                                                <textarea
                                                    name="itemDescription"
                                                    class="form-control"
                                                    id="itemDescription"
                                                    rows="2"
                                                    type="text"
                                                    value={this.state.itemDescription}
                                                    placeholder="Enter item description."
                                                    onChange={this.handleInputChange}
                                                ></textarea>
                                            </div>

                                            <Button onClick={this.handleFormSubmit}>Submit</Button>
                                        </form>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                
                <div>
                    <Modal toggle={this.redirect} isOpen={this.state.itemAddedModal} style={{ opacity: 1 }}>
                        <ModalHeader>Item Added!</ModalHeader>
                        <ModalBody>Item has been added to your store.</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.redirect}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        );
    }
}

export default AddItem;
