import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Card from '../components/Card'
import items from "../items.json";
import API from '../utils/Api';


class Home extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        API.getItemList().then(res => {
            console.log(res.data);
            this.setState({
                items: res.data
            });
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
                                key={cards.quantity}
                                name={cards.itemName}
                                image={cards.imageLink}
                                description={cards.itemDescription}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )

    }
}

export default Home
