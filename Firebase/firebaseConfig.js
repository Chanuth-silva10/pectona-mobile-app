import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDhBpWBYC6o5nryqmz_eBFGJPea3Qd6dlI",
    authDomain: "pectona-21228.firebaseapp.com",
    databaseURL:"https://pectona-21228-default-rtdb.firebaseio.com",
    projectId: "pectona-21228",
    storageBucket: "pectona-21228.appspot.com",
    messagingSenderId: "230585942397",
    appId: "1:230585942397:web:2249057cb171ada298cc14",
    measurementId: "G-T8BLDDFS2T"
  };

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }