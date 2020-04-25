import React from 'react';
import logo from '../images/logo.png';

const Landing = () => {
    return (
        <div id="landing">
            <div id='navbar'>
                <nav>
                    <a id='logo-link' href='#'><img id='logo' src={logo} alt='company logo' /></a>
                    <ul>
                        <li><a href='#' className='current'>Home</a></li>
                        <li><a href='#'>About</a></li>
                        <li><a href='#'>Login</a></li>
                        <li><a href='#'>Sigup</a></li>
                    </ul>
                </nav>

                <div id='header-content'>
                    <h1>A New Way of life</h1>
                    <p>some text bla bla</p>
                    <a href='#'>Get Started Now!</a>
                </div>
            </div>
        </div>
    )
}

export default Landing;