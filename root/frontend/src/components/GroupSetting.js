import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { storage } from '../firebase/Firebase';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';
import defaultGroup from '../images/group-bg.jpg';

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
         } catch (e) {
            alert(e);
         }
      }
      getGroup();
   }, [])

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
                  await axios.post(`http://localhost:4000/users/profile/`,
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
                  <form onSubmit={submitForm1}>
                     <div id='create-group-profile'>
                        <img src={group.groupProfileUrl} />
                        <input type='file' onChange={uploadFile} />
                        <label htmlFor='userprofile' />
                        <input className='standard-btn' type='submit' value='CHANGE AVATAR' />
                     </div>
                  </form>
                  <div id='create-group-form'>
                     <form>
                        <div className='single-input'>
                           <label for='groupName'>Group Name</label>
                           <input type='text' name='groupName' id='groupName' />
                        </div>

                        <div className='single-input'>
                           <label for='groupNotice'>Group Notice</label>
                           <input type='text' name='groupNotice' id='groupNotice' />
                        </div>
                        <p>Group Limitations</p>
                        <div className='energy-bar'></div>
                        <div id='group-limitations'>
                           <div id='age-limitations'>
                              <div id='p1'>
                                 <label htmlFor='maxAge'>Max Age</label>
                                 <input type='number' id='maxAge' name='maxAge' />
                              </div>
                              <div id='p2'>
                                 <label htmlFor='minAge'>Min Age</label>
                                 <input type='number' id='minAge' name='minAge' />
                              </div>
                           </div>

                           <div id='gender-limitations'>
                              <label htmlFor="gender">Gender</label>
                              <select name="gender" id="gender">
                                 <option value="male">Male Only</option>
                                 <option value="female" selected>Female Only</option>
                                 <option value="other">None</option>
                              </select>
                           </div>

                           <div id='number-limitations'>
                              <label>Max Number</label>
                              <input type='number' name='maxGroupNo' id='maxGroupNo' />
                           </div>
                        </div>

                     </form>
                     <button id='group-form-btn' className='standard-btn'>SAVE CHANGES</button>

                  </div>
               </div>
            </div>
         )}

         <Footer />
      </div>
   )
}
