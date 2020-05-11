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
   const [isManager, setIsManager] = useState(true);
   const [isMember, setIsMember] = useState(false);
   const [manager, setManager] = useState(undefined);
   // const [error, setError] = useState(undefined);

   useEffect(
      async () => {
         try {
            const group = await fetchGroupData();
            setGroupData(group);// not update immidately

            await managerAuthorization(group);

            await membershipAuthorization(group);
         } catch (e) {
            alert(e);
         }

      },
      [props.match.params.groupId, currentUser, isMember]
   );

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
         if (group.ok == false) throw `error in group info fetching`
         return await group.json();
      } catch (e) {
         throw e;
      }
   }

   //get the user by userID in groupData
   async function fetchUserData(userId) {
      try {
         const user = await fetch(`http://localhost:4000/users/${userId}`, {
            method: "GET",
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //TODO: error handle! 
         if (user.ok == false) throw `error i user info fetching`
         return await user.json();
      } catch (e) {
         throw e;
      }
   }

   //Authorization the current user for the manager role
   async function managerAuthorization(group) {
      try {
         const managerData = await fetchUserData(group.managerId);
         setManager(managerData);
         // alert(currentUser.email);//for User check: https://firebase.google.com/docs/reference/js/firebase.User#properties
         if (managerData.email === currentUser.email) {
            setIsManager(true);
         }
      } catch (e) {
         throw e;
      }
   }

   //Authorization the current user for the member role
   async function membershipAuthorization(group) {
      try {
         if (group.users === undefined)
            return;
         group.users.map(async (userId) => {
            const user = await fetchUserData(userId);
            if (user.email === currentUser.email) {
               setIsMember(true);
               return;
            }
         })
      } catch (e) {
         throw e;
      }
   }

   async function handleMemberDelete(userId) {
      alert("handleMemberDelete route may not finished yet");
      try {
         const deleteResult = await fetch(`http://localhost:4000/${groupData._id}/${userId}`, {
            method: "DELETE",
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //error handle! 
         if (deleteResult.ok == false) {
            throw `fail to delete user`
         }
         else {
            document.getElementById(userId).style.display = "none";
         }
         return;
      } catch (e) {
         throw e;
      }
   }

   async function handleJoinGroup(userId) {
      // `http://localhost:4000/users/${groupId}/${userId}`
      alert("handleJoinGroup" + userId);
      try {
         const joinResult = await fetch(`http://localhost:4000/${groupData._id}/${userId}`, {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //error handle! 
         if (joinResult.ok == false) {
            throw `fail to delete user`
         }
         setIsMember(true);
         return;
      } catch (e) {
         throw e;
      }
   }

   async function handleCreatPost(e) {
      alert("handleCreatPost");
      // try {
      //    const { postContent } = e.target.elements;
      //    const time = "Just Now(Hard Code)";
      //    const joinResult = await fetch(`http://localhost:4000/${groupData._id}/post/`, {
      //       method: "POST",
      //       headers: {
      //          'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({
      //          postContent: postContent,
      //          time: time
      //       })
      //    });
      //    //error handle! 
      //    if (joinResult.ok == false) {
      //       throw `fail to delete user`
      //    }
      //    setIsMember(true);
      //    return;
      // } catch (e) {
      //    throw e;
      // }
   }

   async function handleDeletePost(postId) {
      alert("handleDeletePost" + postId);
      // try {
      //    const { postContent } = e.target.elements;
      //    const time = "Just Now(Hard Code)";
      //    const Result = await fetch(`http://localhost:4000/${groupData._id}/post`, {
      //       method: "DELETE",
      //       headers: {
      //          'Content-Type': 'application/json'
      //       }
      //    });
      //    //error handle! 
      //    if (Result.ok == false) {
      //       throw `fail to delete Post`
      //    }
      //    setIsMember(true);
      //    return;
      // } catch (e) {
      //    throw e;
      // }
   }


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
                     <p>Group Manager: {manager && manager.username}</p>
                     {isManager ? (<Link to='/edit-group/:userId' >Change Group Setting</Link>) : (<a href='#'>MESSAGE</a>)}
                  </div>

                  {
                     groupData && groupData.users && groupData.users.map((userId) => {
                        const user = fetchUserData(userId);
                        return (
                           <div id={userId} className='group-members'>
                              <div className='single-group-member'>
                                 <p>{user.username}</p>
                                 <img src={profile} />
                                 <div id='group-members-links'>
                                    <a href='#'>MESSAGE</a>
                                    {isManager && (<a href='#' onClick={() => handleMemberDelete(userId)}>DELETE</a>)}
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
                  <div id="group-info-posts">
                     {
                        groupData && groupData.posts && groupData.posts.map((post) => {
                           // const newPost = {
                           //    _id: ObjectId(),
                           //    username: username,
                           //    content: content,
                           //    time: time
                           // };
                           return (
                              <div className='single-posts'>
                                 <div id='group-info-posts-header'>
                                    <p>{post.time} + {post.username}</p>
                                 </div>
                                 <div id='group-info-posts-content'>
                                    <p>{post.content}</p>
                                 </div>
                                 {isManager && (<div id='btn-wrapper'><button className='standard-btn' onClick={() => handleDeletePost(post._id)}>DELETE POST</button></div>)}
                              </div>
                           )
                        })
                     }
                  </div>

                  {
                     (isManager || isMember) &&
                     (
                        <form onSubmit={(e) => handleCreatPost(e)}>
                           <div id='group-info-posts-area'>
                              <label htmlFor='post-area'>Write Something...</label>
                              <input type='text' id='post-area' required name='postContent' />

                              <button className='standard-btn' onClick={() => handleCreatPost()}>CREATE POST</button>
                           </div>
                        </form>
                     )
                  }

               </div>
            </div>

            {(!isManager && !isMember) && (
               <div id='join-group'>
                  <button className='standard-btn' onClick={() => handleJoinGroup()}>JOIN GROUP</button>
               </div>)}

         </div>
         <Footer />
      </div>
   )
}




