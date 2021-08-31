import UserActionTypes from './user.types';
import { takeLatest, put, all, call } from '@redux-saga/core/effects';

import {auth, createUserProfileDocument, googleProvider} from '../../firebase/firebase.utils';
import {googleSignInSuccess, googleSignInFailure } from './user.actions';

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

export function* userSaga() {
    yield all([call(onGoogleSignInStart)])
}
