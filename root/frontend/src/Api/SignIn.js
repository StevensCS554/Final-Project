import {firebaseApp, userRef} from "../firebase";

export default (email, password) => {
    
    /*
    firebaseApp.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    */

    
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(err =>{
        console.log(err.message);
        console.log("User not found");
        alert('Sorry, the email and the password is not match.')
        return err; 
    });
    console.log("the password and the email matches");
    firebaseApp.auth().onAuthStateChanged(function(user){
        if(user){
            window.location.replace('/explore');
        } else{
            alert('Sorry, the email and the password is not match.')
        }
    });
    
    
    /*
    if (flag == 1){
        window.location.replace('/explore');
    }
    */
    
};

