import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// components
import Signup from './pages/sign-up'
import LoginForm from './pages/login-form'
import Home from './pages/home'
import AddItem from './pages/additem'
import SingleItem from './pages/singleItem'
import NoMatch from './pages/no-match'

import Navbar from './components/navbar'


class App extends Component {
  state = {
    loggedIn: false,
    username: null
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser = userObject => {
    this.setState(userObject)
  }

  getUser = () => {
    axios.get('/api/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log(response.data.user);
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
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
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn &&
            <p>Join the party, {this.state.username}!</p>
          }
          {/* Routes to different components */}
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
            {this.state.loggedIn && 
              <Route exact path="/addItem" component={AddItem} />
            }

              <Route exact path='/items/:id' component={SingleItem} />

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
                  <Signup />}
              />

              <Route component={NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>


      </div>
    );
  }
}

export default App;
