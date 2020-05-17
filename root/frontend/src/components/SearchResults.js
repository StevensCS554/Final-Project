import React, { useState, useEffect } from 'react';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { doSignOut } from '../firebase/FirebaseFunctions';


export default function SearchResults(props) {
   const [user, setUser] = useState(null);
   const [groups, setGroups] = useState(null);

   useEffect(() => {
      getSearchResult();
   }, [])

   async function getSearchResult() {
      try {
         const { data } = await axios.get(`http://localhost:4000/users/search/${props.match.params.query}`,
            { withCredentials: true }
         );
         const { result, auth } = data;
         if (auth === 'unauth') {
            await doSignOut();
            return;
         }
         const { groupsInfo, userInfo } = result
         setUser(userInfo);
         setGroups(groupsInfo);
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
      }
   }

   return (
      <div>
         <Navigation />
         <div id='search-results'>
            <div id='search-results-user'>
               {user && (
                  <Link to={`/userprofile/${user.username}`}>
                     <img src={user.profileUrl} alt="user profile url"/>
                     <p>username: {user.username}</p>
                  </Link>
               )}
               {!user && (
                  <div>
                     <h1>No user results found</h1>
                  </div>
               )}
            </div>
            <div id='search-results-group'>
               {groups && groups.map((group => {
                  return <Link to={`/group-profile/${group._id}`}>
                     <div className='single-group'>
                        <img src={group.groupProfileUrl} alt="group profile url"/>
                        <div className='single-group-overlay'>
                           <p>{group.groupName}</p>
                        </div>
                     </div>
                  </Link>
               }))}
               {groups && groups.length === 0 && (
                  <div>
                     <h1>No groups results found</h1>
                  </div>
               )}
            </div>
         </div>
         <Footer />
      </div>
   )
}
