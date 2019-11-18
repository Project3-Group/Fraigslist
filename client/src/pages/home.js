import React, { Component } from 'react'
import Card from '../components/Card'
// import items from "../items.json";
import API from '../utils/Api';
import { Row, Container } from 'reactstrap';


class Home extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        API.getItemList().then(res => {
            // console.log(res.data);
            this.setState({
                items: res.data
            });
        });
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        {this.state.items.map(cards => (
                            <Card
                                id={cards._id}
                                key={cards._id}
                                itemName={cards.itemName}
                                price={cards.price}
                                quantity={cards.quantity}
                                imageLink={cards.imageLink}
                                className='home-card'
                            />
                        ))}
                    </Row>
                </Container>
            </div>
        );
    };
};

export default Home
