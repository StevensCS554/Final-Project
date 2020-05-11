import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultGroup from '../images/group-bg.jpg';
import profile from '../images/team-bg.jpeg';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';
import { AuthContext } from '../firebase/Auth';
// import Error from './utilities/Error';//404 component!

export default function Groupprofile(props) {
   const { currentUser } = useContext(AuthContext);
   const [groupData, setGroupData] = useState(undefined);
   const [isManager, setIsManager] = useState(false);
   const [isMember, setIsMember] = useState(false);
   // const [error, setError] = useState(undefined);

   useEffect(
      async () => {
         try {
            // alert(props.match.params.groupId);
            //get the group by groupId in the path.
            async function fetchGroupData() {
               try {
                  const group = await fetch(`http://localhost:4000/groups/${props.match.params.groupId}`, {
                     method: "GET",
                     headers: {
                        'Content-Type': 'application/json'
                     }
                  });
                  //TODO: error handle! 
                  //fetch function: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
                  // if(fetch.ok == false) throw `error`
                  return await group.json();
               } catch (e) {
                  throw e;
               }
            }
            const group = await fetchGroupData();
            setGroupData(group);// not update immidately

            //Authorization the current user for the manager role
            function managerAuthorization() {
               try {
                  const managerData = fetchUserData(group.managerId);
                  // alert(currentUser.email);//for User check: https://firebase.google.com/docs/reference/js/firebase.User#properties
                  if (managerData.email === currentUser.email) {
                     setIsManager(true);
                  }
               } catch (e) {
                  throw e;
               }
            }
            managerAuthorization();

            //Authorization the current user for the member role
            function membershipAuthorization() {
               try {
                  if (group.users === undefined)
                     return;
                  group.users.map((userId) => {
                     const user = fetchUserData(userId);
                     if (user.email === currentUser.email) {
                        setIsMember(true);
                        return;
                     }
                  })
               } catch (e) {
                  throw e;
               }
            }
            membershipAuthorization();
         } catch (e) {
            alert(e);
         }

      },
      [props.match.params.groupId, currentUser]
   );

   //get the user by userID in groupData
   async function fetchUserData(userId) {
      try {
         const user = await fetch(`http://localhost:4000/users/${userId}`, {
            method: "GET",
            headers: {
               'Content-Type': 'application/json'
            }
         });
         return await user.json();
      } catch (e) {
         throw e;
      }
   }

   // const managerName = async () {
   //    try {
   //       if (groupData && groupData.managerId) {
   //          const manager = await fetchUserData(groupData.managerId);
   //          return manager.username;
   //       }
   //       return "hard code";

   //    }catch(e){

   //    }
   // }

   // if (error) {
   //    return (
   //       <div>
   //          <Navigation />
   //          {error}
   //          <Footer />
   //       </div>
   //    )
   // } else {
   return (
      <div>
         <Navigation />
         <div id='group-profile'>
            <div id='group-profile-container'>

               {/* group member section */}
               <div id='group-member-list'>
                  <div id='group-manager'>
                     <img src={profile} />
                     <p>Group Manager: {groupData && groupData.managerId}</p>
                     {isManager ? (<Link>Change Group Setting</Link>) : (<a href='#'>MESSAGE</a>)}
                  </div>

                  {
                     groupData && groupData.users && groupData.users.map((userId) => {
                        const user = fetchUserData(userId);
                        return (
                           <div id='group-members'>
                              <div className='single-group-member'>
                                 <p>{user.username}</p>
                                 <img src={profile} />
                                 <div id='group-members-links'>
                                    <a href='#'>MESSAGE</a>
                                    {isManager && (<a href='#'>DELETE</a>)}
                                 </div>
                              </div>
                           </div>
                        )
                     })
                  }

               </div>

               <div id='group-info'>
                  {/* group info section */}
                  <div id='group-info-container'>
                     <div id='group-info-pic'>
                        <img src={defaultGroup} />
                     </div>
                     <div id='group-info-name'>
                        <p>Group Name: {groupData && groupData.groupName}</p>
                     </div>
                     <div id='group-info-notice'>
                        <p>Group Notice: {groupData && groupData.groupNotice}</p>
                     </div>
                  </div>

                  {/* group posts section */}
                  {
                     groupData && groupData.posts && groupData.posts.map((post) => {
                        // const newPost = {
                        //    _id: ObjectId(),
                        //    username: username,
                        //    content: content,
                        //    time: time
                        // };
                        return (
                           <div id='group-info-posts'>
                              <div className='single-posts'>
                                 <div id='group-info-posts-header'>
                                    <p>{post.time}} + {post.username}</p>
                                 </div>
                                 <div id='group-info-posts-content'>
                                    <p>{post.content}</p>
                                 </div>
                                 {isManager && (<div id='btn-wrapper'><button className='standard-btn'>DELETE POST</button></div>)}
                              </div>
                           </div>
                        )
                     })
                  }


                  {(isManager || isMember) && (
                     <div id='group-info-posts-area'>
                        <label htmlFor='post-area'>Write Something...</label>
                        <input type='text' id='post-area' />

                        <button className='standard-btn'>CREATE POST</button>
                     </div>)}

               </div>
            </div>
            {(!isManager && !isMember) && (
               <div id='join-group'>
                  <button className='standard-btn'>JOIN GROUP</button>
               </div>)}

         </div>
         <Footer />
      </div>
   )
   // }
}




