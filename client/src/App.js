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


class App extends Component {
  state = {
    loggedIn: false,
    username: null,
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
        console.log(response.data.user);
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id
        })
      } else {
        console.log('Get user: no user');
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
            <p>Hello, {this.state.username}!</p>
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
