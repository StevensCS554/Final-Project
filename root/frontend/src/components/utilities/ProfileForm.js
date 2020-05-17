import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { storage } from '../../firebase/Firebase';
import { AuthContext } from '../../firebase/Auth';
import { doSignOut } from '../../firebase/FirebaseFunctions';
// can't import images outside src folder

export default function ProfileForm() {
   const { currentUser } = useContext(AuthContext);
   const [userProfile, setUserProfile] = useState('');
   const [profileUrl, setProfileUrl] = useState(null);
   const [userData, setUserData] = useState(null);

   useEffect(() => {
      //document.getElementById("user-form-btn").addEventListener("click", updateUser);
      // document.getElementById("upload-profile-btn").addEventListener("click", createGroup);
      async function getUrl() {
         try {
            const { data } = await axios.get(`http://localhost:4000/users/profile/${currentUser.displayName}`, {
               withCredentials: true
            })
            const { url, auth } = data;
            if (auth === 'unauth') {
               await doSignOut();
               return;
            }
            setProfileUrl(url);
         } catch (e) {
            alert(e);
         }
      }
      async function getUserData() {
         if (currentUser && currentUser.displayName) {
            try {
               const { data } = await axios.get(`http://localhost:4000/users/getUserByName/${currentUser.displayName}`, {
                  withCredentials: true
               });
               const { user } = data;
               setUserData(user);
            } catch (e) {
               alert(e);
            }
         }
      }
      getUrl();
      getUserData();
   }, [profileUrl]);

   async function updateUser() {
      if (document.getElementById('age-message').className === 'red-messasge' || document.getElementById('zipcode-message').className === 'red-messasge' || document.getElementById('phone-message').className === 'red-message') {
         alert('Input not correct!');
      }
      const reqBody = {};
      if (userData) {
         const gender = document.getElementById('gender').value;
         if (gender && gender !== userData.gender) {
            reqBody.gender = gender;
         }
         const age = document.getElementById('age').value;
         if (age && age !== userData.age) {
            reqBody.age = age;
         }
         const zipcode = document.getElementById('zipcode').value;
         if (zipcode && zipcode !== userData.zipcode) {
            reqBody.zipcode = zipcode;
         }
         const cellphone = document.getElementById('cellphone').value;
         if (cellphone && cellphone !== userData.phone) {
            //front is cellphone and back is phone, lazy to synchronize XD
            reqBody.phone = cellphone;
         }
         const bio = document.getElementById('bio').value;
         if (bio && bio !== userData.bio) {
            reqBody.bio = bio;
         }
         if (Object.keys(reqBody).length === 0) {
            alert('Please change some information!')
            return false;
         }
         const response = await fetch(`http://localhost:4000/users/${userData._id}`, {
            credentials: "include",
            method: "PUT",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
         });
         if (response.status === 200) {
            const { isLoggedIn } = await response.json();
            if (isLoggedIn !== null && isLoggedIn === false) {
               alert(isLoggedIn);
               await doSignOut();
            }

            alert('Succes!');
         }
         else {
            // alert('Sorry, something went wrong!');
            const e = await response.json();
            window.location.href = `http://localhost:3000/error/${e}`
         }
         //window.location.reload();
      }
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
            storage.ref('images').child(newName).getDownloadURL().then(async url => {
               setProfileUrl(url);
               try {
                  await axios.post(`http://localhost:4000/users/profile/${currentUser.displayName}`,
                     { url: url }, {
                     withCredentials: true
                  });
               } catch (e) {
                  window.location.href = `http://localhost:3000/error/${e}`
               }
            });
         }
      );
   }

   const ageChange = (e) => {
      e.preventDefault();
      const newAge = e.target.value.trim();
      const message = document.getElementById('age-message');
      const regex = /^\d*$/;
      if (!regex.test(newAge)) {
         message.innerHTML = 'Sorry, input can\'t be a age.';
         message.className = 'red-message';
         e.target.className = 'error';
      }
      else {
         if (parseInt(newAge) < 10 || parseInt(newAge) > 100) {
            message.innerHTML = 'Sorry, age out of range: 10 to 100.';
            message.className = 'red-message';
            e.target.className = 'error';
         }
         else {
            message.innerHTML = 'Checked!';
            message.className = 'green-message';
            e.target.className = '';
         }
      }
   }

   const zipcodeChange = (e) => {
      e.preventDefault();
      const newZipcode = e.target.value.trim();
      const message = document.getElementById('zipcode-message');
      const regex = /^\d*$/;
      if (!regex.test(newZipcode)) {
         message.innerHTML = 'Sorry, input can\'t be a zipcode.';
         message.className = 'red-message';
         e.target.className = 'error';
      }
      else {
         if (newZipcode.length !== 5) {
            message.innerHTML = 'Sorry, zipcode size should be 5.';
            message.className = 'red-message';
            e.target.className = 'error';
         }
         else {
            message.innerHTML = 'Checked!';
            message.className = 'green-message';
            e.target.className = '';
         }
      }
   }

   const phoneChange = (e) => {
      e.preventDefault();
      const newPhone = e.target.value.trim();
      const message = document.getElementById('phone-message');
      const regex = /^\d*$/;
      if (!regex.test(newPhone)) {
         message.innerHTML = 'Sorry, input can\'t be a phone number.';
         message.className = 'red-message';
         e.target.className = 'error';
      }
      else {
         if (newPhone.length !== 10) {
            message.innerHTML = 'Sorry, phone number size should be 10.';
            message.className = 'red-message';
            e.target.className = 'error';
         }
         else {
            message.innerHTML = 'Checked!';
            message.className = 'green-message';
            e.target.className = '';
         }
      }
   }

   return (
      <div id='profile-form-container'>
         <div id='profile-form'>
            <form id='profile-form-pic' onSubmit={submitForm1}>
               <div id='profile-form-pic-img'>
                  <img alt='user profile' src={profileUrl} />
               </div>
               <input type='file' id='userprofile' onChange={uploadFile} />
               <label htmlFor='userprofile-bla' />
               <input className='standard-btn' id='userprofile-bla' type='submit' value='CHANGE AVATAR' />
            </form>
            <form id='profile-form-f'>
               <div className='form-group'>
                  <p>Username: {userData && userData.username}</p>
                  {/* <input type='text' name='username' id='username' placeholder={userData && userData.username} /> */}
               </div>
               <div className='form-group'>
                  <p>Email: {userData && userData.email}</p>
               </div>
               <div className='form-group' id='gender-input'>
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" id="gender" value={userData && userData.gender} disabled>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                     {/* <option value="other">Other</option> */}
                  </select>
               </div>
               <div className='form-group' id='age-input'>
                  <label htmlFor='age'>Age</label><label id='age-message' className=''></label>
                  <input type='number' name='age' id='age' placeholder={userData && userData.age} onChange={ageChange} />
               </div>
               <div className='form-group' id='zipcode-input'>
                  <label htmlFor='zipcode'>Zip Code</label><label id='zipcode-message' className=''></label>
                  <input type='text' name='zipcode' id='zipcode' placeholder={userData && userData.zipcode} onChange={zipcodeChange} />
               </div>
               <div className='form-group'>
                  <label htmlFor='cellphone' className='title'>Cell Phone</label><label id='phone-message' className=''></label>
                  <input type='tel' name='cellphone' id='cellphone' placeholder={userData && userData.phone} onChange={phoneChange} />
               </div>
               <div className='form-group'>
                  <label htmlFor='bio'>Bio</label>
                  <input type='tel' name='bio' id='bio' placeholder={userData && userData.bio} />
               </div>

            </form>
         </div>
         <div id='form-btn'>
            <button id='user-form-btn' className='standard-btn' onClick={updateUser}>SAVE CHANGES</button>
         </div>
      </div>
   )
}
