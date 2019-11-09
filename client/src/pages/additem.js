import React, { Component } from "react";
import API from '../utils/Api';

class AddItem extends Component {
    state = {
        itemName: "",
        imageLink: "",
        quantity: "",
        price: "",
        itemDescription: "",
        company: "",
        inCart: false,
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
            // inCart: this.state.inCart,

        }
        // console.log(newItem);
        
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
    }

    // When the component mounts, load the next dog to be displayed

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
            </div>
        );
    }
}

export default AddItem;
