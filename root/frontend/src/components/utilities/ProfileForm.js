import React, { useState } from 'react';
// import axios from 'axios';
import profile from '../../images/team-bg.jpeg';
import { storage } from '../../firebase/Firebase';
// can't import images outside src folder

export default function ProfileForm() {
   const [userProfile, setUserProfile] = useState('');
   const [profileUrl, setProfileUrl] = useState(null);

   const uploadFile = (e) => {
      setUserProfile(e.target.files[0]);
   }

   const submitForm1 = (e) => {
      e.preventDefault();
      const newName = userProfile.name + Date.now();
      const uploadTask = storage.ref(`images/${newName}`).put(userProfile);
      uploadTask.on(
         'state_changed',
         snapshot => { },
         error => {
            alert(error);
         },
         () => {
            storage.ref('images').child(newName).getDownloadURL().then(url => {
               setProfileUrl(url);
            });
         }
      );
   }

   return (
      <div id='profile-form-container'>
         <div id='profile-form'>
            <form id='profile-form-pic' onSubmit={submitForm1}>
               <div id='profile-form-pic-img'>
                  {profileUrl ? <img src={profileUrl} /> : <img style={{}} src={profile} />}
               </div>
               <input type='file' id='userprofile' onChange={uploadFile} />
               <label htmlFor='userprofile' />
               <input className='standard-btn' type='submit' value='CHANGE AVATAR' />
            </form>
            <form id='profile-form-f'>
               <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <input type='text' name='username' />
               </div>
               <div className='form-group' id='gender-input'>
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" id="gender">
                     <option value="male">Male</option>
                     <option value="female" value>Female</option>
                     <option value="other">Other</option>
                  </select>
               </div>
               <div className='form-group' id='age-input'>
                  <label htmlFor='age'>Age</label>
                  <input type='number' name='age' />
               </div>
               <div className='form-group' id='zipcode-input'>
                  <label htmlFor='zipcode'>Zip Code</label>
                  <input type='text' name='zipcode' />
               </div>
               <div className='form-group'>
                  <label htmlFor='cellphone'>Cell Phone</label>
                  <input type='tel' name='cellphone' />
               </div>
               <div className='form-group'>
                  <label htmlFor='bio'>Bio</label>
                  <input type='tel' name='bio' />
               </div>

               <button className='standard-btn' type='submit'>SAVE CHANGES</button>
            </form>
         </div>
      </div>
   )
}
