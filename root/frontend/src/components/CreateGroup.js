import React, { useEffect, useContext } from 'react';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';
import defaultGroup from '../images/group-bg.jpg';
import AuthContext from '../firebase/Auth'

export default function Creategroup() {
   const { currentUser } = 
   // useEffect(() => {
   // }, []);

   async function createGroup() {
      const groupName = document.getElementById('groupName').value;
      if (!groupName) {
         alert("Please input the groupName!");
         return false;
      }
      const groupNotice = document.getElementById('groupNotice').value;
      if (!groupNotice) {
         alert("Please input the groupNotice!");
         return false;
      }
      const maxAge = document.getElementById('maxAge').value;
      if (!maxAge) {
         alert("Please input the maxAge!");
         return false;
      }
      if (maxAge < 10 || maxAge > 100) {
         alert("Max Age should be in range 10~100!");
         return false;
      }
      const minAge = document.getElementById('minAge').value;
      if (!minAge) {
         alert("Please input the minAge!");
         return false;
      }
      if (minAge < 10 || minAge > 100) {
         alert("Min Age should be in range 10~100!");
         return false;
      }
      if (minAge > maxAge) {
         alert("Min Age should not be bigger than max age!");
         return false;
      }
      const maxGroupNo = document.getElementById('maxGroupNo').value;
      if (!maxGroupNo) {
         alert("Please input the maxGroupNo!");
         return false;
      }
      if (maxGroupNo <= 0) {
         alert("Max group number should be bigger than 0!");
         return false;
      }
      const response = await fetch("http://localhost:4000/groups", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            groupName: groupName,
            groupNotice: groupNotice,
            maxAge: maxAge,
            minAge: minAge,
            gender: document.getElementById("gender").value,
            maxGroupNo: maxGroupNo
         })
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

   return (
      <div>
         <Navigation />
         <div id='create-group'>
            <div id='create-group-container'>
               <div id='create-group-profile'>
                  <img src={defaultGroup} />
               </div>
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
                  <button id='group-form-btn' className='standard-btn'>SUBMIT</button>

               </div>
            </div>
         </div>
         <Footer />
      </div>
   )
}
