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
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 NEWCLASSNAME">

                <header className="navbar App-header" id="nav-container">
                    <div className="col-12" >
                        {loggedIn ? (
                            <section className="section-header">
                                <div className="link-group">
                                    <Link to="/" className="btn outline btn-link text-secondary">
                                        <span className="text-secondary btn-black">Home</span>
                                    </Link>
                                    <Link to="/addItem" className="btn outline btn-link text-secondary">
                                        <span className="text-secondary btn-black">Add an Item</span>
                                    </Link>
                                    <Link to={'/useritems/' + this.props.userId} className='btn outline btn-link text-secondary'>
                                        <span className='text-secondary my-items btn-black'>My Items</span>
                                    </Link>
                                </div>
                                <div className="heading-groups">
                                    <img src={logo} className="App-logo" alt="logo" />
                                    <h1 className="App-title">Fraigslist</h1>
                                </div>
                                <div className="heading-groups" id='logout'>
                                    <Link to="#" className="btn outline btn-link text-secondary" onClick={this.logout}>
                                        <span className="text-secondary btn-black">Logout</span></Link>
                                        <span style={{opacity:'.5'}}>({this.props.username})</span>
                                </div>
                            </section>
                        ) : (
                                <section className="section-header">
                                    <Link to="/" className="btn outline btn-link text-secondary">
                                        <span className="text-secondary btn-black">Home</span>
                                    </Link>
                                    <div className=" align-items-right">
                                        <div id="top-filler"></div>
                                        <img src={logo} className="App-logo" alt="logo" />
                                        <h1 className="App-title scrolling-text">Fraigslist</h1>
                                    </div>
                                    <Link to="/login" className="btn outline btn-link text-secondary">
                                        <span className="text-secondary btn-black">Login</span>
                                    </Link>
                                    <Link to="/signup" className="btn outline btn-link">
                                        <span className="text-secondary btn-black">Sign-Up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
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