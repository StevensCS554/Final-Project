import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navigation from './utilities/Navigation';
import { AuthContext } from '../firebase/Auth';
import Footer from './utilities/Footer';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';

export default function Signup() {
   const { currentUser } = useContext(AuthContext);

   if (currentUser) {
      return <Redirect to='/explore'/>
   }

   const handleSignup = async (e) => {
      e.preventDefault();
      const { username, email, age, zipcode, gender, phone, bio, password } = e.target.elements;
      try {
         const username_v = username.value;
         const email_v = email.value;
         const age_v = age.value;
         const zipcode_v = zipcode.value;
         const gender_v = gender.value;
         const phone_v = phone.value;
         const bio_v = bio.value;  //Not sure what it is when no input, "" or null
         const password_v = password.value;
         
         if (!username_v) throw 'No username provided!';
         if (!email_v) throw 'No email provided!';
         if (!age_v) throw 'No age provided!';
         if (age_v < 10 || age_v > 100) throw 'No valid age provided!';
         if (!zipcode_v) throw 'No zipcode provided!';
         if (!gender_v) throw 'No gender provided!';  //unlikely
         if (!phone_v) throw 'No phone provided!';
         if (!password_v) throw 'No password provided!';
         await doCreateUserWithEmailAndPassword(email_v, password_v, username_v);
         const response = await fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               name: username_v,
               email: email_v,
               age: age_v,
               zipcode: zipcode_v,
               gender: gender_v,
               phone: phone_v,
               bio: bio_v
            })
         });

         if (response.status == 200) {
            alert('Succes! Redirect to landing page!');
         }
         else {
            alert('Sorry, something went wrong! Redirect to landing page!');
            console.log(await response.json());
         }
         window.location.href = "http://localhost:3000/";
      } catch (e) {
         alert(e.message ? e.message : e);
      }
   }

   const usernameBlur = (e) => {
      e.preventDefault();
      const newUsername = e.target.value;
      if (!newUsername || newUsername == "") return;
      const response = await fetch("http://localhost:4000/users", {
         method: "GET",
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
      document
   }

   return (
      <div>
         <Navigation />
         <div id='signup-header'>
            <p>SIGN UP</p>
            <div className='energy-bar'></div>
         </div>
         <div id='signup-container'>

            <form onSubmit={handleSignup}>
               <div className='signup-input'>
                  <label htmlFor='username'>USERNAME</label>
                  <input required type='text' name='username' onBlur={usernameBlur}/>
               </div>
               <div className='signup-input'>
                  <label htmlFor='email'>EMAIL</label>
                  <input required type='email' name='email' />
               </div>
               <div id='signup-three'>
                  <div id='signup-age' className='signup-input'>
                     <label htmlFor='age'>AGE</label>
                     <input required type='number' name='age' />
                  </div>
                  <div id='signup-zipcode' className='signup-input'>
                     <label htmlFor='zipcode'>ZIPCODE</label>
                     <input required type='text' name='zipcode' />
                  </div>
                  <div id='signup-gender' className='signup-input' id='gender-input'>
                     <label htmlFor="gender">Gender</label>
                     <select name="gender" id="gender">
                        <option value="male" selected>Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                     </select>
                  </div>
               </div>
               <div className='signup-input'>
                  <label htmlFor='phone'>PHONE</label>
                  <input required type='phone' name='phone' />
               </div>
               <div className='signup-input'>
                  <label htmlFor='bio'>BIO (Optional)</label>
                  <input type='text' name='bio' />
               </div>
               <div className='signup-input'>
                  <label htmlFor='password'>PASSWORD</label>
                  <input required type='password' name='password' />
               </div>
               <div className='signup-input'>
                  <label htmlFor='password2'>CONFIRM PASSWORD</label>
                  <input required type='password' name='password2' />
               </div>
               <div className='signup-btn'>
                  <button className='standard-btn' type='submit'>SUBMIT</button>
               </div>
            </form>
         </div>
         <div id='to-login'>
            <p>Already have an account?<Link to='/login'> CLICK HERE</Link> to login</p>
         </div>
         <Footer />
      </div>
   )
}
