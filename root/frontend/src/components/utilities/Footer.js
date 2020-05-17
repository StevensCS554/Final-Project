import React from 'react'

export default function Footer() {
   return (
      <footer id='landing-footer'>
         <div id='landing-footer-test'>
            <div id='landing-footer-c'>
               <div id='landing-footer-social'>
                  <div id='landing-footer-h'>
                     <p style={{fontSize: '1.7rem'}}>Agile Monsters</p>
                  </div>
                  <div className="social">
                     <i className="fab fa-twitter fa-2x"></i>
                     <i className="fab fa-facebook fa-2x"></i>
                     <i className="fab fa-instagram fa-2x"></i>
                     <i className="fab fa-linkedin fa-2x"></i>
                  </div>
               </div>
               <div id='landing-footer-links'>
                  <a href='https://www.linkedin.com/in/kuan-lyu/' target='blank'>Group Manager</a>
                  <a href='https://github.com/StevensCS554/Final-Project' target='blank'>Our Work</a>
                  <a target='blanket' href='https://www.linkedin.com/in/luyun-zheng-772283193/'>Service Center</a>
                  {/* <a href='#'>dummy link</a> */}
               </div>
               <div id='landing-footer-locations'>
                  <p>Castle Point Terrace, Hoboken, NJ 07030, US</p>
                  <p>Stevens Institute of Technology</p>
               </div>
            </div>
            <p style={{color: 'white', fontSize: '1.1rem', marginTop: '0.7rem'}} id='copy-right'>Coptyright 2020 &copy; AgileMonsters.com. All Rights Reserved</p>
         </div>
      </footer>
   )
}
