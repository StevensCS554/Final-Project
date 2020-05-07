import React, { useState } from 'react';
import axios from 'axios';
import profile from '../../images/team-bg.jpeg';

export default function ProfileForm() {
   const [file, setFile] = useState(null);
   
   const uploadFile = (e) => {
      setFile(e.target.files[0]);
   }

   const submitForm = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      try {
         const res = await axios.post(
            'http://localhost:4000/users/upload', formData, {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            });
         alert('good');
      } catch(e) {
         alert(e);
      }  
   }

   return (
      <div id='profile-form-container'>
         <div id='profile-form'>
            <form id='profile-form-pic' onSubmit={submitForm}>
               <img src={profile} />
               <input type='file' id='userprofile' onChange={uploadFile} />
               <label htmlFor='userprofile'>Change Avatar</label>
               <input type='submit' value='upload' />
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
                     <option value="female" selected>Female</option>
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
