import React, { Component } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import { Link } from 'react-router-dom';
// import Modal from '../components/Modal'

// import items from "../items.json";
import API from '../utils/Api';


class UserItems extends Component {
    state = {
        items: []
    };

    // need to grab user id to get all user items?

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        axios.get('/api/user/').then(response => {
            console.log("logging response");
            console.log(response.data)
            let id = response.data.user._id
            console.log(id)
            API.getUserItems(id).then(res => {
                // console.log(res)
                let data=res.data
                this.setState({
                    items: data
                })
            }).catch(err => console.log(err))
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {this.state.items.map(cards => (
                            <Card
                                id={cards._id}
                                key={cards._id}
                                itemName={cards.itemName}
                                price={cards.price}
                                quantity={cards.quantity}
                                imageLink={cards.imageLink}
                                description={cards.itemDescription}
                            >
                            </Card>
                        ))}
                         
                        {/* {this.state.items.map(modals => (
                            <Modal
                                itemName={modals.itemName}
                                price={modals.price}
                                quantity={modals.quantity}
                                imageLink={modals.imageLink}
                                description={modals.itemDescription}
                            >
                            </Modal>
                        ))} */}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserItems
