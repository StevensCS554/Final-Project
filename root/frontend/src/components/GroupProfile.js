import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultGroup from '../images/group-bg.jpg';
import profile from '../images/team-bg.jpeg';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';
import { AuthContext } from '../firebase/Auth';

export default function GroupProfile() {
    const [groupData, setGroupData] = useState(undefined);
    const [manager, setManager] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [isManager, setIsManager] = useState(true);
    const [isMember, setIsMember] = useState(true);
    const { currentUser } = useContext(AuthContext);
    useEffect(
        () => {
            async function fetchGroupsData() {
                try {
                    const { groups } = await axios.get(`http://localhost:4000/groups/`);
                    setGroupData(groups);
                } catch (e) {
                    setError(e);
                }
            }
            async function fetchGroupManager() {
                try {
                    const managerInfo = await axios.get(`http://localhost:4000/users/` + groupData.managerId);
                    setManager(managerInfo);
                } catch (e) {
                    setError(e);
                }
            }
            fetchGroupsData();
            fetchGroupManager();
        },
        []
    );

    const handleMemberDelete = async (userId) => {
        try {
            await fetch(`http://localhost:4000/groups/` + groupData._id + userId, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            setError(error);
        }
    }

    const handleJoinGroup = (userId) => {
        try {
            //related to the backend handle. for now i just call route in groups router. then we can handle both user and group join function in there.
            await fetch(`http://localhost:4000/groups/join` + groupData._id, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    groupId: groupData._id
                })
            });
        } catch (e) {
            setError(error);
        }
    }

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
                            {isManager ? (<Link>Change Group Setting</Link>) : (<a href='#'>MESSAGE</a>)}
                        </div>

                        {error && <h1 className='error'>{error}</h1>}
                        <div id='group-members'>
                            {groupData &&
                                groupData.user.map((userId) => {
                                    return (
                                        <div className='single-group-member'>
                                            <p>{
                                                () => {
                                                    let userInfo = await axios.get(`http://localhost:4000/users/` + userId);
                                                    return userInfo.username;
                                                }
                                            }</p>
                                            <img src={profile} />
                                            <div id='group-members-links'>
                                                <a href='#'>MESSAGE</a>
                                                {() => {
                                                    if (currentUser.email == manager.email) {
                                                        return (
                                                            <a href='#' onClick={handleMemberDelete(userId)}>DELETE</a>
                                                        );
                                                    }
                                                    else {
                                                        return;
                                                    }
                                                }}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    {/* group posts section */}
                    <div id='group-info-posts'>
                        {groupData &&
                            groupData.posts.map((post) => {
                                return (
                                    <div className='single-posts'>
                                        <div id='group-info-posts-header'>
                                            <p>{post.time} + {post.username}</p>
                                        </div>
                                        <div id='group-info-posts-content'>
                                            <p>{post.content}</p>
                                        </div>
                                        {isManager && (<div id='btn-wrapper'><button className='standard-btn'>DELETE POST</button></div>)}
                                    </div>
                                );
                            })}
                    </div>

                    {/* create new group posts */}
                    {(isManager || isMember) && (
                        <div id='group-info-posts-area'>
                            <label htmlFor='post-area'>Write Something...</label>
                            <input type='text' id='post-area' />

                            <button className='standard-btn'>CREATE POST</button>
                        </div>
                    )}
                </div>
                {(!isManager && !isMember) && (
                    <div id='join-group'>
                        <button className='standard-btn' onClick={handleJoinGroup} >JOIN GROUP</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}