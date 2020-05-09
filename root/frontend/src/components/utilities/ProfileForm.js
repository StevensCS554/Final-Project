import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import profile from '../../images/team-bg.jpeg';
import { storage } from '../../firebase/Firebase';
// can't import images outside src folder

export default function ProfileForm() {
   const [userProfile, setUserProfile] = useState('');
   const [profileUrl, setProfileUrl] = useState(null);
   const [userData, setUserData] = useState(null);

   useEffect(() => {
      document.getElementById("user-form-btn").addEventListener("click", updateUser);
      // document.getElementById("upload-profile-btn").addEventListener("click", createGroup);
   }, []);

   async function updateUser() {
      const username = document.getElementById('username').value;
      const reqBody = {};
      if (username != userData.username) {
         reqBody.username = username;
         return false;
      }
      const gender = document.getElementById('gender').value;
      if (gender != userData.gender) {
         reqBody.gender = gender;
         return false;
      }
      const age = document.getElementById('age').value;
      if (age != userData.age) {
         reqBody.age = age;
         return false;
      }
      const zipcode = document.getElementById('zipcode').value;
      if (zipcode != userData.zipcode) {
         reqBody.zipcode = zipcode;
         return false;
      }
      const cellphone = document.getElementById('cellphone').value;
      if (cellphone != userData.phone) {
         //front is cellphone and back is phone, lazy to synchronize XD
         reqBody.phone = cellphone;
         return false;
      }
      const bio = document.getElementById('bio').value;
      if (bio != userData.bio) {
         reqBody.bio = bio;
         return false;
      }
      if (Object.keys(reqBody).length === 0){
         alert('Please change some information!')
         return false;
      }
      const response = await fetch("http://localhost:4000/users", {
         method: "PUT",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(reqBody)
      });
      if (response.status == 200) {
         alert('Succes!');
      }
      else {
         alert('Sorry, something went wrong!');
         console.log(await response.json());
      }
      window.location.reload();
   }

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
                  <input type='text' name='username' id='username'/>
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
                  <input type='number' name='age' id='age'/>
               </div>
               <div className='form-group' id='zipcode-input'>
                  <label htmlFor='zipcode'>Zip Code</label>
                  <input type='text' name='zipcode' id='zipcode'/>
               </div>
               <div className='form-group'>
                  <label htmlFor='cellphone'>Cell Phone</label>
                  <input type='tel' name='cellphone' id='cellphone'/>
               </div>
               <div className='form-group'>
                  <label htmlFor='bio'>Bio</label>
                  <input type='tel' name='bio' id='bio'/>
               </div>

               <button id='user-form-btn' className='standard-btn'>SAVE CHANGES</button>
            </form>
         </div>
      </div>
   )
}
