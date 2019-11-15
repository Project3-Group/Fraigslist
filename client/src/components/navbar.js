//New Navbar
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
//import '../App.css';
import axios from 'axios'

import styled from 'styled-components';


class Navbar extends Component {

    logout = event => {
        event.preventDefault()
        // console.log('logging out')
        window.location.assign('/');
        axios.post('/api/user/logout').then(response => {
            // console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            // console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        // console.log('navbar render, props: ')
        // console.log(this.props);

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
                        <h1 className="App-title">Super Dope Free Market</h1>

                        <Link to="/cart" className="ml-auto">
                            <button className="header-cart">
                                <span className="mr-2">
                                    <img className="cartlog" src="https://png.pngtree.com/png_detail/20181017/flame-shopping-cart-icon-png-clipart_810185.png" />
                                </span>
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
  background-image: url("https://freefeast.info/wp-content/uploads//2013/07/navigationbar@2x1.png");
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  .cartlog {
    width: 60px !important;
    height: 30px !important;
  }
  .nav-link{
    color: var(--mainDark) !important;

  }
  .header-cart{
    background-color: var(--lightBlue);

  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
  
`;



export default Navbar