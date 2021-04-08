
import {createSelector} from 'reselect';

//There types of selectors that we write.
//One is input selector: which does not use createSelector
//Another is Output selector which use input selectors and createSelector

// This is input selector which is a function and takes whole root reducer state as an argument and 
// returns a slice of it usually to one level only like in this case, cart
const selectCart = state => state.cart;

//this is output selector which calls createSelector which makes it a memoize selector
export const selectCartItems = createSelector(
    //create selector takes 2 arguments: one is collection of array of input selectors(which is selectCart)
    //might have multiple input selectors as well like [selectCart, selectUser]
    [selectCart],
    //and second argument is a function which takes the output of input selectors as an argument
    //might have multiple arguments in case of multiple input selectors like (cart,user)
    (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
 [selectCartItems],
 (cartItems)=>cartItems.reduce((totalCount, item) => totalCount + item.quantity,0)
)

