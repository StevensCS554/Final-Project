import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import profile from '../../images/team-bg.jpeg';

export default function Gallery() {
   const [userGroup, setUserGroup] = useState(undefined);
   const toggle1Ref = useRef();
   const toggle2Ref = useRef();
   const toggle3Ref = useRef();

   const handleToggle1 = () => {
      const el = toggle1Ref.current;
      console.log(el);
      $(el).slideToggle();
   }

   const handleToggle2 = () => {
      const el = toggle2Ref.current;
      console.log(el);
      $(el).slideToggle();
   }

   const handleToggle3 = () => {
      const el = toggle3Ref.current;
      console.log(el);
      $(el).slideToggle();
   }

   return (
      <div id='explore-gallery'>

         <div id='explore-gallery-sidebar'>
            <div id='to-scroll'>
               <div id='explore-gallery-sidebar-profile'>
                  <div id='explore-gallery-sidebar-profile-header'>
                     <img src={profile} />
                     <p>Username</p>
                     <Link to='/userprofile/1'><p>CHANGE PROFILE</p></Link>
                  </div>
                  <div id='explore-gallery-sidebar-usergroup'>
                     <button onClick={() => handleToggle3()} className='click-to-reveal'>MY GROUP</button>
                     {userGroup && (
                        <div style={{display: 'none'}} ref={toggle3Ref}>
                           <p>Manage Your Group</p>
                           <p>User Group</p>
                        </div>
                     )}
                     {!userGroup && (
                        <div style={{display: 'none'}} ref={toggle3Ref}>
                           <p>You don't have a group yet!</p>
                           <Link to='/create-group/1'><button className='standard-btn'>Create Your Own Group</button></Link>
                        </div>
                     )}
                  </div>

                  <div id='explore-gallery-sidebar-usergroups'>
                     <button onClick={() => handleToggle1()} className='click-to-reveal'>The groups you are in</button>
                     <div style={{display: 'none'}} ref={toggle1Ref}>
                        <ul>
                           <li><Link to='/group-profile/1'>Group 1</Link></li>
                           <li>Group 2</li>
                           <li>Group 3</li>
                        </ul>
                     </div>

                  </div>
               </div>

               <div id='explore-gallery-sidebar-groups-list'>
                  <button onClick={() => handleToggle2()} className='click-to-reveal'>Groups within 07307</button>
                  <div style={{display: 'none'}} ref={toggle2Ref}>
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

            </div>
         </div>

      </div>
   )
}
