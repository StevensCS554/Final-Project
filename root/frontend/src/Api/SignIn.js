import {firebaseApp, userRef} from "../firebase";

export default (email, password) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        if(data.user){
            console.log("there have user");
        }
    })
    .catch(err => {
        console.log(err.message);
        console.log("User Not Found and not Signed");
        return err;// is not functioning right
    });  
};
