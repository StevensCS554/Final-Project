// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import defaultGroup from '../images/group-bg.jpg';
// import profile from '../images/team-bg.jpeg';
// import Navigation from './utilities/Navigation';
// import Footer from './utilities/Footer';

// export default function Groupprofile() {
//    const [isManager, setIsManager] = useState(true);
//    const [isMember, setIsMember] = useState(true);

//    return (
//       <div>
//          <Navigation />
//          <div id='group-profile'>
//             <div id='group-profile-container'>

//                {/* group member section */}
//                <div id='group-member-list'>
//                   <div id='group-manager'>
//                      <img src={profile} />
//                      <p>Group Manager: username</p>
//                      {isManager ? (<Link>Change Group Setting</Link>) : (<a href='#'>MESSAGE</a>)}
//                   </div>

//                   <div id='group-members'>
//                      <div className='single-group-member'>
//                         <p>Member 1</p>
//                         <img src={profile} />
//                         <div id='group-members-links'>
//                            <a href='#'>MESSAGE</a>
//                            {isManager && (<a href='#'>DELETE</a>)}
//                         </div>
//                      </div>

//                   </div>
//                </div>

//                <div id='group-info'>
//                   {/* group info section */}
//                   <div id='group-info-container'>
//                      <div id='group-info-pic'>
//                         <img src={defaultGroup} />
//                      </div>
//                      <div id='group-info-name'>
//                         <p>Group Name</p>
//                      </div>
//                      <div id='group-info-notice'>
//                         <p>Group Notice</p>
//                      </div>
//                   </div>

//                   {/* group posts section */}
//                   <div id='group-info-posts'>
//                      <div className='single-posts'>
//                         <div id='group-info-posts-header'>
//                            <p>Time + User who posted it</p>
//                         </div>
//                         <div id='group-info-posts-content'>
//                            <p>Some content</p>
//                         </div>
//                         {isManager && (<div id='btn-wrapper'><button className='standard-btn'>DELETE POST</button></div>)}
//                      </div>
//                   </div>

//                   {(isManager || isMember) && (
//                   <div id='group-info-posts-area'>
//                      <label htmlFor='post-area'>Write Something...</label>
//                      <input type='text' id='post-area' />
                     
//                      <button className='standard-btn'>CREATE POST</button>
//                   </div>)}  
                  

//                </div>
//             </div>
//             {(!isManager && !isMember) && (
//                <div id='join-group'>
//                   <button className='standard-btn'>JOIN GROUP</button>
//                </div>)}

//          </div>
//          <Footer />
//       </div>
//    )
// }
