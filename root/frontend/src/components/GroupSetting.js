import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { storage } from '../firebase/Firebase';
import Navigation from './utilities/Navigation';
import Footer from './utilities/Footer';

export default function GroupSetting(props) {
   const [groupProfile, setGroupProfile] = useState(null);
   const [profileUrl, setProfileUrl] = useState(null);
   const [group, setGroup] = useState(null);
   const groupParameter = {
      groupName: null,
      groupNotice: null,
      maxAge: null,
      minAge: null,
      gender: null,
      maxGroupNo: null,
      zipcode: null,
   };
   const [checkParameter, setCheckParameter] = useState(groupParameter);

   useEffect(() => {
      async function getGroup() {
         try {
            const { data } = await axios.get(`http://localhost:4000/groups/manager/${props.match.params.userId}`,
               { withCredentials: true });
            const { group } = data;
            setGroup(group);
            setProfileUrl(group.groupProfileUrl);
            setCheckParameter(group);
         } catch (e) {
            alert(e);
         }
      }
      getGroup();
   }, [profileUrl])

   async function handleUpdateGroup(e) {
      try {
         e.preventDefault();
         const reqBody = {};
         if (group && checkParameter) {
            //sample error handle
            if (!checkParameter.groupName) {
               throw `Please input the groupName!`;
            }
            if (!checkParameter.groupNotice) {
               throw `Please input the groupNotice!`;
            }
            const regex = /^\d*$/;
            if (!checkParameter.zipcode || checkParameter.zipcode.length === 0) {
               throw 'You have to enter zipcode!';
            }
            else if (!regex.test(checkParameter.zipcode)) {
               throw 'Sorry, input can\'t be a zipcode.';
            }
            else if (checkParameter.zipcode.length !== 5) {
               throw 'Sorry, zipcode size should be 5.';
            }
            if (!checkParameter.maxAge) {
               throw `Please input the maxAge!`;
            }
            if (parseInt(checkParameter.maxAge) < 10 || parseInt(checkParameter.maxAge) > 100) {
               throw `Max Age should be in range 10~100!`;
            }
            if (!checkParameter.minAge) {
               throw `Please input the minAge!`;
            }
            if (parseInt(checkParameter.minAge) < 10 || parseInt(checkParameter.minAge) > 100) {
               throw `Min Age should be in range 10~100!`;
            }
            if (parseInt(checkParameter.minAge) > parseInt(checkParameter.maxAge)) {
               throw `Min Age should not be bigger than max age!`;
            }
            if (!checkParameter.maxGroupNo) {
               throw `Please input the maxGroupNo!`;
            }
            if (parseInt(checkParameter.maxGroupNo) <= 0) {
               throw `Max group number should be bigger than 0!`;
            }

            //check if info ever changed!
            if (checkParameter.groupName && checkParameter.groupName !== group.groupName) {
               reqBody.groupName = checkParameter.groupName;
            }
            if (checkParameter.groupNotice && checkParameter.groupNotice !== group.groupNotice) {
               reqBody.groupNotice = checkParameter.groupNotice;
            }
            // if (checkParameter.zipcode && checkParameter.zipcode !== group.zipcode) {
               reqBody.zipcode = checkParameter.zipcode;
               // alert(`Zipcode Checked! But the latitude and longitude is still same! Need to implemant later!`);
            // }
            if (checkParameter.maxAge && checkParameter.maxAge !== group.maxAge) {
               reqBody.maxAge = checkParameter.maxAge;
            }
            if (checkParameter.minAge && checkParameter.minAge !== group.minAge) {
               reqBody.minAge = checkParameter.minAge;
            }
            if (checkParameter.gender && checkParameter.gender !== group.gender) {
               reqBody.gender = checkParameter.gender;
            }
            if (checkParameter.maxGroupNo && checkParameter.maxGroupNo !== group.maxGroupNo) {
               reqBody.maxGroupNo = checkParameter.maxGroupNo;
            }
            if (Object.keys(reqBody).length === 0) {
               throw 'Please change some information!'
            }
            const response = await fetch(`http://localhost:4000/groups/${group._id}`, {
               method: "PUT",
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(reqBody)
            });
            if (!response.ok) {
               throw `Sorry, something went wrong! status:${response.status}, statusText:${response.statusText} message:${await response.json().then((error) => {
                  return error;
               })}`;
            }
            alert(`success`);
            window.location.href = `http://localhost:3000/group-profile/${group._id}`;
         }
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
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

   return (
      <div>
         <Navigation />
         {group && (
            <div id='create-group'>
               <div id='create-group-container'>
                  <form id='form1' onSubmit={submitForm1}>
                     <div id='create-group-profile'>
                        <img src={profileUrl} alt="profileUrl"/>
                        <input id='setting-input1' type='file' onChange={uploadFile} />
                        <label htmlFor='userprofile' />
                        <input id='setting-input2' className='standard-btn' type='submit' value='CHANGE AVATAR' />
                     </div>
                  </form>
                  <div id='create-group-form'>
                     <form onSubmit={handleUpdateGroup}>
                        <div className='single-input'>
                           <label htmlFor='groupName'>Group Name</label>
                           <input type='text' name='groupName' id='groupName'
                              value={checkParameter && checkParameter.groupName}
                              onChange={(e) => setCheckParameter({ ...checkParameter, groupName: e.target.value })}
                           />
                        </div>
                        <div className='single-input'>
                           <label htmlFor='groupNotice'>Group Notice</label>
                           <input type='text' name='groupNotice' id='groupNotice'
                              value={checkParameter && checkParameter.groupNotice}
                              onChange={(e) => setCheckParameter({ ...checkParameter, groupNotice: e.target.value })}
                           />
                        </div>
                        <div className='single-input'>
                           <label htmlFor='zipcode'>Location Zipcode</label>
                           <input type='text' name='zipcode' id='zipcode'
                              value={checkParameter && checkParameter.zipcode}
                              onChange={(e) => setCheckParameter({ ...checkParameter, zipcode: e.target.value })}
                              disabled
                           />
                        </div>
                        <p>Group Limitations</p>
                        <div className='energy-bar'></div>
                        <div id='group-limitations'>
                           <div id='age-limitations'>
                              <div id='p1'>
                                 <label htmlFor='maxAge'>Max Age</label>
                                 <input type='number' id='maxAge' name='maxAge'
                                    value={checkParameter && checkParameter.maxAge}
                                    onChange={(e) => setCheckParameter({ ...checkParameter, maxAge: e.target.value })}
                                 />
                              </div>
                              <div id='p2'>
                                 <label htmlFor='minAge'>Min Age</label>
                                 <input type='number' id='minAge' name='minAge'
                                    value={checkParameter && checkParameter.minAge}
                                    onChange={(e) => setCheckParameter({ ...checkParameter, minAge: e.target.value })}
                                 />
                              </div>
                           </div>
                           <div id='gender-limitations'>
                              <label htmlFor="gender">Gender</label>
                              <select name="gender" id="gender"
                                 value={checkParameter && checkParameter.gender}
                                 onChange={(e) => setCheckParameter({ ...checkParameter, gender: e.target.value })}
                              >
                                 <option value="male">Male Only</option>
                                 <option value="female">Female Only</option>
                                 <option value="other">None</option>
                              </select>
                           </div>

                           <div id='number-limitations'>
                              <label>Max Number</label>
                              <input type='number' name='maxGroupNo' id='maxGroupNo'
                                 value={checkParameter && checkParameter.maxGroupNo}
                                 onChange={(e) => setCheckParameter({ ...checkParameter, maxGroupNo: e.target.value })}
                              />
                           </div>
                        </div>

                        <button id='group-form-btn' className='standard-btn' typs='submit'>SAVE CHANGES</button>
                     </form>

                  </div>
               </div>
            </div>
         )}

         <Footer />
      </div>
   )
}
