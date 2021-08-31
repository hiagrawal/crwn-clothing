
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
//allows the browser to cache the store 

//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import {fetchCollectionsStart} from './shop/shop.sagas';

const sagaMiddleware = createSagaMiddleware();

//const middlewares = [logger,thunk];
const middlewares = [logger,sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(fetchCollectionsStart);

const persistor = persistStore(store);

export {store, persistor};