import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Card from '../components/Card'
import items from "../items.json"


class Home extends Component {
    state = {
        items
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {this.state.items.map(cards => (
                            <Card
                                id={cards.id}
                                key={cards.id}
                                name={cards.name}
                                image={cards.image}
                                description={cards.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )

    }
}

export default Home
