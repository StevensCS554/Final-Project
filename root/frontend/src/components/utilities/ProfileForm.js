import React, { useState } from 'react';
import axios from 'axios';
import profile from '../../images/team-bg.jpeg';
const images = require.context('../../upload/users');

// can't import images outside src folder
// import d from `../../upload/users/`

export default function ProfileForm() {
   const [file, setFile] = useState(null);
   const [uploadedFile, setUploadedFile] = useState({});
   const [fileName, setFileName] = useState(null);
   const baseUrl = '../../images/';

   const uploadFile = (e) => {
      setFile(e.target.files[0]);
   }

   const submitForm1 = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      try {
         const { data } = await axios.post(
            'http://localhost:4000/users/upload', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });
         const { fileName, filePath } = data;
         setFileName(fileName);
         setUploadedFile({ fileName, filePath });
         alert(filePath);
      } catch (e) {
         alert(e);
      }
   }

   return (
      <div id='profile-form-container'>
         {/* <img src={} /> */}
         {/* <img src={d} /> */}
         <div id='profile-form'>
            <form id='profile-form-pic' onSubmit={submitForm1}>
               <img style={{}} src={profile} />
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
