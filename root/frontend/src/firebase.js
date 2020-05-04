import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDENZAPUWYQ2LwM30MpqUmmffxAsEVHCmA",
    authDomain: "facebook-clone-a8ec8.firebaseapp.com",
    databaseURL: "https://facebook-clone-a8ec8.firebaseio.com",
    projectId: "facebook-clone-a8ec8",
    storageBucket: "facebook-clone-a8ec8.appspot.com",
    messagingSenderId: "349794889496",
    appId: "1:349794889496:web:db0bea10078c0a2789b86d",
    measurementId: "G-P1QTH6NKFS"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const userRef = firebaseApp.database().ref("users");