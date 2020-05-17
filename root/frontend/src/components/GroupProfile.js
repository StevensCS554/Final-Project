import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultGroup from '../images/group-bg.jpg';
import profile from '../images/team-bg.jpeg';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';
import { AuthContext } from '../firebase/Auth';

export default function Groupprofile(props) {
   const { currentUser } = useContext(AuthContext);

   const [groupData, setGroupData] = useState(undefined);
   const [isManager, setIsManager] = useState(false);
   const [isMember, setIsMember] = useState(false);
   const [manager, setManager] = useState(undefined);
   const [memberList, setMemberList] = useState(undefined);

   useEffect(() => {
      async function groupProfile() {
         try {
            const group = await fetchGroupData();
            setGroupData(group);// not update immidately

            const users = await fetchAllMeberData(group);
            setMemberList(users);

            await managerFetchAndAuthorization(group);
            await membershipAuthorization(group);
         } catch (e) {
            alert(e);
         }
      }
      groupProfile();
   }, [props.match.params.groupId, currentUser, isMember]
   );

   //get the group by groupId in the path.
   async function fetchGroupData() {
      try {
         const group = await fetch(`http://localhost:4000/groups/${props.match.params.groupId}`, {
            method: "GET",
            credentials: "include",
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //error handle! 
         //fetch function: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
         if (!group.ok)
            throw `error in group info fetching`;
         return await group.json();
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`;
      }
   }

   //get the user by userID in groupData
   async function fetchUserData(userId) {
      try {
         // alert(`fetch for the user with id: ${userId}`);
         const user = await fetch(`http://localhost:4000/users/getbyid/${userId}`, {
            method: "GET",
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //: error handle! 
         if (user.ok === false)
            throw `error in user info fetching: ${userId}`
         const resolved = await user.json();
         // alert(resolved.email);
         return resolved;
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
      }
   }

   //get the memberlist from users array in groupdata
   async function fetchAllMeberData(group) {
      try {
         const userList = [];
         // alert(group.users.length);
         for (const userId of group.users) {
            let userData = await fetchUserData(userId);
            userList.push(userData);
         }
         return userList;
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`;
      }
   }

   //Authorization the current user for the manager role
   async function managerFetchAndAuthorization(group) {
      try {
         let managerData = await fetchUserData(group.managerId);
         setManager(managerData);
         // alert(currentUser.email);//for User check: https://firebase.google.com/docs/reference/js/firebase.User#properties
         if (managerData.username === currentUser.displayName) {
            setIsManager(true);
         }
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
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
         window.location.href = `http://localhost:3000/error/${e}`
      }
   }

   //creat an new post in group
   async function handleCreatPost(e) {
      e.preventDefault();
      try {
         const { postContent } = e.target.elements;
         const time = new Date().toUTCString();
         const Result = await fetch(`http://localhost:4000/groups/post/${groupData._id}`, {
            method: "POST",
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({// createPost(groupId, username, content, time)
               username: currentUser.displayName,
               content: postContent.value.trim(),
               time: time
            })
         });
         //error handle! 
         if (!Result.ok) {
            throw `fail to create post! status:${Result.status}, statusText:${Result.statusText} message: ${await Result.json().then((error) => {
               return error;
            })}`
         }
         //TODO: refresh:
         const group = await fetchGroupData();
         setGroupData(group);
         postContent.value = "";
         return;
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
      }
   }

   //delete the post in group
   async function handleDeletePost(postId) {
      try {
         const Result = await fetch(`http://localhost:4000/groups/post/${groupData._id}/${postId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //error handle! 
         if (!Result.ok) {
            throw `fail to delete post! status:${Result.status}, statusText:${Result.statusText} message: ${await Result.json().then((error) => {
               return error;
            })}`
         }
         document.getElementById(postId).style.display = "none";
         return;
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
      }
   }

   //add the current user to the group:
   async function handleJoinGroup(email) {
      // alert("handleJoinGroup with: " + email);
      try {
         let user = await fetch(`http://localhost:4000/users/getuserbyemail/${email}`, {
            method: "GET",
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         if (user.ok === false) {
            throw `fail to find user${await user.json().then((error) => {
               return error;
            })}`
         }
         user = await user.json();

         const groupResult = await fetch(`http://localhost:4000/groups/${groupData._id}/${user._id}`, {
            method: "POST",
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //error handle! 
         if (!groupResult.ok) {
            throw `Fail to add user to group! status:${groupResult.status}, statusText:${groupResult.statusText} message:${await groupResult.json().then((error) => {
               return error.error;
            })}`
         }

         //already did in the groupResult fetch route's function!         //redundancy:
         // const userResult = await fetch(`http://localhost:4000/users/${user._id}/${groupData._id}`, {
         //    method: "POST",
         //    headers: {
         //       'Content-Type': 'application/json'
         //    }
         // });
         // //error handle! 
         // if (userResult.ok == false) {
         //    throw `fail to add group to user ${await userResult.json().then((error) => {
         //       return error;
         //    })}`
         // }
         setIsMember(true);
         return;
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
      }
   }

   //remove member from group
   async function handleMemberDelete(userId) {
      try {
         // alert("handleMemberDelete groupData._id: " + `http://localhost:4000/groups/${groupData._id}/${userId}`);
         const groupResult = await fetch(`http://localhost:4000/groups/${groupData._id}/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //error handle! 
         if (groupResult.ok === false) {
            throw `fail to delete user from group! status:${groupResult.status}, statusText:${groupResult.statusText} message: ${await groupResult.json().then((error) => {
               return error;
            })}`
         }

         const userResult = await fetch(`http://localhost:4000/users/${userId}/${groupData._id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         //error handle! 
         if (userResult.ok === false) {
            throw `fail to delete group from user! status:${userResult.status}, statusText:${userResult.statusText} message: ${await userResult.json().then((error) => {
               return error;
            })}`
         }

         document.getElementById(userId).style.display = "none";
         return;
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
      }
   }

   const groupActionButton = () => {
      if (!isManager && !isMember)
         return (
            <div id='join-group'>
               <button className='standard-btn' onClick={() => handleJoinGroup(currentUser.email)}>JOIN GROUP</button>
            </div>);
      else if (isMember)
         return (
            <div id='leave-group'>
               <button className='standard-btn' onClick={() => alert(`are you sure? please contact the manager by message button`)}>LEAVE GROUP</button>
            </div>);
      else
         // return (
         //    <div id='delete-group'>
         //       <button className='standard-btn' onClick={() => alert(`are you sure? DELETE is not revertabel!`)}>DELETE THE Whole GROUP</button>
         //    </div>);
         return;
   }

   const createChatHref = (chatUserName) => {
      if (chatUserName) {
         let roomName = [currentUser.displayName, chatUserName];
         return 'localhost:3000/chat/' + roomName.sort().join('');
      }
   };

   return (
      <div>
         <Navigation />
         <div id='group-profile'>
            <div id='group-profile-container'>

               {/* group member section */}
               <div id='group-member-list'>
                  {manager && (
                     <div id='group-manager'>
                        <Link to={`/userprofile/${manager.username}`}>
                           <img src={(manager && manager.profileUrl) || profile} alt="manager avatar" />
                           <p>Group Manager: {manager && manager.username}</p>
                        </Link>
                        {isManager ? (<Link to={`/edit-group/${manager._id}`} >Change Group Setting</Link>) : (<a href={createChatHref(manager && manager.username)} target='_blank'>MESSAGE</a>)}
                     </div>
                  )}

                  {/* group member list*/}
                  <div className='group-members'>
                     {memberList && memberList.map((user) => {
                        return (
                           <div id={user._id} className='single-group-member'>
                              <Link to={`/userprofile/${user.username}`}>
                                 <p>{user.username}</p>
                                 <img src={(user && user.profileUrl) || profile} alt="user avatar" />
                              </Link>
                              <div id='group-members-links'>
                                 <a href={createChatHref(user.username)} target='_blank'>MESSAGE</a>
                                 {isManager && (<a href='#' onClick={() => handleMemberDelete(user._id)}>DELETE</a>)}
                              </div>
                           </div>
                        );
                     })
                     }
                  </div>
               </div>

               <div id='group-info'>
                  {/* group info section */}
                  <div id='group-info-container'>
                     <div id='group-info-pic'>
                        <img src={(groupData && groupData.groupProfileUrl) || defaultGroup} alt="group avatar" />
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
                              <div className='single-posts' id={post._id}>
                                 <div id='group-info-posts-header'>
                                    <span className=""> Time:{post.time} </span>
                                    <span className=""> Post by:{post.username} </span>
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
                     (isManager || isMember) && (
                        <form onSubmit={handleCreatPost}>
                           <div id='group-info-posts-area'>
                              <label htmlFor='post-area'>Write Something...</label>
                              <textarea type='text' id='post-area' required name='postContent' />

                              <button className='standard-btn' type='submit' >CREATE POST</button>
                           </div>
                        </form>)
                  }

               </div>
            </div>

            {/* "join OR leave Or delete BUTTON" */}
            {groupActionButton()}

         </div>
         <Footer />
      </div>
   )
}