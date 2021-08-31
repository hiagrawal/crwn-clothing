import UserActionTypes from './user.types';
import { takeLatest, put, all, call } from '@redux-saga/core/effects';

import {auth, createUserProfileDocument, googleProvider} from '../../firebase/firebase.utils';
import {googleSignInSuccess, googleSignInFailure,emailSignInSuccess, emailSignInFailure} from './user.actions';

export function* signInwithGoogle(){
    console.log("Hii inside ");
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        console.log(user);
        const userRef= yield call(createUserProfileDocument,user);
        const snapshot = yield userRef.get();
        console.log(snapshot);
        yield put(googleSignInSuccess({id: snapshot.id,...snapshot.data()}))
    }catch(error){
        yield put(googleSignInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInwithGoogle)
}

//emailSignInStart has action and payload which it will get as paramter but we want only payload so we will destructure the same
export function* signInwithEmail({payload: {email,password}}){
    console.log("Hii inside ");
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        console.log(user);
        const userRef= yield call(createUserProfileDocument,user);
        const snapshot = yield userRef.get();
        console.log(snapshot);
        yield put(emailSignInSuccess({id: snapshot.id,...snapshot.data()}))
    }catch(error){
        yield put(emailSignInFailure(error))
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInwithEmail)
}

export function* userSaga() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}
