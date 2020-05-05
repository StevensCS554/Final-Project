import {firebaseApp, userRef} from "../firebase";

export default (email, password) => {
    return firebaseApp.auth().signInWithEmailAndPassword(email, password);
};

