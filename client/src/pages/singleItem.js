import React, { Component } from 'react'
import API from '../utils/Api';


class SingleItem extends Component {
    state = {
        item: []
    };

    componentDidMount() {
        API.getItem(this.props.match.params.id)
            .then(res => this.setState({ item: res.data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>test
                <div className="container">
                    <div className="row">
                        {/* {console.log(this.state.item)} */}
                        {this.state.item.itemName}
                        {/* add more stuff that we want rendered about the page here. */}
                    </div>
                </div>
            </div>
        )

    }
}

export default SingleItem;