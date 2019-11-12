import React, { Component } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import { Link } from 'react-router-dom';
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
                API.getUserItems(id)
                    .then(res => this.setState({ item: res.data }))
                    .catch(err => console.log(err))
        })
        // .then(API.getUserItems(response.data.user._id)
        //     .then(res => this.setState({ item: res.data }))
        //     .catch(err => console.log(err)))
    }

    render() {
        return (
            <div>
                test
            </div>
        )
    }
}

export default UserItems
