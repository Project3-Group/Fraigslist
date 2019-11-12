import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Card from '../components/Card'
import { Link } from 'react-router-dom';
// import items from "../items.json";
import API from '../utils/Api';


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
                                >
                            {/* description={cards.itemDescription} save for dynamically created pages */}
                            <Link to={"/items/" + cards._id}>Click</Link> 
                            </Card>
                            ))}
                    </div>
                </div>
            </div>
        )

    }
}

export default Home
