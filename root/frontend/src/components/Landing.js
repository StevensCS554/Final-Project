import React, { useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/logo.png';
import teamBg from '../images/team-bg.jpeg';
import k from '../images/kuanlvu.jpeg';
import j from '../images/Jason.jpeg';
import r from '../images/XingyuanRui.jpeg';
import z from '../images/Christine.jpeg'

import { throttle } from 'lodash';
import Footer from './utilities/Footer';
import { AuthContext } from '../firebase/Auth';


const Landing = () => {

   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      events();
   }, []);

   const events = () => {
      window.addEventListener('scroll', throttle(calCaller, 200));
   };

   const calCaller = () => {
      let items = document.querySelectorAll('.is-revealed');
      items.forEach((el) => {
         calculateScroll(el);
      });
   };

   const calculateScroll = el => {
      let scrollPercent = (el.getBoundingClientRect().y / window.innerHeight) * 100;
      if (scrollPercent < 75)
         el.classList.add('is-visible');
   }

   if (currentUser) {
      return <Redirect to='explore' />
   }

   return (
      <div id='landing-component'>
         {/* navbar and header */}
         <div id="landing">
            <div id='navbar'>
               <nav>
                  <img id='logo' src={logo} alt='company logo' />
                  <ul>
                     <li><a href='/' className='current'>Home</a></li>
                     <li><Link to='/explore'>Explore</Link></li>
                     <li><Link to='/login'>Login</Link></li>
                     <li><Link to='/signup'>Sigup</Link></li>
                  </ul>
               </nav>

               <div id='header-content'>
                  <h1>A New Way of life</h1>
                  <p>A social platform dedicated to grouping people with similar hobbies and interests.</p>
                  <a href='/explore'>Get Started Now!</a>
               </div>
            </div>
         </div>
         {/* Feature Section */}
         <div id='feature' className='is-revealed'>
            <div id='landing-fe'>
               <div id='landing-fe-heading' className='is-revealed landing-fe-c-heading'>
                  <h1>OUR FEATURE</h1>
                  <div className='energy-bar is-revealed'></div>
               </div>
               <div id='landing-fe-features'>
                  <div id='landing-fe-box' className='is-revealed'>
                     <div id='landing-fe-box-heading'>
                        <i className="fas fa-desktop fa-2x"></i><h2>feature1</h2>
                     </div>
                     <div id='landing-fe-box-content'>
                        <p>Authentication</p>
                        <ul>
                           <li>Sign up</li>
                           <li>Sign in</li>
                           <li>Sign out</li>
                        </ul>
                     </div>
                  </div>
                  <div id='landing-fe-box' className='is-revealed'>
                     <div id='landing-fe-box-heading'>
                        <i className="fas fa-object-ungroup fa-2x"></i><h2>feature2</h2>
                     </div>
                     <div id='landing-fe-box-content'>
                        <p>Group Activity</p>
                           <ul >
                              <li>Start a new goup</li>
                              <li>Discover groups by location</li>
                              <li>Join groups</li>
                              <li>Delete a member in group</li>
                              <li>add posts in group</li>
                           </ul>
                     </div>
                  </div>
                  <div id='landing-fe-box' className='is-revealed'>
                     <div id='landing-fe-box-heading'>
                        <i className="fas fa-thumbs-up fa-2x"></i><h2>feature3</h2>
                     </div>
                     <div id='landing-fe-box-content'>
                        <p>Small Chatting Room</p>
                     <ul>
                        <li>Chat between two people</li>
                        <li>Quit notification</li>
                     </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Team Members */}
         <div id='landing-tm' className='is-revealed'>
            <div id='landing-tm-c'>
               <div id='landing-tm-c-header' className='is-revealed'>
                  <h1>OUR TEAM</h1>
               </div>
               <div id='landing-tm-box-c' className='is-revealed'>
                  <div id='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={k} alt="kuanlvu's pircture"/>
                        <h3>Kuan Lyu</h3>
                     </div>
                     <div id='landing-tm-box-contact'>
                        <p>Group Manager</p>
                        <a href='https://www.linkedin.com/in/kuan-lyu/'>Contact Him</a>
                     </div>
                  </div>
                  <div id='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={j} alt="Jason's picture" />
                        <h3>Jiaxian Xing</h3>
                     </div>
                     <div id='landing-tm-box-contact'>
                        <p>Group Member</p>
                        <a href='https://www.linkedin.com/in/jiaxian-xing/'>Contact Him</a>
                     </div>
                  </div>
                  <div id='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={r} alt="teamBg" />
                        <h3>Xingyuan Rui</h3>
                     </div>
                     <div id='landing-tm-box-contact'>
                        <p>Group Member</p>
                        <a href='https://www.linkedin.com/in/xingyuan-rui-b53212196/'>Contact Him</a>
                     </div>
                  </div>
                  <div id='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={z} alt="Christine's picture"/>
                        <h3>Luyun Zheng</h3>
                     </div>
                     <div id='landing-tm-box-contact'>
                        <p>Group Member</p>
                        <a href='https://www.linkedin.com/in/luyun-zheng-772283193/'>Contact Her</a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* footer section */}
         <Footer />
      </div>
   )
}

export default Landing;