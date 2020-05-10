import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navigation from './utilities/Navigation';
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
      password: false
   };
   const { currentUser } = useContext(AuthContext);
   const [checkParameter, setCheckParameter] = useState(iniCheckParameter);

   if (currentUser) {
      return <Redirect to='/explore' />
   }

   useEffect(() => {
      if (checkParameter.username && checkParameter.email && checkParameter.age && checkParameter.zipcode && checkParameter.phone && checkParameter.password) {
         document.getElementById('submit-btn').disabled = false;
      }
      else {
         document.getElementById('submit-btn').disabled = true;
      }
   }, [checkParameter]);

   const handleSignup = async (e) => {
      e.preventDefault();
      const { username, email, password } = e.target.elements;
      try {
         const email_v = email.value;
         const age_v = Number.toString(parseInt(age.value));
         const zipcode_v = zipcode.value;
         const gender_v = gender.value;
         const phone_v = phone.value;
         const bio_v = bio.value;  //Not sure what it is when no input, "" or null
         const password_v = password.value;

         // if (!username_v || username_v.trim().length == 0) {
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
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               name: username_v,
               email: email_v
            })
         });

//do something with session

         if (response.status == 200) {
            alert('Succes! Redirect to landing page!');
         }
         else {
            alert('Sorry, something went wrong!');
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
      if (!newUsername || newUsername.trim().length == 0) {
         document.getElementById('username-confirmMessage').innerHTML = '';
         document.getElementById('username-errorMessage').innerHTML = 'You have to enter username.';
         setCheckParameter({
            ...checkParameter,
            username: false
         });
      }
      else {
         const response = await fetch("http://localhost:4000/users", {
            method: "GET",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               newUsername: newUsername
            })
         });
         if (response.status == 200) {
            const res = await response.json();
            if (!res.noUser) {
               document.getElementById('username-confirmMessage').innerHTML = '';
               document.getElementById('username-errorMessage').innerHTML = 'Sorry, this username has been used. Please try another one.';
               setCheckParameter({
                  ...checkParameter,
                  username: false
               });
            }
            else {
               document.getElementById('username-confirmMessage').innerHTML = 'Available Username.';
               document.getElementById('username-errorMessage').innerHTML = '';
               setCheckParameter({
                  ...checkParameter,
                  username: true
               });
            }
         }
         else {
            alert('Sorry, something went wrong!');
            console.log(await response.json());
         }
      }
   }

   const emailBlur = (e) => {
      e.preventDefault();
      const newEmail = e.target.value;
      if (!newEmail || newEmail.trim().length == 0) {
         document.getElementById('email-confirmMessage').innerHTML = '';
         document.getElementById('email-errorMessage').innerHTML = 'You have to enter email!';
         setCheckParameter({
            ...checkParameter,
            email: false
         });
      }
      else {
         //email validation
         // if (parseInt(newEmail) < 10 || parseInt(newEmail) > 100) {
         //    document.getElementById('email-confirmMessage').innerHTML = '';
         //    document.getElementById('email-errorMessage').innerHTML = 'Sorry, email out of range: 10 to 100.';
         //    setCheckParameter({
         //       ...checkParameter,
         //       email: false
         //    });
         // }
         // else {
         //    document.getElementById('email-confirmMessage').innerHTML = 'Checked!';
         //    document.getElementById('email-errorMessage').innerHTML = '';
         //    setCheckParameter({
         //       ...checkParameter,
         //       email: true
         //    });
         // }
      }
   }

   const ageBlur = (e) => {
      e.preventDefault();
      const newAge = e.target.value;
      if (!newAge || newAge.trim().length == 0) {
         document.getElementById('age-confirmMessage').innerHTML = '';
         document.getElementById('age-errorMessage').innerHTML = 'You have to enter age!';
         setCheckParameter({
            ...checkParameter,
            age: false
         });
      }
      else {
         if (parseInt(newAge) < 10 || parseInt(newAge) > 100) {
            document.getElementById('age-confirmMessage').innerHTML = '';
            document.getElementById('age-errorMessage').innerHTML = 'Sorry, age out of range: 10 to 100.';
            setCheckParameter({
               ...checkParameter,
               age: false
            });
         }
         else {
            document.getElementById('age-confirmMessage').innerHTML = 'Checked!';
            document.getElementById('age-errorMessage').innerHTML = '';
            setCheckParameter({
               ...checkParameter,
               age: true
            });
         }
      }
   }

   const zipcodeBlur = (e) => {
      e.preventDefault();
      const newZipcode = e.target.value;
      if (!newZipcode || newZipcode.trim().length == 0) {
         document.getElementById('zipcode-confirmMessage').innerHTML = '';
         document.getElementById('zipcode-errorMessage').innerHTML = 'You have to enter zipcode!';
         setCheckParameter({
            ...checkParameter,
            zipcode: false
         });
      }
      else {
         //zipcode validation
      // if (parseInt(newZipcode) < 10 || parseInt(newZipcode) > 100) {
      //    document.getElementById('zipcode-confirmMessage').innerHTML = '';
      //    document.getElementById('zipcode-errorMessage').innerHTML = 'Sorry, zipcode out of range: 10 to 100.';
      //    setCheckParameter({
      //       ...checkParameter,
      //       zipcode: false
      //    });
      // }
      // else {
      //    document.getElementById('zipcode-confirmMessage').innerHTML = 'Checked!';
      //    document.getElementById('zipcode-errorMessage').innerHTML = '';
      //    setCheckParameter({
      //       ...checkParameter,
      //       zipcode: true
      //    });
      // }
      }
   }

   const phoneBlur = (e) => {
      e.preventDefault();
      const newPhone = e.target.value;
      if (!newPhone || newPhone.trim().length == 0) {
         document.getElementById('phone-confirmMessage').innerHTML = '';
         document.getElementById('phone-errorMessage').innerHTML = 'You have to enter phone!';
         setCheckParameter({
            ...checkParameter,
            phone: false
         });
      }
      else {
         //phone validation
      // if (parseInt(newPhone) < 10 || parseInt(newPhone) > 100) {
      //    document.getElementById('phone-confirmMessage').innerHTML = '';
      //    document.getElementById('phone-errorMessage').innerHTML = 'Sorry, phone out of range: 10 to 100.';
      //    setCheckParameter({
      //       ...checkParameter,
      //       phone: false
      //    });
      // }
      // else {
      //    document.getElementById('phone-confirmMessage').innerHTML = 'Checked!';
      //    document.getElementById('phone-errorMessage').innerHTML = '';
      //    setCheckParameter({
      //       ...checkParameter,
      //       phone: true
      //    });
      // }
      }
   }

   const passwordBlur = (e) => {
      e.preventDefault();
      const newPassword = e.target.value;
      if (!newPassword || newPassword.trim().length == 0) {
         document.getElementById('password-confirmMessage').innerHTML = '';
         document.getElementById('password-errorMessage').innerHTML = 'You have to enter password!';
         setCheckParameter({
            ...checkParameter,
            password: false
         });
      }
      else {
         if (newPassword.trim().length < 6) {
            document.getElementById('password-confirmMessage').innerHTML = '';
            document.getElementById('password-errorMessage').innerHTML = 'Sorry, password length should be more than 6.';
            setCheckParameter({
               ...checkParameter,
               password: false
            });
         }
         else {
            document.getElementById('password-confirmMessage').innerHTML = 'Checked!';
            document.getElementById('password-errorMessage').innerHTML = '';
            setCheckParameter({
               ...checkParameter,
               password: false
            });
         }
      }
   }

   const confirmPasswordBlur = (e) => {
      e.preventDefault();
      const confPassword = e.target.value;
      if (!confPassword || confPassword.trim().length == 0) {
         document.getElementById('password2-confirmMessage').innerHTML = '';
         document.getElementById('password2-errorMessage').innerHTML = 'You have to enter confirm password!';
         setCheckParameter({
            ...checkParameter,
            password: false
         });
      }
      else {
         if (document.getElementById('password').value !== e.target.value) {
            document.getElementById('password2-confirmMessage').innerHTML = '';
            document.getElementById('password2-errorMessage').innerHTML = 'Password don\'t match!';
            setCheckParameter({
               ...checkParameter,
               password: false
            });
         }
         else {
            document.getElementById('password2-confirmMessage').innerHTML = 'Checked!';
            document.getElementById('password2-errorMessage').innerHTML = '';
            setCheckParameter({
               ...checkParameter,
               password: true
            });
         }
      }
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
                  <label htmlFor='username'>USERNAME</label><label id='username-confirmMessage' className='confirmMessage'></label><label id='username-errorMessage' className='errorMessage'></label>
                  <input required type='text' name='username' onBlur={usernameBlur} />
               </div>
               <div className='signup-input'>
                  <label htmlFor='email'>EMAIL</label><label id='email-confirmMessage' className='confirmMessage'></label><label id='email-errorMessage' className='errorMessage'></label>
                  <input required type='email' name='email' onBlur={emailBlur} />
               </div>
               <div id='signup-three'>
                  <div id='signup-age' className='signup-input'>
                     <label htmlFor='age'>AGE</label><label id='age-confirmMessage' className='confirmMessage'></label><label id='age-errorMessage' className='errorMessage'></label>
                     <input required type='number' name='age' onBlur={ageBlur} />
                  </div>
                  <div id='signup-zipcode' className='signup-input'>
                     <label htmlFor='zipcode'>ZIPCODE</label><label id='zipcode-confirmMessage' className='confirmMessage'></label><label id='zipcode-errorMessage' className='errorMessage'></label>
                     <input required type='text' name='zipcode' onBlur={zipcodeBlur} />
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
                  <label htmlFor='phone'>PHONE</label><label id='phone-confirmMessage' className='confirmMessage'></label><label id='phone-errorMessage' className='errorMessage'></label>
                  <input required type='phone' name='phone' onBlur={phoneBlur} />
               </div>
               <div className='signup-input'>
                  <label htmlFor='bio'>BIO (Optional)</label>
                  <input type='text' name='bio' />
               </div>
               <div className='signup-input'>
                  <label htmlFor='password'>PASSWORD</label><label id='password-confirmMessage' className='confirmMessage'></label><label id='password-errorMessage' className='errorMessage'></label>
                  <input required type='password' name='password' id='password' onBlur={passwordBlur} />
               </div>
               <div className='signup-input'>
                  <label htmlFor='password2'>CONFIRM PASSWORD</label><label id='password2-confirmMessage' className='confirmMessage'></label><label id='password2-errorMessage' className='errorMessage'></label>
                  <input required type='password' name='password2' onBlur={confirmPasswordBlur} />
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
