import React from 'react'

export default function Footer() {
   return (
      <footer id='landing-footer'>
         <div id='landing-footer-test'>
            <div id='landing-footer-c'>
               <div id='landing-footer-social'>
                  <div id='landing-footer-h'>
                     <h3>Agile Monsters</h3>
                  </div>
                  <div className="social">
                     <i className="fab fa-twitter fa-2x"></i>
                     <i className="fab fa-facebook fa-2x"></i>
                     <i className="fab fa-instagram fa-2x"></i>
                     <i className="fab fa-linkedin fa-2x"></i>
                  </div>
               </div>
               <div id='landing-footer-links'>
                  <a href='https://www.linkedin.com/in/kuan-lyu/' target='_blank'>Group Manager</a>
                  {/* <a href='#'>dummy link</a>
                  <a href='#'>dummy link</a>
                  <a href='#'>dummy link</a> */}
               </div>
               <div id='landing-footer-locations'>
                  <p>Castle Point Terrace, Hoboken, NJ 07030, US</p>
                  <p>Stevens Institute of Technology</p>
               </div>
            </div>
            <p id='copy-right'>Coptyright 2020 &copy; AgileMonsters.com. All Rights Reserved</p>
         </div>
      </footer>
   )
}
