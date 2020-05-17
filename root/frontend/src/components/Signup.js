import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/logo.png';
import { AuthContext } from '../firebase/Auth';
import Footer from './utilities/Footer';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';

export default function Signup() {
   const iniCheckParameter = {
      username: false,
      email: false,
      age: false,
      zipcode: false,
      phone: false,
      password: false,
      password2: false
   };
   const { currentUser } = useContext(AuthContext);
   const [checkParameter, setCheckParameter] = useState(iniCheckParameter);

   useEffect(() => {
      if (checkParameter.username && checkParameter.email && checkParameter.age && checkParameter.zipcode && checkParameter.phone && checkParameter.password && checkParameter.password2) {
         document.getElementById('submit-btn').disabled = false;
      }
      else {
         document.getElementById('submit-btn').disabled = true;
      }
   }, [checkParameter.username, checkParameter.email, checkParameter.age, checkParameter.zipcode, checkParameter.phone, checkParameter.password, checkParameter.password2]);

   if (currentUser) {
      return <Redirect to='/login' />
   }

   const handleSignup = async (e) => {
      e.preventDefault();
      const { username, email, age, zipcode, gender, phone, bio, password } = e.target.elements;
      try {
         const username_v = username.value.trim();
         const email_v = email.value.trim();
         const age_v = age.value.trim();
         const zipcode_v = zipcode.value.trim();
         const gender_v = gender.value.trim();
         const phone_v = phone.value.trim();
         const bio_v = bio.value.trim();  //Not sure what it is when no input, "" or null
         const password_v = password.value.trim();

         // if (!username_v || username_v.trim().length ==== 0) {
         //    document.getElementById('username-confirmMessage').innerHTML = '';
         //    document.getElementById('username-errorMessage').innerHTML = 'You have to enter a username!';
         // }
         // else {
         //    document.getElementById('username-confirmMessage').innerHTML = '';
         //    document.getElementById('username-errorMessage').innerHTML = '';
         // }
         // if (!email_v) throw 'No email provided!';
         // if (!age_v) throw 'No age provided!';
         // if (age_v < 10 || age_v > 100) throw 'No valid age provided!';
         // if (!zipcode_v) throw 'No zipcode provided!';
         // if (!gender_v) throw 'No gender provided!';  //unlikely
         // if (!phone_v) throw 'No phone provided!';
         // if (!password_v) throw 'No password provided!';
         await doCreateUserWithEmailAndPassword(email_v, password_v, username_v);

         const response = await fetch("http://localhost:4000/users", {
            credentials: "include",
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               username: username_v,
               email: email_v,
               age: age_v,
               zipcode: zipcode_v,
               gender: gender_v,
               phone: phone_v,
               bio: bio_v
            })
         });

         if (response.status === 200) {
            window.location.href = "http://localhost:3000/login";
         }
         else {
            alert('Sorry, something went wrong! Redirect to langing page!');
            console.log(await response.json());
            window.location.href = "http://localhost:3000/";
         }
      } catch (e) {
         window.location.href = `http://localhost:3000/error/${e}`
      }
   }

   const usernameBlur = async (e) => {
      e.preventDefault();
      e.persist();
      e.target.value = e.target.value.trim().toLowerCase();
      const newUsername = e.target.value.trim();
      const message = document.getElementById('username-message');
      if (!newUsername || newUsername.length === 0) {
         message.innerHTML = 'You have to enter username.';
         message.className = 'red-message';
         e.target.className = 'error';
         setCheckParameter({
            ...checkParameter,
            username: false
         });
      }
      else {
         const regex = /^[a-zA-Z0-9!"#$%&'+,-./:;<=>?@^_]+$/;
         if (!regex.test(newUsername)) {
            message.innerHTML = 'Sorry, newUsername can only contain numbers, letters and these characters: !"#$%&\'+,-./:;<=>?@^_.';
            message.className = 'red-message';
            e.target.className = 'error';
            setCheckParameter({
               ...checkParameter,
               username: false
            });
         }
         else {
            const response = await fetch(`http://localhost:4000/users/${newUsername}`, {
               method: "GET",
               headers: {
                  'Content-Type': 'application/json'
               }
            });

            if (response.status === 200) {
               const res = await response.json();
               if (!res.noUser) {
                  message.innerHTML = 'Sorry, this username has been used. Please try another one.';
                  message.className = 'red-message';
                  e.target.className = 'error';
                  setCheckParameter({
                     ...checkParameter,
                     username: false
                  });
               }
               else {
                  message.innerHTML = 'Available Username.';
                  message.className = 'green-message';
                  e.target.className = '';
                  setCheckParameter({
                     ...checkParameter,
                     username: true
                  });
               }
            }
            else {
               const err = await response.json();
               window.location.href = `http://localhost:3000/error/${err}`
            }
         }
      }
   }

   const emailBlur = async (e) => {
      e.preventDefault();
      e.persist();
      e.target.value = e.target.value.trim().toLowerCase();
      const newEmail = e.target.value.trim();
      const message = document.getElementById('email-message');
      if (!newEmail || newEmail.length === 0) {
         message.innerHTML = 'You have to enter email!';
         message.className = 'red-message';
         e.target.className = 'error';
         setCheckParameter({
            ...checkParameter,
            email: false
         });
      }
      else {
         const regex = /^\S+@\S+\.\S+$/;
         if (!regex.test(newEmail)) {
            message.innerHTML = 'Sorry, not an email!';
            message.className = 'red-message';
            e.target.className = 'error';
            setCheckParameter({
               ...checkParameter,
               email: false
            });
         }
         else {
            const response = await fetch(`http://localhost:4000/users/getbyemail/${newEmail}`, {
               method: "GET",
               headers: {
                  'Content-Type': 'application/json'
               }
            });
            if (response.status === 200) {
               const res = await response.json();
               if (!res.noEmail) {
                  message.innerHTML = 'Sorry, this email has been used. Please try another one.';
                  message.className = 'red-message';
                  e.target.className = 'error';
                  setCheckParameter({
                     ...checkParameter,
                     email: false
                  });
               }
               else {
                  message.innerHTML = 'Available Email.';
                  message.className = 'green-message';
                  e.target.className = '';
                  setCheckParameter({
                     ...checkParameter,
                     email: true
                  });
               }
            }
            else {
               alert('Sorry, something went wrong!');
               console.log(await response.json());
            }
         }
      }
   }

   const ageBlur = (e) => {
      e.preventDefault();
      const newAge = e.target.value.trim();
      const message = document.getElementById('age-message');
      if (!newAge || newAge.length === 0) {
         message.innerHTML = 'You have to enter age!';
         message.className = 'red-message';
         e.target.className = 'error';
         setCheckParameter({
            ...checkParameter,
            age: false
         });
      }
      else {
         const regex = /^\d*$/;
         if (!regex.test(newAge)) {
            message.innerHTML = 'Sorry, input can\'t be a age.';
            message.className = 'red-message';
            e.target.className = 'error';
            setCheckParameter({
               ...checkParameter,
               age: false
            });
         }
         else {
            if (parseInt(newAge) < 10 || parseInt(newAge) > 100) {
               message.innerHTML = 'Sorry, age out of range: 10 to 100.';
               message.className = 'red-message';
               e.target.className = 'error';
               setCheckParameter({
                  ...checkParameter,
                  age: false
               });
            }
            else {
               message.innerHTML = 'Checked!';
               message.className = 'green-message';
               e.target.className = '';
               setCheckParameter({
                  ...checkParameter,
                  age: true
               });
            }
         }
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

   const phoneBlur = (e) => {
      e.preventDefault();
      const newPhone = e.target.value.trim();
      const message = document.getElementById('phone-message');
      if (!newPhone || newPhone.length === 0) {
         message.innerHTML = 'You have to enter phone!';
         message.className = 'red-message';
         e.target.className = 'error';
         setCheckParameter({
            ...checkParameter,
            phone: false
         });
      }
      else {
         const regex = /^\d*$/;
         if (!regex.test(newPhone)) {
            message.innerHTML = 'Sorry, input can\'t be a phone number.';
            message.className = 'red-message';
            e.target.className = 'error';
            setCheckParameter({
               ...checkParameter,
               phone: false
            });
         }
         else {
            if (newPhone.length !== 10) {
               message.innerHTML = 'Sorry, phone number size should be 10.';
               message.className = 'red-message';
               e.target.className = 'error';
               setCheckParameter({
                  ...checkParameter,
                  phone: false
               });
            }
            else {
               message.innerHTML = 'Checked!';
               message.className = 'green-message';
               e.target.className = '';
               setCheckParameter({
                  ...checkParameter,
                  phone: true
               });
            }
         }
      }
   }

   const passwordBlur = (e) => {
      e.preventDefault();
      const newPassword = e.target.value;
      const message = document.getElementById('password-message');
      if (!newPassword || newPassword.length === 0) {
         message.innerHTML = 'You have to enter password!';
         message.className = 'red-message';
         e.target.className = 'error';
         setCheckParameter({
            ...checkParameter,
            password: false
         });
      }
      else {
         if (newPassword.length < 6 || newPassword.length > 20) {
            message.innerHTML = 'Sorry, password length should be more than 6 and no more than 20.';
            message.className = 'red-message';
            e.target.className = 'error';
            setCheckParameter({
               ...checkParameter,
               password: false
            });
         }
         else {
            const regex = /^[a-zA-Z0-9!"#$%&'+,-./:;<=>?@^_]+$/;
            if (!regex.test(newPassword)) {
               message.innerHTML = 'Sorry, password can only contain numbers, letters and these characters: !"#$%&\'+,-./:;<=>?@^_.';
               message.className = 'red-message';
               e.target.className = 'error';
               setCheckParameter({
                  ...checkParameter,
                  password: false
               });
            }
            else {
               message.innerHTML = 'Checked!';
               message.className = 'green-message';
               e.target.className = '';
               setCheckParameter({
                  ...checkParameter,
                  password: true
               });
            }
         }
      }
   }

   const confirmPasswordChange = (e) => {
      e.preventDefault();
      const confPassword = e.target.value;
      const message = document.getElementById('password2-message');
      if (!confPassword || confPassword.trim().length === 0) {
         message.innerHTML = 'You have to enter confirm password!';
         message.className = 'red-message';
         e.target.className = 'error';
         setCheckParameter({
            ...checkParameter,
            password2: false
         });
      }
      else {
         if (document.getElementById('password').value !== e.target.value) {
            message.innerHTML = 'Password don\'t match!';
            message.className = 'red-message';
            e.target.className = 'error';
            setCheckParameter({
               ...checkParameter,
               password2: false
            });
         }
         else {
            message.innerHTML = 'Checked!';
            message.className = 'green-message';
            e.target.className = '';
            setCheckParameter({
               ...checkParameter,
               password2: true
            });
         }
      }
   }

   return (
      <div>
         {/* navigation */}
         <div className='navigation-bar'>
            <div id='navbar-logo'>
               <img src={logo} alt="logo"/>
            </div>

            <div id='navbar-link'>
               <ul>
                  <li><Link to='/'>HOME</Link></li>
                  <li><Link to='/explore'>EXPLORE</Link></li>
                  <li><Link to='/login'>LOGIN</Link></li>
                  <li><Link to='/signup'>SIGNUP</Link></li>
               </ul>

            </div>
         </div>

         <div id='signup-header'>
            <p>SIGN UP</p>
            <div className='energy-bar'></div>
         </div>
         <div id='signup-container'>

            <form onSubmit={handleSignup}>
               <div className='signup-input'>
                  <label htmlFor='username' className='title'>USERNAME</label><label id='username-message' className=''></label>
                  <input required type='text' name='username' onBlur={usernameBlur} />
               </div>
               <div className='signup-input'>
                  <label htmlFor='email' className='title'>EMAIL</label><label id='email-message' className=''></label>
                  <input required type='email' name='email' onBlur={emailBlur} />
               </div>
               <div id='signup-three'>
                  <div id='signup-age' className='signup-input'>
                     <label htmlFor='age'>AGE</label><label id='age-message' className=''></label>
                     <input required type='number' name='age' onBlur={ageBlur} />
                  </div>
                  <div id='signup-zipcode' className='signup-input'>
                     <label htmlFor='zipcode'>ZIPCODE</label><label id='zipcode-message' className=''></label>
                     <input required type='text' name='zipcode' onBlur={zipcodeBlur} />
                  </div>
                  <div id='signup-gender' className='signup-input'>
                     <label htmlFor='gender'>Gender</label>
                     <select name='gender' id='gender' defaultValue='male'>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                     </select>
                  </div>
               </div>
               <div className='signup-input'>
                  <label htmlFor='phone' className='title'>PHONE</label><label id='phone-message' className=''></label>
                  <input required type='phone' name='phone' onBlur={phoneBlur} />
               </div>
               <div className='signup-input'>
                  <label htmlFor='bio'>BIO (Optional)</label>
                  <input type='text' name='bio' />
               </div>
               <div className='signup-input'>
                  <label htmlFor='password' className='title'>PASSWORD</label><label id='password-message' className=''></label>
                  <input required type='password' name='password' id='password' onBlur={passwordBlur} />
               </div>
               <div className='signup-input'>
                  <label htmlFor='password2' className='title'>CONFIRM PASSWORD</label><label id='password2-message' className=''></label>
                  <input required type='password' name='password2' onChange={confirmPasswordChange} />
               </div>
               <div className='signup-btn'>
                  <button className='standard-btn' type='submit' id='submit-btn' >SUBMIT</button>
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
