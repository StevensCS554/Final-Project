import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

export default function Navigation() {
    return (
        <div className='navigation-bar'>
            <div id='navbar-logo'>
                <img src={logo} />
            </div>
            <div id='navbar-search'>
                <input type='text' placeholder='Search group name or username' /><button type='submit'>SEARCH</button>
            </div>
            <div id='navbar-link'>
                <ul>
                    <li><Link to='/'><a href='#'>HOME</a></Link></li>
                    <li><a href='#' className='current'>EXPLORE</a></li>
                    <li><a href='#'>LOGIN</a></li>
                    <li><a href='#'>SIGNUP</a></li>
                </ul>
            </div>
        </div>
    )
}
