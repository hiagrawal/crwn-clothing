
import React from 'react';
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

const CartIcon =({toggleCartHidden,itemCount}) =>(
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = ({cart:{cartItems}}) => ({
    itemCount: cartItems.reduce((totalCount, item) => totalCount + item.quantity,0)
})
//this itemCount concept is called 'selector in Redux' as we are taking the state value
//and not directly using the complete state value that is cartItems in this case and reducing it to take a slice of it
// which is itemCount

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);