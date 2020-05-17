import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { doSignInWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import Footer from './utilities/Footer';

export default function Login() {
   const { currentUser } = useContext(AuthContext);

   const handleLogin = async (e) => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
         const email_v = email.value.trim().toLowerCase();
         const email_message = document.getElementById('email-message');
         const password_v = password.value.trim();
         const password_message = document.getElementById('password-message');
         if (!email_v || email_v.length === 0) {
            email_message.innerHTML = 'You have to enter email!';
            email.className = 'error';
            return;
         }
         else {
            const regex = /^\S+@\S+\.\S+$/;
            if (!regex.test(email_v)) {
               email_message.innerHTML = 'Sorry, not an email!';
               email.className = 'error';
               return;
            }
            else {
               email_message.innerHTML = '';
               email.className = '';
            }
         }
         if (!password_v || password_v.length === 0) {
            password_message.innerHTML = 'You have to enter password!';
            password.className = 'error';
            return;
         }
         else {
            const regex = /^[a-zA-Z0-9!"#$%&'+,-./:;<=>?@^_]+$/;
            if (!regex.test(password_v)) {
               password_message.innerHTML = 'Sorry, password can only contain numbers, letters and these characters: !"#$%&\'+,-./:;<=>?@^_.';
               password.className = 'error';
               return;
            }
            else {
               password_message.innerHTML = '';
               password.className = '';
            }
         }
         await fetch('http://localhost:4000/users/login', {
            credentials: "include",
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
         })
         await doSignInWithEmailAndPassword(email.value, password.value);
         window.location.href = "http://localhost:3000/explore";
      } catch (e) {
         alert(e.message ? e.message : e);
      }
   }

   if (currentUser) {
      return <Redirect to='/explore' />
   }
   return (
      <div>
         {/* <Navigation /> */}
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

         <div id='login-container'>
            <div id='login-header'>
               <p>Login</p>
               <div className='energy-bar'></div>
            </div>
            <div id='login-form'>
               <form onSubmit={handleLogin}>
                  <div className='login-input'>
                     <label htmlFor='email'>EMAIL</label><label id='email-message' className='red-message'></label>
                     <input required name='email' type='email' id='email' />
                  </div>
                  <div className='login-input'>
                     <label htmlFor='password'>PASSWORD</label><label id='password-message' className='red-message'></label>
                     <input required name='password' type='password' id='password' />
                  </div>
                  {/* <div>
                     <a href='#'>Forget Password ?</a>
                  </div> */}
                  <div>
                     <button className='standard-btn'>LOGIN</button>
                  </div>
               </form>
            </div>
         </div>
         <Footer />
      </div>
   )
}
