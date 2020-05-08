import React, { useContext } from 'react';
import Navigation from './utilities/Navigation';
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
         await doSignInWithEmailAndPassword(email.value, password.value);
      } catch (e) {
         alert(e);
      }
   }
   
   if (currentUser) {
      return <Redirect to='/explore'/>
   }
   return (
      <div>
         <Navigation />
         <div id='login-container'>
            <div id='login-header'>
               <p>Login</p>
               <div className='energy-bar'></div>
            </div>
            <div id='login-form'>
               <form onSubmit={handleLogin}>
                  <div className='login-input'>
                     <label htmlFor='email'>EMAIL</label>
                     <input required name='email' type='email' />
                  </div>
                  <div className='login-input'>
                     <label htmlFor='password'>PASSWORD</label>
                     <input required name='password' type='password' />
                  </div>
                  <div>
                     <a href='#'>Forget Password ?</a>
                  </div>
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
