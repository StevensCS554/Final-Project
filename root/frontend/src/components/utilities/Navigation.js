import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { AuthContext } from '../../firebase/Auth';
import profile from '../../images/team-bg.jpeg'
import { doSignOut } from '../../firebase/FirebaseFunctions';

export default function Navigation() {
   const { currentUser } = useContext(AuthContext);


   return (
      <div className='navigation-bar'>
         <div id='navbar-logo'>
            <img src={logo} />
         </div>
         <div id='navbar-search'>
            <input type='text' placeholder='Search group name or username' /><button type='submit'>SEARCH</button>
         </div>
         <div id='navbar-link'>
            {!currentUser &&
               (<ul>
                  <li><Link to='/'>HOME</Link></li>
                  <li><Link to='/explore'>EXPLORE</Link></li>
                  <li><Link to='/login'>LOGIN</Link></li>
                  <li><Link to='/signup'>SIGNUP</Link></li>
               </ul>)}
            {currentUser &&
               (<div id='navbar-link-profile'>
                  <div id='div1'>
                     <p>Welcome Back!</p><Link to='/userprofile/1'><img src={profile} /></Link>
                  </div>

                  <div id='div2'>
                     <div>
                        <Link to='/explore'>EXPLORE</Link>
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
                        <div id='signout-button'>
                           <button onClick={() => {
                              doSignOut()
                              alert('success logout')
                           }}>Yes</button>
                        </div>
                        <div id='logout-pupup-btns-y'>
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
