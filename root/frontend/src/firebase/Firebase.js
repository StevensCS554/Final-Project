import * as firebase from 'firebase/app';
import config from './FirebaseConfig';
import 'firebase/auth';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
   apiKey: config.REACT_APP_FIREBASE_KEY,	    
   authDomain: config.REACT_APP_FIREBASE_DOMAIN,	     
   databaseURL: config.REACT_APP_FIREBASE_DATABASE,	         
   storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,	     
   messagingSenderId: config.REACT_APP_FIREBASE_SENDER_ID,	    
   appId: config.REACT_APP_FIREBASE_APP_ID,	    
   measurementId: config.REACT_APP_FIREBASE_MEASUREMENT_ID
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
