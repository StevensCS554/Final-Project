import React from 'react';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';
import defaultGroup from '../images/group-bg.jpg';


export default function Creategroup() {
   return (
      <div>
         <Navigation />
         <div id='create-group'>
            <div id='create-group-container'>
               <div id='create-group-profile'>
                  <img src={defaultGroup} />
                  <button className='standard-btn'>UPLOAD PROFILE</button>
               </div>
               <div id='create-group-form'>
                  <form>
                     <div className='single-input'>
                        <label for='groupName'>Group Name</label>
                        <input type='text' name='groupName' id='groupName' />
                     </div>

                     <div className='single-input'>
                        <label for='groupName'>Group Notice</label>
                        <input type='text' name='groupName' id='groupName' />
                     </div>
                     <p>Group Limitations</p>
                     <div className='energy-bar'></div>
                     <div id='group-limitations'>
                        <div id='age-limitations'>
                           <div id='p1'>
                              <label htmlFor='maxAge'>Min Age</label>
                              <input type='number' id='maxAge' name='maxAge' />
                           </div>
                           <div id='p2'>
                              <label htmlFor='minAge'>Max Age</label>
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
                           <input type='number' name='maxGroupNo' />
                        </div>
                     </div>

                     <button id='group-form-btn' className='standard-btn' type='submit'>SUBMIT</button>
                  </form>

               </div>
            </div>
         </div>
         <Footer />
      </div>
   )
}
