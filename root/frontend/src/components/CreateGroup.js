import React, { useEffect, useContext, useState } from 'react';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';
import defaultGroup from '../images/group-bg.jpg';
import { AuthContext } from '../firebase/Auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function Creategroup(props) {
   const { currentUser } = useContext(AuthContext);
   const [user, setUser] = useState(undefined);
   const [lat, setLat] = useState(null);
   const [lng, setLng] = useState(null);
   const [success, setSuccess] = useState(false);
   let latitude = null;
   let longitude = null;
   const [geoZipcode, setGeoZipcode] = useState("unKnow!");
   const iniCheckParameter = {
      groupName: false,
      groupNotice: false,
      maxAge: false,
      minAge: false,
      gender: false,
      maxGroupNo: false,
      zipcode: false,
   };
   const [checkParameter, setCheckParameter] = useState(iniCheckParameter);

   useEffect(() => {
      try {
         if (props.match.params.username !== currentUser.displayName)
            throw `do not create groups for other user!`
         fetchUserByName(currentUser.displayName);
         async function getZip() {
            if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(async position => {
                  let username = null;
                  if (currentUser) {
                     username = currentUser.displayName;
                  }
                  const { data } = await axios.get(`http://localhost:4000/zipcodeApi/${position.coords.latitude}/${position.coords.longitude}/${username}`, {
                     withCredentials: true
                  });
                  setGeoZipcode(data);
                  latitude = position.coords.latitude;
                  longitude = position.coords.longitude;
                  setLat(latitude);
                  setLng(longitude);
               }, error => {
                  alert(error);
               })
            }
         }
         getZip();
         if (checkParameter.zipcode) {
            document.getElementById('group-form-btn').disabled = false;
         } else {
            document.getElementById('group-form-btn').disabled = true;
         }
         // getUserLocation();
      } catch (e) {
         alert(e);
      }
   }, [props.match.params.username, checkParameter.zipcode]);

   if (success) {
      return <Redirect to='/explore' />
   }

   async function fetchUserByName(username) {
      try {
         const user = await fetch(`http://localhost:4000/users/getUserByUsername/${username}`, {
            method: "GET",
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         // error handle! 
         if (!user.ok)
            throw `error in user info fetching with name! status:${user.status}, statusText:${user.statusText} message:${await user.json().then((error) => {
               return error;
            })}`
         const resolved = await user.json();
         setUser(resolved);
         return;
      } catch (e) {
         alert(e);
      }
   }

   async function createGroup() {
      try {
         const groupName = document.getElementById('groupName').value;
         if (!groupName) {
            throw `Please input the groupName!`;
         }
         const groupNotice = document.getElementById('groupNotice').value;
         if (!groupNotice) {
            throw `Please input the groupNotice!`;
         }
         const zipcode = document.getElementById('zipcode').value;
         if (!zipcode) {
            throw `Please input the zipcode!`;
         }
         const maxAge = document.getElementById('maxAge').value;
         if (!maxAge) {
            throw `Please input the maxAge!`;
         }
         if (maxAge < 10 || maxAge > 100) {
            throw `Max Age should be in range 10~100!`;
         }
         const minAge = document.getElementById('minAge').value;
         if (!minAge) {
            throw `Please input the minAge!`;
         }
         if (minAge < 10 || minAge > 100) {
            throw `Min Age should be in range 10~100!`;
         }
         if (minAge > maxAge) {
            throw `Min Age should not be bigger than max age!`;
         }
         const maxGroupNo = document.getElementById('maxGroupNo').value;
         if (!maxGroupNo) {
            throw `Please input the maxGroupNo!`;
         }
         if (maxGroupNo <= 0) {
            throw `Max group number should be bigger than 0!`;
         }

         const response = await fetch(`http://localhost:4000/groups/${user._id}`, {
            method: "POST",
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               groupName: groupName,
               groupNotice: groupNotice,
               maxAge: maxAge,
               minAge: minAge,
               gender: document.getElementById("gender").value,
               maxGroupNo: maxGroupNo,
               zipcode: zipcode,
               latitude: lat,
               longitude: lng
            })
         });
         if (!response.ok) {
            alert(`Sorry, something went wrong!! status:${response.status}, statusText:${response.statusText} message:${await response.json().then((error) => {
               return error;
            })}`);
         }
         setSuccess(true);
      } catch (e) {
         throw `error: ` + e;
      }
   }

   async function handleCreateGroup(e) {
      try {
         e.preventDefault();
         await createGroup();
         alert("Success");
         window.location.href = "http://localhost:3000/explore";
         return;
      } catch (e) {
         alert(e);
      }
   }

   const zipcodeBlur = (e) => {
      e.preventDefault();
      const newZipcode = e.target.value.trim();
      const message = document.getElementById('zipcode-message');
      if (!newZipcode || newZipcode.length === 0) {
         message.innerHTML = 'You have to enter zipcode!';
         message.className = 'red-message';
         e.target.className = 'error';
         setCheckParameter({
            ...checkParameter,
            zipcode: false
         });
      }
      else {
         const regex = /^\d*$/;
         if (!regex.test(newZipcode)) {
            message.innerHTML = 'Sorry, input can\'t be a zipcode.';
            message.className = 'red-message';
            e.target.className = 'error';
            setCheckParameter({
               ...checkParameter,
               zipcode: false
            });
         }
         else {
            if (newZipcode.length !== 5) {
               message.innerHTML = 'Sorry, zipcode size should be 5.';
               message.className = 'red-message';
               e.target.className = 'error';
               setCheckParameter({
                  ...checkParameter,
                  zipcode: false
               });
            }
            else {
               if (newZipcode !== geoZipcode) {
                  message.innerHTML = 'Sorry, group will be creat at your curren location make sure is same';
                  message.className = 'red-message';
                  e.target.className = 'error';
                  setCheckParameter({
                     ...checkParameter,
                     zipcode: false
                  });
               }
               else {
                  message.innerHTML = 'Checked!';
                  message.className = 'green-message';
                  e.target.className = '';
                  setCheckParameter({
                     ...checkParameter,
                     zipcode: true
                  });
               }
            }
         }
      }
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
                  <form onSubmit={handleCreateGroup}>
                     <div className='single-input'>
                        <label htmlFor='groupName'>Group Name</label>
                        <input type='text' name='groupName' id='groupName' required />
                     </div>

                     <div className='single-input'>
                        <label htmlFor='groupNotice'>Group Notice</label>
                        <input type='text' name='groupNotice' id='groupNotice' required />
                     </div>
                     <div className='single-input'>
                        <label htmlFor='zipcode'>Location Zipcode</label><label id='zipcode-message' className=''>(group will be creat at your curren location)</label>
                        <input type='text' name='zipcode' id='zipcode' onBlur={zipcodeBlur} required placeholder={`you current zipcode:${geoZipcode}`} />
                     </div>
                     <p>Group Limitations</p>
                     <div className='energy-bar'></div>
                     <div id='group-limitations'>
                        <div id='age-limitations'>
                           <div id='p1'>
                              <label htmlFor='maxAge'>Max Age</label>
                              <input type='number' id='maxAge' name='maxAge' required />
                           </div>
                           <div id='p2'>
                              <label htmlFor='minAge'>Min Age</label>
                              <input type='number' id='minAge' name='minAge' required />
                           </div>
                        </div>

                        <div id='gender-limitations'>
                           <label htmlFor="gender">Gender</label>
                           <select name="gender" id="gender" defaultValue="male" required>
                              <option value="none">None</option>
                              <option value="male">Male Only</option>
                              <option value="female">Female Only</option>
                           </select>
                        </div>

                        <div id='number-limitations'>
                           <label>Max Number</label>
                           <input type='number' name='maxGroupNo' id='maxGroupNo' required />
                        </div>
                     </div>
                     <button id='group-form-btn' className='standard-btn' type='submit'>SUBMIT</button>
                     {/* {lat && lng && (
                     )} */}
                  </form>

               </div>
            </div>
         </div>
         <Footer />
      </div>
   )
}
