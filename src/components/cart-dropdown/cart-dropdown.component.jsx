
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

//redux will do a shallow equality check under the hood between state changes in mapStateToProps
//If our overall state changes but the cartItems value stays the same between these changes,  
//redux's shallow equality check will see that cartItems is the same value as last time and 
//save us a re-render

// Take Away: redux's mapStateToProps has a shallow equality check for every value in the object; 
//it won't replace values if they pass a shallow equality check which means it won't needlessly re-render, 
//but if we have transformation logic it's still valuable to memoize it with a selector 
//to save us running duplicate logic to get the same output.

const mapStateToProps = state =>({
    cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDropdown);