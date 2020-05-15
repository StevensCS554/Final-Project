import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { storage } from '../firebase/Firebase';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';

export default function GroupSetting(props) {
   const [groupProfile, setGroupProfile] = useState(null);
   const [profileUrl, setProfileUrl] = useState(null);
   const [group, setGroup] = useState(null);

   useEffect(() => {
      async function getGroup() {
         try {
            const { data } = await axios.get(`http://localhost:4000/groups/manager/${props.match.params.userId}`);
            const { group } = data;
            setGroup(group);
            setProfileUrl(group.groupProfileUrl);
         } catch (e) {
            alert(e);
         }
      }
      getGroup();
   }, [profileUrl])

   async function updateGroup() {
      const groupName = document.getElementById('groupName').value;
      const reqBody = {};
      if (group) {
         if (groupName && groupName !== group.groupName) {
            reqBody.groupName = groupName;
         }
         const groupNotice = document.getElementById('groupNotice').value;
         if (groupNotice && groupNotice !== group.groupNotice) {
            reqBody.groupNotice = groupNotice;
         }
         const maxAge = document.getElementById('maxAge').value;
         if (maxAge && maxAge !== group.maxAge) {
            reqBody.maxAge = maxAge;
         }
         const minAge = document.getElementById('minAge').value;
         if (minAge && minAge !== group.minAge) {
            reqBody.minAge = minAge;
         }
         const gender = document.getElementById('gender').value;
         if (gender && gender !== group.phone) {
            reqBody.phone = gender;
         }
         const maxGroupNo = document.getElementById('maxGroupNo').value;
         if (maxGroupNo && maxGroupNo !== group.maxGroupNo) {
            reqBody.maxGroupNo = maxGroupNo;
         }
         if (Object.keys(reqBody).length === 0) {
            alert('Please change some information!')
            return false;
         }
         const response = await fetch(`http://localhost:4000/groups/${group._id}`, {
            method: "PUT",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
         });
         if (response.status === 200) {
            alert('Succes!');
         }
         else {
            alert('Sorry, something went wrong!');
            console.log(await response.json());
         }
         //window.location.reload();
      }
   }

   const uploadFile = (e) => {
      setGroupProfile(e.target.files[0]);
   }

   const submitForm1 = (e) => {
      e.preventDefault();
      const newName = groupProfile.name + Date.now();
      const uploadTask = storage.ref(`images/${newName}`).put(groupProfile);
      uploadTask.on(
         'state_changed',
         snapshot => { },
         error => {
            alert(error);
         },
         () => {
            storage.ref('images').child(newName).getDownloadURL().then(async url => {
               setProfileUrl(url);
               try {
                  await axios.put(`http://localhost:4000/groups/profile/${group._id}`,
                     { url: url });
               } catch (e) {
                  alert(e);
               }
            });
         }
      );
   }

   return (
      <div>
         <Navigation />
         {group && (
            <div id='create-group'>
               <div id='create-group-container'>
                  <form id='form1' onSubmit={submitForm1}>
                     <div id='create-group-profile'>
                        <img src={profileUrl} />
                        <input id='setting-input1' type='file' onChange={uploadFile} />
                        <label htmlFor='userprofile' />
                        <input id='setting-input2' className='standard-btn' type='submit' value='CHANGE AVATAR' />
                     </div>
                  </form>
                  <div id='create-group-form'>
                     <form>
                        <div className='single-input'>
                           <label htmlFor='groupName'>Group Name</label>
                           <input type='text' name='groupName' id='groupName' placeholder={group && group.groupName} />
                        </div>

                        <div className='single-input'>
                           <label htmlFor='groupNotice'>Group Notice</label>
                           <input type='text' name='groupNotice' id='groupNotice' placeholder={group && group.groupNotice} />
                        </div>
                        <p>Group Limitations</p>
                        <div className='energy-bar'></div>
                        <div id='group-limitations'>
                           <div id='age-limitations'>
                              <div id='p1'>
                                 <label htmlFor='maxAge'>Max Age</label>
                                 <input type='number' id='maxAge' name='maxAge' placeholder={group && group.maxAge} />
                              </div>
                              <div id='p2'>
                                 <label htmlFor='minAge'>Min Age</label>
                                 <input type='number' id='minAge' name='minAge' placeholder={group && group.minAge} />
                              </div>
                           </div>

                           <div id='gender-limitations'>
                              <label htmlFor="gender">Gender</label>
                              <select name="gender" id="gender" placeholder={group && group.gender}>
                                 <option value="male">Male Only</option>
                                 <option value="female">Female Only</option>
                                 <option value="other">None</option>
                              </select>
                           </div>

                           <div id='number-limitations'>
                              <label>Max Number</label>
                              <input type='number' name='maxGroupNo' id='maxGroupNo' placeholder={group && group.maxGroupNo} />
                           </div>
                        </div>

                     </form>
                     <button id='group-form-btn' className='standard-btn' onClick={updateGroup}>SAVE CHANGES</button>

                  </div>
               </div>
            </div>
         )}

         <Footer />
      </div>
   )
}
