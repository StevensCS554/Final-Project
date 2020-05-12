import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth'
import axios from 'axios';
import $ from 'jquery';
import group from '../../images/group-bg.jpg';

export default function Gallery(props) {
   const { currentUser } = useContext(AuthContext);
   const [userGroup, setUserGroup] = useState(undefined);
   const [user, setUser] = useState(props.user);
   const [userGroups, setUserGroups] = useState(undefined);
   const [userOwnGroup, setUserOwnGroup] = useState(null);
   const [userProfile, setUserProfile] = useState(null);

   let li = null;

   useEffect(() => {
      async function getUrl() {
         try {
            const { data } = await axios.get(`http://localhost:4000/users/profile/${currentUser.displayName}`)
            const { url } = data;
            setUserProfile(url);
         } catch (e) {
            alert(e);
         }
      }
      getUrl();
      getGroups();
   }, []);

   const getGroups = async () => {
      try {
         const { data } = await axios.get(`http://localhost:4000/users/groups/${user.displayName}`);
         const { groups } = data;
         setUserGroups(groups);
      } catch (e) {
         console.log(e);
      }
   }

   const getUserGroup = async () => {
      try {
         const { data } = await axios.get(`http://localhost:4000/`)
      } catch (e) {
         console.log(e);
      }
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
                           <Link to='/userprofile/1'><p>CHANGE PROFILE</p></Link>
                        </div>
                     )}

                     {user && (
                        <div id='explore-gallery-sidebar-usergroup'>
                           <button onClick={() => handleToggle3()} className='click-to-reveal'>MY GROUP</button>
                           {userGroup && (
                              <div style={{ display: 'none' }} ref={toggle3Ref}>
                                 <p>Manage Your Group</p>
                                 <p>User Group</p>
                              </div>
                           )}
                           {!userGroup && (
                              <div style={{ display: 'none' }} ref={toggle3Ref}>
                                 <p>You don't have a group yet!</p>
                                 <Link to='/create-group/1'><button className='standard-btn'>CREATE YOUR OWN GROUP</button></Link>
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
                     <button onClick={() => handleToggle2()} className='click-to-reveal'>GROUPS WITHIN 07307</button>
                     <div style={{ display: 'none' }} ref={toggle2Ref}>
                        <ul>
                           <li>Group 1</li>
                           <li>Group 2</li>
                           <li>Group 3</li>
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
                  <div className='single-group'>
                     <img style={{ width: '100%', height: '100%' }} src={group} />
                     <div className='single-group-overlay'>
                        <p>group name dsf </p>
                     </div>
                  </div>
                  <div className='single-group'>
                     <img style={{ width: '100%', height: '100%' }} src={group} />
                     <div className='single-group-overlay'>
                        <p>group name dsf </p>
                     </div>
                  </div>
                  <div className='single-group'>
                     <img style={{ width: '100%', height: '100%' }} src={group} />
                     <div className='single-group-overlay'>
                        <p>group name dsf </p>
                     </div>
                  </div>
                  <div className='single-group'>
                     <img style={{ width: '100%', height: '100%' }} src={group} />
                     <div className='single-group-overlay'>
                        <p>group name dsf </p>
                     </div>
                  </div>
                  <div className='single-group'>
                     <img style={{ width: '100%', height: '100%' }} src={group} />
                     <div className='single-group-overlay'>
                        <p>group name dsf </p>
                     </div>
                  </div>
                  <div className='single-group'>
                     <img style={{ width: '100%', height: '100%' }} src={group} />
                     <div className='single-group-overlay'>
                        <p>group name dsf </p>
                     </div>
                  </div>
               </div>

            </div>

         </div>
      </div>
   )
}
