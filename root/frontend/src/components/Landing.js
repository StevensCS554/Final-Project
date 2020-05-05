import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import teamBg from '../images/team-bg.jpeg';
import { throttle } from 'lodash';
import Footer from './utilities/Footer';


const Landing = () => {

   useEffect(() => {
      events();
   }, []);

   const events = () => {
      window.addEventListener('scroll', throttle(calCaller, 200));
   };

   const calCaller = () => {
      console.log('working...');
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

   return (
      <div id='landing-component'>
         {/* navbar and header */}
         <div id="landing">
            <div id='navbar'>
               <nav>
                  <a id='logo-link' href='#'><img id='logo' src={logo} alt='company logo' /></a>
                  <ul>
                     <li><a href='#' className='current'>Home</a></li>
                     <li><Link to='/explore'><a>Explore</a></Link></li>
                     <li><Link to='/signin'><a>Signin</a></Link></li>
                     <li><a href='#'>Sigup</a></li>
                  </ul>
               </nav>

               <div id='header-content'>
                  <h1>A New Way of life</h1>
                  <p>some text bla bla</p>
                  <a href='#'>Get Started Now!</a>
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
                        <p>Some random shit</p>
                     </div>
                  </div>
                  <div id='landing-fe-box' className='is-revealed'>
                     <div id='landing-fe-box-heading'>
                        <i className="fas fa-object-ungroup fa-2x"></i><h2>feature2</h2>
                     </div>
                     <div id='landing-fe-box-content'>
                        <p>Some random shit</p>
                     </div>
                  </div>
                  <div id='landing-fe-box' className='is-revealed'>
                     <div id='landing-fe-box-heading'>
                        <i className="fas fa-thumbs-up fa-2x"></i><h2>feature3</h2>
                     </div>
                     <div id='landing-fe-box-content'>
                        <p>Some random shit</p>
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
                        <img src={teamBg} />
                        <h3>Kuan Lyu</h3>
                     </div>
                     <div id='landing-tm-box-contact'>
                        <p>bla bla</p>
                        <a href='#'>Contact Him</a>
                     </div>
                  </div>
                  <div id='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={teamBg} />
                        <h3>Jiaxian Xing</h3>
                     </div>
                     <div id='landing-tm-box-contact'>
                        <p>bla bla</p>
                        <a href='#'>Contact Him</a>
                     </div>
                  </div>
                  <div id='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={teamBg} />
                        <h3>Xingyuan Rui</h3>
                     </div>
                     <div id='landing-tm-box-contact'>
                        <p>bla bla</p>
                        <a href='#'>Contact Him</a>
                     </div>
                  </div>
                  <div id='landing-tm-box'>
                     <div id='landing-tm-box-profile'>
                        <img src={teamBg} />
                        <h3>Luyun Zheng</h3>
                     </div>
                     <div id='landing-tm-box-contact'>
                        <p>bla bla</p>
                        <a href='#'>Contact Him</a>
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