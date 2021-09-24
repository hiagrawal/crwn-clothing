
import React from 'react';
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

//svg images are imported as ReactComponent
const CartIcon =({toggleCartHidden,itemCount}) =>(
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

/*const mapStateToProps = ({cart:{cartItems}}) => ({
    itemCount: cartItems.reduce((totalCount, item) => totalCount + item.quantity,0)
})*/

//this itemCount concept is called 'selector in Redux' as we are taking the whole state object (rootreducer object)
//and then pulls off just a small portion or a slice of that state
//that is taking only cart of that state then cart items and then item count.

//issue with this itemCount reduce is.. everytime it gets called on any other state change for ex 
//when we sign in then also it is called, when we sign out then also it is called which should not be the case
//as even if cartItems is same which in turn itemCount is same then also, reduce logic is running everytime
//Also, if we want to use logic in another component, then again we wil have to write the same function

//for this, we have memoization concept which is achieved using Reset library, which allows us to write 
//selectors. 

//Due to itemCount being a primitive (integer), 
//redux will do a shallow equality check under the hood between state changes in mapStateToProps. 
//If our overall state changes but the itemCount value stays the same between these changes,  
//redux's shallow equality check will see that itemCount is the same value as last time and does not re-render the component.
// It's still valuable to keep the logic for the reduce in a selector though because 
//we do still want to memoize the calculation of itemCount (our reduce logic), 
//and without a selector our reduce logic would still be running on every state change 
//regardless of the final calculated value of itemCount.

//The take away here is that redux's mapStateToProps has a shallow equality check for every value in the object;
// it won't replace values if they pass a shallow equality check which means it won't needlessly re-render, 
//but if we have transformation logic it's valuable to memoize it with a selector to save us 
//running duplicate logic to get the same output.

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);