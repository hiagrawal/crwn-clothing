
import React from 'react';
import './cart-item.styles.scss';

const CartItem = ({item:{imageUrl, name, price, quantity}}) => (
    <div className="cart-item">
        <img className="img" src={imageUrl} alt='item' />
        <div className="item-details">
            <span className="name">{name}</span>
            <span className="price">{quantity} x ${price}</span>
        </div>

    </div>
)

export default React.memo(CartItem);
//everytime we add items from cart-dropdown in cartItem, one item gets added in cartItems array in cartDropdown 
//component and hence re-renders cartItem component for all the items already added as well the new added item
//to avoid use, we can memoize CartItem component so it only renders for the new added item in the already added cartItems