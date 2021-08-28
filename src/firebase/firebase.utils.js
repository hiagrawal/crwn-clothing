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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // console.log('userAuth inside method:', userAuth);
    // console.log('additionalData inside method:', additionalData);
    if(!userAuth) return;

    //console.log(firestore.doc('/users/Pr6UkKUkfT0Xt0NB3cwp/cartItems/OPyWU7CZQS8sBykdATLK'));

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // console.log('userRef in firebase utility:', userRef);
    const snapShot = await userRef.get();
    // console.log('snapShot in firebase utility:',snapShot);

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({displayName,email,createdAt,...additionalData})
        }
        catch(error){
            console.log("error creating user", error.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
  
    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
  
    return await batch.commit();
  };


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
//provider.setCustomParameters({'prompt': 'select_account'});
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

export default firebase;

// firestore.collection('users').doc('Pr6UkKUkfT0Xt0NB3cwp').collection('cartItems').doc('OPyWU7CZQS8sBykdATLK');
// firestore.doc('/users/Pr6UkKUkfT0Xt0NB3cwp/cartItems/OPyWU7CZQS8sBykdATLK');
// firestore.collection('/users/Pr6UkKUkfT0Xt0NB3cwp/cartItems');