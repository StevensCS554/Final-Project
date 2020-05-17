import React from 'react'
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

export default function error404() {
   return (
      <div>
         <Navigation />
         <div style={{minHeight: '90vh'}}>

            <h1> Where are you going ? 404</h1>
            <br />
            <Link to="/explore">Go to main page</Link>
         </div>
         <Footer />
      </div>
   )
}