
import React from 'react';
import './cart-dropdown.styles.scss';
import  CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {connect} from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart.selectors'

const CartDropdown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))
            }
        </div>
        <CustomButton>Go TO CHECKOUT</CustomButton>
    </div>
) 

// const mapStateToProps = state =>({
//     cartItems: state.cart.cartItems
// })

//this cartItem is a selector in redux and gets called if any value in state gets changed
//even if it is not of cart or cart item. Even if user state changes in root reducer (store) then also
//it invokes all the mapStateToProps in all components of all reducers. to vaoid this, we use createSelector

const mapStateToProps = state =>({
    cartItems: selectCartItems(state)
})

//this will make sure that our cart dropdown component does not re render when state changes which is 
//unrelated to cart items which saves us on performance

export default connect(mapStateToProps)(CartDropdown);