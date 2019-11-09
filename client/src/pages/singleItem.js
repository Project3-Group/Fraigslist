import React, { Component } from 'react'
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import Card from '../components/Card'
import items from "../items.json";
import API from '../utils/Api';


class SingleItem extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        API.getItem(this.props.match.params.id)
            .then(res => this.setState({ item: res.data }))
            // console.log(res.data)
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>test
                {/* <div className="container">
                    <div className="row">
                        {this.state.item.name}
                    </div>
                </div> */}
            </div>
        )

    }
}

export default SingleItem;