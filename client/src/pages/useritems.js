import React, { Component } from 'react'
import axios from 'axios'
// import Card from '../components/Card'
import './pages.css';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

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
            // console.log("logging response");
            // console.log(response.data)
            let id = response.data.user._id
            // console.log(id)
            API.getUserItems(id).then(res => {
                console.log(res.data)
                let data = res.data
                this.setState({
                    items: data
                })
            })
            // .catch(err => console.log(err))
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {this.state.items.map(cards => (
                            <Card id={cards._id}>
                                <CardBody>
                                    <CardTitle>
                                        {cards.itemName}
                                    </CardTitle>
                                    <CardImg className="img" src={cards.imageLink} />
                                    <CardText>
                                        Price: ${cards.price}<br></br>
                                        Quantity: {cards.quantity}<br></br>
                                        Item Description: {cards.itemDescription}
                                    </CardText>
                                    <form action={'/edititem/' + cards._id} method='get'>
                                        <button type='submit'>Edit Item</button>
                                    </form>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserItems
