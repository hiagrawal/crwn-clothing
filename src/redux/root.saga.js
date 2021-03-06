
import {all, call} from 'redux-saga/effects';

import {shopSagas} from './shop/shop.sagas';
import {userSagas} from './user/user.sagas';
import {cartSagas} from './cart/cart.sagas';

export default function* rootSaga(){
    yield all([
        call(shopSagas), 
        call(userSagas),
        call(cartSagas)
    ])
}

// export default function* rootSaga(){
//     yield all([fetchCollectionsStart()])
// }
//we can use call or can give this like fetchCollectionsStart()
//it is just a practice and both are fine
   
//all is used to execute all sagar independently when they get a call
//if we would not have used 'all' effect and given like
// yield fetchCollectionsStart();
// yield anotherSaga();
// yield anotherSaga();
//it would have waited for the first saga to resolve or leaves first saga at some point and would not run all sagas concurrently