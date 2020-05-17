import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import axios from 'axios';
import { AuthContext } from '../../firebase/Auth';
import { doSignOut } from '../../firebase/FirebaseFunctions';

export default function Navigation() {
   const { currentUser } = useContext(AuthContext);
   const [userProfile, setUserProfile] = useState(null);
   const [query, setQuery] = useState(null);

   useEffect(() => {
      console.log(currentUser);
      getUrl();
   }, [query]);

   async function getUrl() {
      if (currentUser && currentUser.displayName) {
         try {
            const { data } = await axios.get(`http://localhost:4000/users/profile/${currentUser.displayName}`, {
               withCredentials: true
            })
            const { url, auth } = data;
            if (auth === 'unauth') {
               await doSignOut();
               return;
            }
            setUserProfile(url);
         } catch (e) {
            alert(e);
         }
      }
   }
   const handleSearch = () => {
      const item = document.querySelector('#search-item').value.trim();
      if (item.length === 0)
         document.querySelector('#search-btn').disabled = true;
      else {
         document.querySelector('#search-btn').disabled = false;
         setQuery(item);
         window.location.href = `http://localhost:3000/search-results/${item}`;
      }
   }

   const handleSignOut = async () => {
      try {
         await axios.get('http://localhost:4000/users/logout', {
            withCredentials: true
         });
         await doSignOut();
         window.location.href = 'http://localhost:3000';
      } catch(e) {
         window.location.href = `http://localhost:3000/error/${e}`;
      }
   }

   return (
      <div className='navigation-bar'>
         <div id='navbar-logo'>
            <img src={logo} alt="logo" />
         </div>
         <div id='navbar-search'>
            <input id='search-item' type='text' placeholder='Search group name or username' /><button id='search-btn' type='submit' onClick={handleSearch} >SEARCH</button>
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
                     <p>Welcome {currentUser.displayName}!</p><Link to={`/userprofile/${currentUser.displayName}`}><img src={userProfile} alt="userProfile"/></Link>
                  </div>

                  <div id='div2'>
                     <div>
                        <Link to='/explore'>EXPLORE</Link>
                     </div>
                     <div>
                        <a href='#' onClick={handleSignOut} >LOGOUT</a>
                     </div>
                  </div>

               </div>)
            }

         </div>
      </div>
   )
}
