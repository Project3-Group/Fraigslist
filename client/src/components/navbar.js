import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
//import '../App.css';
import axios from 'axios'
import styled from 'styled-components';


class Navbar extends Component {

    logout = event => {
        event.preventDefault()
        console.log('logging out')
        axios.post('/api/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

        return (
            <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">              

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-nav align-items-left">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                    <span className="text-secondary">logout</span></Link>
                                <Link to="/" className="btn btn-link text-secondary">
                                    <span className="text-secondary">home</span>
                                </Link>
                                <Link to="/addItem" className="btn btn-link text-secondary">
                                    <span className="text-secondary">Add an Item</span>
                                </Link>
                                <Link to={'/useritems/' + this.props.userId} className='btn btn-link'>
                                    <span className='text-secondary my-items'>My Items</span>
                                </Link>
                            </section>
                        ) : (
                                <section className="navbar-nav align-items-left">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">login</span>
                                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">sign up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                    <div className="navbar-nav align-items-right">
                        <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">MERN Passport</h1>

                        <Link to='/cart' className="ml-auto">
                            <button>
                                <i className="fas fa-cart-plus" />
                                my cart
                            </button>
                        </Link>
                    </div>
                </header>
                </NavWrapper>

        );

    }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
`;

export default Navbar