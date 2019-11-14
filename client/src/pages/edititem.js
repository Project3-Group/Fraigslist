import React, { Component } from 'react'
import API from '../utils/Api';
import './pages.css';
import axios from 'axios'

class EditItem extends Component {
    static defaultProps = {

    }
    state = {
        item: [],
        quantity: "", // this.state.item.quantity
        price: "",
        description: "",
        id: "",
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
            console.log("Cannot edit item");
            window.location.assign('/login');
        } else {
            API.updateItem(this.props.match.params.id, {
                quantity,
                price,
                itemDescription,
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
                        <div className="col-md-6">
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

                        <div className="col-md-6">
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
                    </div>
                </div>
            </div>
            <div>
                                    <Modal toggle={this.redirect} isOpen={this.state.noUserModal} style={{ opacity: 1 }}>
                        <ModalHeader>No User Found!</ModalHeader>
                        <ModalBody>You aren't logged in! Close this and log in to buy.</ModalBody>
                        <ModalFooter>
                            <Button color="warning" onClick={this.redirect}>Close</Button>
                        </ModalFooter>
                    </Modal>
            </div>
        );
    };
};

export default EditItem;