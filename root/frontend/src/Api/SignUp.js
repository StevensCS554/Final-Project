import {firebaseApp, userRef} from "../firebase";

export default (email, username, address, password) => {
    console.log("this is sign up function!!!!!!!!!!!!!!!!!");

    if(!username || !address){
        return false;
    }

    firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
        userRef.child(data.user.uid).set({
            email,
            username,
            address,
            password
        });
        
        return true;
    })
    .catch(err => {
        console.log(err);
        return err;
    });  
};