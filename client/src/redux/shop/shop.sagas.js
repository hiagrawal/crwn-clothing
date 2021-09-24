import ShopActionTypes from './shop.types';

import { takeEvery, takeLatest, call, put, all } from "@redux-saga/core/effects";
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import {fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions';


export function* fetchCollectionsStartAsync(){
    console.log("I am fired");
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot); 
        yield put(fetchCollectionsSuccess(collectionsMap));
    }catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }
}
//yield should be used wherever there is asynchronous call/action/event
//yield just represents that the line written beside it is asynchronous and should wait for it to complete before executing next line

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsStartAsync)
}
//Lets use takeLatest instead takeEvery coz in case multiple calls are fired, we are always interested in the final output

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)]);
}