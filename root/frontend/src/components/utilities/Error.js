import React from 'react'
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

export default function error404(props) {
   return (
      <div>
         <Navigation />
         <div style={{minHeight: '90vh'}}>

            <h1> Oops something wrong in the server: {props.match.params.message}</h1>
            <br />
            <Link to="/explore">Go to main page</Link>
         </div>
         <Footer />
      </div>
   )
}