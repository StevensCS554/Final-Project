import React, { useState, useEffect, useContext } from 'react';
import Navigation from './utilities/Navigation';
import ProfileForm from './utilities/ProfileForm';
import ProfileShow from './utilities/ProfileShow';
import Footer from './utilities/Footer';
import { AuthContext } from '../firebase/Auth';

export default function Userprofile(props) {
   const { currentUser } = useContext(AuthContext);
   const [isUserself, setIsUserself] = useState(false);

   useEffect(() => {
      try {
         // userAuthorization();
         if (props.match.params.username === currentUser.displayName) {
            setIsUserself(true);
         }
      } catch (e) {
         alert(e);
      }
   }, [props.match.params.username]
   )

   if (isUserself) {
      return (
         <div>
            <Navigation />
            <ProfileForm />
            <Footer />
         </div>
      )
   }
   else {
      return (
         <div>
            <Navigation />
            <ProfileShow username={props.match.params.username}/>
            <Footer />
         </div>
      )
   }

};
