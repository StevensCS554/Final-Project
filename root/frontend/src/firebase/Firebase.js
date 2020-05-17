import * as firebase from 'firebase/app';
//import config from './FirebaseConfig';
import 'firebase/auth';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDENZAPUWYQ2LwM30MpqUmmffxAsEVHCmA",
    authDomain: "facebook-clone-a8ec8.firebaseapp.com",
    databaseURL: "https://facebook-clone-a8ec8.firebaseio.com",
    projectId: "facebook-clone-a8ec8",
    storageBucket: "facebook-clone-a8ec8.appspot.com",
    messagingSenderId: "349794889496",
    appId: "1:349794889496:web:db0bea10078c0a2789b86d",
    measurementId: "G-P1QTH6NKFS"
});
// const firebaseApp = firebase.initializeApp({
//    apiKey: process.env.REACT_APP_FIREBASE_KEY,
//    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//    appId: process.env.REACT_APP_FIREBASE_APP_ID,
//    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// });

const storage = firebaseApp.storage();

export { storage, firebaseApp as default};