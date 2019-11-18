import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// components
import Signup from './pages/sign-up';
import LoginForm from './pages/login-form';
import Home from './pages/home';
import AddItem from './pages/additem';
import SingleItem from './pages/singleItem';
import NoMatch from './pages/no-match';
import UserItems from './pages/useritems';
import EditItem from './pages/edititem';

import Cart from './pages/MyCart'

import Navbar from './components/navbar'

import './App.css'


class App extends Component {
  state = {
    loggedIn: false,
    username: null,
    money_made: 0,
    id: null
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser = userObject => {
    this.setState(userObject)
  }

  getUser = () => {
    axios.get('/api/user/').then(response => {
      if (response.data.user) {

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          money_made: response.data.user.money_made,
          id: response.data.user._id
        })
      } else {
        // console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar updateUser={this.updateUser} userId={this.state.id} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn &&
            <p>Hello, {this.state.username}! You've made ${this.state.money_made}!</p>
          }
          {/* Routes to different components */}
          <div>
            <Switch>
              <Route exact path="/" component={Home} />

              {this.state.loggedIn &&
                <Route exact path="/addItem" component={AddItem} />
              }

              <Route exact path="/useritems/:id" component={UserItems} />

              <Route exact path="/edititem/:id" component={EditItem} />

              <Route path='/items/:id' component={SingleItem} />

              <Route
                path="/login"
                render={() =>
                  <LoginForm
                    updateUser={this.updateUser}
                  />}

              />

              <Route
                path="/signup"
                render={() =>
                  <Signup
                    updateUser={this.updateUser}
                  />}
              />
               
              <Route path="/cart" component={Cart} />

              <Route component={NoMatch} />

            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
