
import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key:'root',
    storage,
    whitelist:['cart']
}
//here will create an config object which will define: 1. Where want to store, what type of storage : local or session and what data want to store
//whitelist will have an array of reducers that we want to store

const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer,
    directory:directoryReducer
});

export default persistReducer(persistConfig, rootReducer);