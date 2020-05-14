import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth'
import axios from 'axios';
import $ from 'jquery';

export default function Gallery(props) {
   const { currentUser } = useContext(AuthContext);
   const [user, setUser] = useState(props.user);
   const [zipCode, setZipCode] = useState(undefined);
   const [userGroups, setUserGroups] = useState(undefined);
   const [userOwnGroup, setUserOwnGroup] = useState(null);
   const [ownGroupId, setOwnGroupId] = useState(null);
   const [userProfile, setUserProfile] = useState(null);
   const [localGroups, setLocalGroups] = useState(null);
   const [allLocalGroups, setAllLocalGroups] = useState(null);
   const [numLeftOver, setNoLeftOver] = useState(1);
   const [pageNo, setPageNo] = useState(0);

   let li = null;
   let take = 6;
   let skip = 0;

   useEffect(() => {
      getUrl();
      getGroups();
      getUserGroup();
      getUserLocation();
      getLocalGroups(take, skip);
      getAllLocalGroups();
   }, [zipCode]);

   async function getUrl() {
      if (currentUser && currentUser.displayName) {
         try {
            const { data } = await axios.get(`http://localhost:4000/users/profile/${currentUser.displayName}`)
            const { url } = data;
            setUserProfile(url);
         } catch (e) {
            alert(`get url` + e);
         }
      }
   };

   const getGroups = async () => {
      if (user && user.displayName) {
         try {
            const { data } = await axios.get(`http://localhost:4000/users/groups/${user.displayName}`);
            const { groups } = data;
            setUserGroups(groups);
         } catch (e) {
            alert('get groups' + e);
         }
      }
   }

   const getUserGroup = async () => {
      if (user && user.displayName) {
         try {
            const { data } = await axios.get(`http://localhost:4000/groups/group/${user.displayName}`);
            const { groupName, groupId } = data;
            setUserOwnGroup(groupName);
            setOwnGroupId(groupId);
         } catch (e) {
            alert('get user group' + e);
         }
      }
   }

   const getLocalGroups = async (take, skip) => {
      try {
         if (zipCode) {
            const { data } = await axios.get(`http://localhost:4000/groups/local/${zipCode}?take=${take}&skip=${skip}`);
            const { groups, numLeftOver } = data;
            setLocalGroups(groups);
            setNoLeftOver(numLeftOver);
         }
      } catch (e) {
         alert(e);
      }
   }

   const getAllLocalGroups = async () => {
      try {
         if (zipCode) {
            const { data } = await axios.get(`http://localhost:4000/groups/local-groups/${zipCode}`);
            const { groups } = data;
            setAllLocalGroups(groups);
         }
      } catch (e) {
         alert(e);
      }
   }

   async function getUserLocation() {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(async position => {
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCTJckDGDyHM8cZ9R-PKUIQGHgfhoXzzFA`);
            const { results } = data;
            const z = results[0].address_components[6].short_name;
            setZipCode(z);
         }, error => {
            alert(error);
         })
      }
   };

   const handleNextPage = async () => {
      setPageNo(pageNo + 1);
      if (numLeftOver < 6)
         take = numLeftOver;
      skip += 6;
      getLocalGroups(take, skip);
   }

   const handlePrePage = async () => {
      setPageNo(pageNo - 1);
      take = 6;
      skip -= 6;
      getLocalGroups(take, skip);
   }

   const toggle1Ref = useRef();
   const toggle2Ref = useRef();
   const toggle3Ref = useRef();

   const handleToggle1 = () => {
      const el = toggle1Ref.current;
      $(el).slideToggle();
   }

   const handleToggle2 = () => {
      const el = toggle2Ref.current;
      $(el).slideToggle();
   }

   const handleToggle3 = () => {
      const el = toggle3Ref.current;
      $(el).slideToggle();
   }

   return (
      <div>
         <h1 style={{ display: "none" }}>error</h1>
         <div id='explore-gallery'>
            <div id='explore-gallery-sidebar'>
               <div id='to-scroll'>

                  <div id='explore-gallery-sidebar-profile'>
                     {user && (
                        <div id='explore-gallery-sidebar-profile-header'>
                           <img src={userProfile} />
                           <p>{user.displayName}</p>
                           <Link to={`/userprofile/${user.displayName}`}><p>CHANGE PROFILE</p></Link>
                        </div>
                     )}

                     {user && (
                        <div id='explore-gallery-sidebar-usergroup'>
                           <button onClick={() => handleToggle3()} className='click-to-reveal'>MY GROUP</button>
                           {userOwnGroup && (
                              <div style={{ display: 'none' }} ref={toggle3Ref}>
                                 <p>Manage Your Group</p>
                                 <Link to={`/group-profile/${ownGroupId}`}>{userOwnGroup}</Link>
                              </div>
                           )}
                           {!userOwnGroup && (
                              <div style={{ display: 'none' }} ref={toggle3Ref}>
                                 <p>You don't have a group yet!</p>
                                 <Link to={`/create-group/${user.displayName}`}><button className='standard-btn'>CREATE YOUR OWN GROUP</button></Link>
                              </div>
                           )}
                        </div>
                     )}

                     {user && (
                        <div id='explore-gallery-sidebar-usergroups'>
                           <button onClick={() => handleToggle1()} className='click-to-reveal'>THE GROUP YOU ARE IN</button>
                           <div style={{ display: 'none' }} ref={toggle1Ref}>
                              <ul>
                                 {userGroups && userGroups.map((group) => {
                                    return <Link to={`/group-profile/${group.groupId}`}><li key={group.groupId}>{group.groupName}</li></Link>
                                 })}
                              </ul>
                           </div>
                        </div>
                     )}

                  </div>

                  <div id='explore-gallery-sidebar-groups-list'>
                     <button onClick={() => handleToggle2()} className='click-to-reveal'>GROUPS WITHIN {zipCode && <span>{zipCode}</span>}</button>
                     <div style={{ display: 'none' }} ref={toggle2Ref}>
                        <ul>
                           {allLocalGroups && allLocalGroups.map((group) => {
                              return <Link to={`/group-profile/${group._id}`}><li key={group._id}>{group.groupName}</li></Link>
                           })}
                        </ul>
                     </div>
                  </div>

               </div>
            </div>

            <div id='explore-gallery-showcase'>
               <div id='explore-gallery-heading'>
                  <h1>CHOOSE GROUPS TO JOIN TODAY!</h1>
                  <div className='energy-bar'></div>
               </div>
               <div id='explore-gallery-groups'>
                  {localGroups && localGroups.map((group) => {
                     return (
                        <Link to={`/group-profile/${group._id}`}>
                           <div className='single-group'>
                              <img style={{ width: '100%', height: '100%' }} src={group.groupProfileUrl} />
                              <div className='single-group-overlay'>
                                 <p>{group.groupName}</p>
                              </div>
                           </div>
                        </Link>
                     )
                  })}
               </div>

               <div id='gallery-btn-area' style={{ textAlign: 'center' }}>
                  <div>
                     {pageNo > 0 && (
                        <button onClick={handlePrePage} className='standard-btn'>PREVIOUS PAGE</button>
                     )}
                  </div>
                  <div>
                     {numLeftOver > 0 && localGroups && localGroups.length !== 0 && (
                        <button onClick={handleNextPage} className='standard-btn'>NEXT PAGE</button>
                     )}
                  </div>
               </div>

            </div>
         </div>
      </div>
   )
}
