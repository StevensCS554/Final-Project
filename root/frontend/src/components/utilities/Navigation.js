import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import getProfile from './getProfile';
import axios from 'axios';
import logo from '../../images/logo.png';
import { AuthContext } from '../../firebase/Auth';
// import profile from '../../images/team-bg.jpeg'
import { doSignOut } from '../../firebase/FirebaseFunctions';

export default function Navigation() {
   const { currentUser } = useContext(AuthContext);
   const [userProfile, setUserProfile] = useState(null);

   useEffect(() => {
      getUrl();
   }, []);

   async function getUrl() {
      if (currentUser && currentUser.displayName) {
         try {
            const { data } = await axios.get(`http://localhost:4000/users/profile/${currentUser.displayName}`)
            const { url } = data;
            setUserProfile(url);
         } catch (e) {
            alert(e);
         }
      }
   }

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
                     <p>Welcome {currentUser.displayName}!</p><Link to='/userprofile/1'><img src={userProfile} /></Link>
                  </div>

                  <div id='div2'>
                     <div>
                        <Link to='/explore'>EXPLORE</Link>
                     </div>
                     <div>
                        <a href='#' onClick={() => {
                           doSignOut();
                           window.location.href = 'http://localhost:3000';
                        }} >LOGOUT</a>
                     </div>
                  </div>

               </div>)
            }

         </div>
      </div>
   )
}
