import React, { Component } from 'react'
import axios from 'axios'
// import Card from '../components/Card'
import './pages.css';

import { Card, CardImg, CardText, CardBody, CardTitle, Button, Container, Row, Col } from 'reactstrap';

// import Modal from '../components/Modal'

// import items from "../items.json";
import API from '../utils/Api';


class UserItems extends Component {
    state = {
        items: []
    };

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
                <Container>
                    <Row>
                        <Col lg='3' md='6' sm='12'>
                            {this.state.items.map(cards => (
                                <Card body inverse className='my-items-card'>
                                    <CardBody>
                                        <CardTitle className='text-center item-title'>
                                            {cards.itemName}
                                        </CardTitle>
                                        <CardImg width='100%' className="img" src={cards.imageLink} />
                                        <CardText>
                                            Price: ${cards.price}<br></br>
                                            Quantity: {cards.quantity}<br></br>
                                            Item Description: {cards.itemDescription}
                                        </CardText>
                                        <form action={'/edititem/' + cards._id} method='get'>
                                            <Button type='submit'>Edit Item</Button>
                                        </form>
                                    </CardBody>
                                </Card>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default UserItems
