import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import profile from '../../images/team-bg.jpeg'

export default function Navigation() {
    const [isLoggedIn, setLoggedIn] = useState(true);

    return (
        <div className='navigation-bar'>
            <div id='navbar-logo'>
                <img src={logo} />
            </div>
            <div id='navbar-search'>
                <input type='text' placeholder='Search group name or username' /><button type='submit'>SEARCH</button>
            </div>
            <div id='navbar-link'>
                {!isLoggedIn &&
                    (<ul>
                        <li><Link to='/'><a href='#'>HOME</a></Link></li>
                        <li><a href='#' className='current'>EXPLORE</a></li>
                        <li><a href='#'>LOGIN</a></li>
                        <li><a href='#'>SIGNUP</a></li>
                    </ul>)}
                {isLoggedIn &&
                    (<div id='navbar-link-profile'>
                        <div>
                            <p>Welcome Back!</p><Link to='/userprofile/1'><img src={profile} /></Link>
                        </div>
                        <a href='#'>Logout</a>
                    </div>)}
            </div>
        </div>
    )
}
