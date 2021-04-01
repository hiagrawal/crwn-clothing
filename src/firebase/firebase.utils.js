import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyA1EfuAyiYEUjvIDbAFVKSYMiFgwle6JWU",
    authDomain: "crwn-db-dbb2b.firebaseapp.com",
    projectId: "crwn-db-dbb2b",
    storageBucket: "crwn-db-dbb2b.appspot.com",
    messagingSenderId: "312397557630",
    appId: "1:312397557630:web:92ac0d9e371aa2ebfa4d2f",
    measurementId: "G-ZGR9053MCR"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
//provider.setCustomParameters({'prompt': 'select_account'});
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

export default firebase;