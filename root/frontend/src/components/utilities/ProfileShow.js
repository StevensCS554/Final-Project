import React, { useState, useEffect } from 'react';
// can't import images outside src folder

export default function ProfileForm(props) {
    const [userData, setUserData] = useState(undefined);

    useEffect(() => {
        // document.getElementById("upload-profile-btn").addEventListener("click", createGroup);
        async function get() {
            try {
                // alert(`fetch for the user with id: ${userId}`);
                //       const user = await fetch(`http://localhost:4000/users/getbyid/${userId}`, {
                //          method: "GET",
                //          headers: {
                //             'Content-Type': 'application/json'
                //          }
                //       });
                //       //: error handle! 
                //       if (user.ok === false)
                //          throw `error in user info fetching: ${userId}`
                //       const resolved = await user.json();
                //       // alert(resolved.email);
                //       return resolved;
                alert(props.username);
            } catch (e) {
                alert(e);
            }
        }
        get();
    }, [props.username]);

    return (
        <p> view other's profile</p>
        //   <div id='profile-form-container'>
        //      <div id='profile-form'>
        //         <form id='profile-form-pic' onSubmit={submitForm1}>
        //            <div id='profile-form-pic-img'>
        //               <img src={profileUrl} />
        //            </div>
        //            <input type='file' id='userprofile' onChange={uploadFile} />
        //            <label htmlFor='userprofile' />
        //            <input className='standard-btn' type='submit' value='CHANGE AVATAR' />
        //         </form>
        //         <form id='profile-form-f'>
        //            <div className='form-group'>
        //               <label htmlFor='username'>Username</label>
        //               <input type='text' name='username' id='username' />
        //            </div>
        //            <div className='form-group' id='gender-input'>
        //               <label htmlFor="gender">Gender</label>
        //               <select name="gender" id="gender">
        //                  <option value="male">Male</option>
        //                  <option value="female" value>Female</option>
        //                  <option value="other">Other</option>
        //               </select>
        //            </div>
        //            <div className='form-group' id='age-input'>
        //               <label htmlFor='age'>Age</label>
        //               <input type='number' name='age' id='age' />
        //            </div>
        //            <div className='form-group' id='zipcode-input'>
        //               <label htmlFor='zipcode'>Zip Code</label>
        //               <input type='text' name='zipcode' id='zipcode' />
        //            </div>
        //            <div className='form-group'>
        //               <label htmlFor='cellphone'>Cell Phone</label>
        //               <input type='tel' name='cellphone' id='cellphone' />
        //            </div>
        //            <div className='form-group'>
        //               <label htmlFor='bio'>Bio</label>
        //               <input type='tel' name='bio' id='bio' />
        //            </div>

        //            <button id='user-form-btn' className='standard-btn'>SAVE CHANGES</button>
        //         </form>
        //      </div>
        //   </div>
    )
}
