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

//this is a method used to add shop data in firebase database.
//can be used to store any data to store in firebase as it is a generic function
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
  
    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
  
    return await batch.commit();
  };

  //we are fetching the data from database
  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
      const { title, items } = doc.data();
  
      //adding routeName and id to the data getting returned from firebase datase
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      };
    });
  
    //and since it is an array like we had in shop data, we are converting it into an object that we did for shop data
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };


firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise(( resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged( userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({'prompt': 'select_account'});
export const signInWithGoogle = () => firebase.auth().signInWithPopup(googleProvider);

export default firebase;

// firestore.collection('users').doc('Pr6UkKUkfT0Xt0NB3cwp').collection('cartItems').doc('OPyWU7CZQS8sBykdATLK');
// firestore.doc('/users/Pr6UkKUkfT0Xt0NB3cwp/cartItems/OPyWU7CZQS8sBykdATLK');
// firestore.collection('/users/Pr6UkKUkfT0Xt0NB3cwp/cartItems');