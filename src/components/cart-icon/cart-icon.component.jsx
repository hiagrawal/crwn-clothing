
import React from 'react';
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

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

//issue with selectors is.. everytime it gets called on any other state change as well for ex when we sign in
//then also it is called, when we sign out then also it is called which should not be the case
//as even if cartItems is same which in turn itemCount is same then also, it is passing itemCount value to 
//cartIcon and which is turn re-rending the cart icon component every time which is not good for performace

//for this, we have memoization concept which is achieved using Reset library, which allows us to write 
//selectors in such a way which knows if property pulling from the state is same then it will not pass the 
//value to component which will stop re-rending of the component so it will be 

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);