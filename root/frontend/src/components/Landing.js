import React, { useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/logo.png';
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
                  <h1>King of Community</h1>
                  <p>Social media web application supported by Agile Monsters</p>
                  <Link style={{fontSize: '1.7rem'}} to='/explore'>Get Started Now!</Link>
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
                        <i className="fas fa-desktop fa-2x"></i><h2>Find what inspires you</h2>
                     </div>
                     <div id='landing-fe-box-content'>
                        <p>Find what your neighbors are up to and find a gorup of your interest to join. With the help of Google Map, 
                           you can just stay at home and check what is going on around you. </p>
                     </div>
                  </div>
                  <div id='landing-fe-box' className='is-revealed'>
                     <div id='landing-fe-box-heading'>
                        <i className="fas fa-object-ungroup fa-2x"></i><h2> Make real connections</h2>
                     </div>
                     <div id='landing-fe-box-content'>
                        <p>Create your own group and start to manage it. Attract more people in your community to 
                           join with your amazing group management ability and become a star in your neighborhood!
                        </p>
                     </div>
                  </div>
                  <div id='landing-fe-box' className='is-revealed'>
                     <div id='landing-fe-box-heading'>
                        <i className="fas fa-thumbs-up fa-2x"></i><h2>Plan events on the fly</h2>
                     </div>
                     <div id='landing-fe-box-content'>
                        <p>Chatting with group managers and group members in real time allows you to arrange group
                           activity or meetup with ease!</p>
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
                  <div className='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={k} alt="kuanlyu's picture"/>
                        <h2>Kuan Lyu</h2>
                     </div>
                     <div className='landing-tm-box-contact'>
                        <p>Group Manager</p>
                        <a target='blanket' href='https://www.linkedin.com/in/kuan-lyu/'>Contact Him</a>
                     </div>
                  </div>
                  <div className='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={j} alt="Jason's picture" />
                        <h2>Jiaxian Xing</h2>
                     </div>
                     <div className='landing-tm-box-contact'>
                        <p>Group Member</p>
                        <a target='blanket' href='https://www.linkedin.com/in/jiaxian-xing/'>Contact Him</a>
                     </div>
                  </div>
                  <div className='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={r} alt="rui xing yuan's picture" />
                        <h2>Xingyuan Rui</h2>
                     </div>
                     <div className='landing-tm-box-contact'>
                        <p>Group Member</p>
                        <a target='blanket' href='https://www.linkedin.com/in/xingyuan-rui-b53212196/'>Contact Him</a>
                     </div>
                  </div>
                  <div className='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={z} alt="Christine's picture"/>
                        <h2>Luyun Zheng</h2>
                     </div>
                     <div className='landing-tm-box-contact'>
                        <p>Group Member</p>
                        <a target='blanket' href='https://www.linkedin.com/in/luyun-zheng-772283193/'>Contact Her</a>
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