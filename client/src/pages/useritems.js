import React, { Component } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import Modal from '../components/Modal'

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
            // console.log(response.data.user._id)
            let id = response.data.user._id
            console.log(id)
            API.getUserItems(id).then(res => {
                // console.log(res)
                this.setState({
                    items: res.data
                })
            }).catch(err => console.log(err))
        });
    }

    render() {
        return (
            <div>
                {this.state.items.map(cards => (
                    <Card
                        id={cards._id}
                        key={cards._id}
                        itemName={cards.itemName}
                        price={cards.price}
                        quantity={cards.quantity}
                        imageLink={cards.imageLink}
                    >
                        {/* description={cards.itemDescription} save for dynamically created pages */}
                        <Link to={"/items/" + cards._id}>Click</Link>
                    </Card>
                ))}
                <Modal>sadfasdfasdf</Modal>
            </div>
        )
    }
}

export default UserItems
