import {firebaseApp, userRef} from "../firebase";

export default (email, password) => {
    
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(err =>{
        console.log(err.message);
        console.log("User not found");
        alert('Sorry, the email and the password is not match.')
        return err; 
    });
    firebaseApp.auth().onAuthStateChanged(function(user){
        if(user){
            window.location.replace('/explore');
        } 
    });
    
};

