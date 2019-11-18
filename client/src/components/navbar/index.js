//New Navbar
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg';
//import '../App.css';
import axios from 'axios'
import './nav.css'
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
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 navCSS">

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-nav align-items-left">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                    <span className="text-secondary">Logout</span></Link>
                                <Link to="/" className="btn btn-link text-secondary">
                                    <span className="text-secondary">Home</span>
                                </Link>
                                <div className="navbar-nav align-items-right">
                                    <div id="top-filler"></div>
                                    <img src={logo} className="App-logo" alt="logo" />
                                    <h1 className="App-title scrolling-text">Fraigslist</h1>
                                </div>
                                <Link to="/addItem" className="btn outline btn-link text-secondary">
                                    <span className="text-secondary btn-black">Add an Item</span>
                                </Link>
                                <Link to={'/useritems/' + this.props.userId} className='btn btn-link'>
                                    <span className='text-secondary my-items'>My Items</span>
                                </Link>
                            </section>
                        ) : (
                                <section className="navbar-nav align-items-left">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Home</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Login</span>
                                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">Sign-Up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                    {/* <div className="navbar-nav align-items-right">
                        <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title scrolling-text">Super Dope Free Market</h1> */}

                        {/* <Link to="/cart" className="ml-auto">
                            <button className="header-cart">
                                <span className="mr-2">
                                    <img className="cartlog" src="https://png.pngtree.com/png_detail/20181017/flame-shopping-cart-icon-png-clipart_810185.png" alt="Shopping cart"/>
                                </span>
                                My Cart
          </button>
                        </Link> */}
                    {/* </div> */}
                </header>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  .scrolling-text {}
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }

  .nav-link{
    color: var(--mainDark) !important;

  }

  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
  
`;



export default Navbar