import firebase from 'firebase/app';
import config from './FirebaseConfig';
import 'firebase/auth';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
   apiKey: config.REACT_APP_FIREBASE_KEY,
   authDomain: config.REACT_APP_FIREBASE_DOMAIN,
   databaseURL: config.REACT_APP_FIREBASE_DATABASE,
   projectId: config.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: config.REACT_APP_FIREBASE_SENDER_ID,
   appId: config.REACT_APP_FIREBASE_APP_ID,
   measurementId: config.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const storage = firebaseApp.storage();

export { storage, firebaseApp as default};