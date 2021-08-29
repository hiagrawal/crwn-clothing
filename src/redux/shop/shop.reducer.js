//import SHOP_DATA from './shop.data';

import ShopActionTypes from './shop.types';

const INITITAL_STATE={
    //collections: SHOP_DATA
    collections: null
    //since we are getting the data from firbase now on shop mount, we dont need to set it from static shop data file
    //but since getting data from backend (firestore) is asynchronous call, selector gets called on collection overview page on shop click
    //and give error when try to iterate on collections objects in selectCollectionsForPreview
    //to fix, will have to check for empty object

    //same when click on particular category, hats, jackets, and redirects to collection page 
    //then also gives error in selectCollection selector when try to access items from collection object 
};


const shopReducer = (state=INITITAL_STATE, action) =>{
 switch (action.type){
    case ShopActionTypes.UPDATE_COLLECTIONS:
        return {
          ...state,
          collections: action.payload,
        };
    default:
        return state;
}
};

export default shopReducer;