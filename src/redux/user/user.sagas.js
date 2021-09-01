import UserActionTypes from './user.types';
import { takeLatest, put, all, call } from '@redux-saga/core/effects';

import {auth, createUserProfileDocument, googleProvider, getCurrentUser} from '../../firebase/firebase.utils';
import {SignInSuccess, SignInFailure, signOutSuccess, signOutFailure} from './user.actions';

export function* getSnapshotFromUserAuth(userAuth){
    try{
        const userRef= yield call(createUserProfileDocument,userAuth);
        const snapshot = yield userRef.get();
        //console.log(snapshot);
        yield put(SignInSuccess({id: snapshot.id,...snapshot.data()}))
    }catch(error){
        yield put(SignInFailure(error))
    }
}

export function* signInwithGoogle(){
    console.log("Hii inside ");
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        //console.log(user);
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(SignInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInwithGoogle)
}

//emailSignInStart has action and payload which it will get as paramter but we want only payload so we will destructure the same
export function* signInwithEmail({payload: {email,password}}){
    //console.log("Hii inside ");
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        //console.log(user);
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(SignInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    }catch(error){
        yield put(SignInFailure(error));
    }
}

export function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }catch(error){
        yield put(signOutFailure(error));
    }
    
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInwithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onUserSignOut(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onUserSignOut)
    ])
}
