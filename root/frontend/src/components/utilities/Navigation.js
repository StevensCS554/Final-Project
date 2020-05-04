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
                  <div id='div1'>
                     <p>Welcome Back!</p><Link to='/userprofile/1'><img src={profile} /></Link>
                  </div>

                  <div id='div2'>
                     <div>
                        <Link to='/explore'><a href='#'>EXPLORE</a></Link>
                     </div>
                     <div>
                        <a href='#' onClick={() => {
                           const logout = document.querySelector('#logout-pupup');
                           logout.style.opacity = '1';
                        }} >LOGOUT</a>
                     </div>
                  </div>

                  {/* logout pupup form */}
                  <div id='logout-pupup'>
                     <p>Are you sure to logout?</p>
                     <div id='logout-pupup-btns'>
                        <div id='logout-pupup-btns-y'>
                           <button onClick={() => {
                              const logout = document.querySelector('#logout-pupup');
                              logout.style.opacity = '0';
                           }}>Yes</button>
                        </div>
                        <div id='logout-pupup-btns-n'>
                           <button onClick={() => {
                              const logout = document.querySelector('#logout-pupup');
                              logout.style.opacity = '0';
                           }}>No</button>
                        </div>
                     </div>
                  </div>
               </div>)
            }

         </div>
      </div>
   )
}
