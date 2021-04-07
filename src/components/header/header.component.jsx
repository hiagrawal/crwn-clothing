
import React from 'react';
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component'

const Header = ({currentUser}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        
        <div className="options">
            <Link className="option" to ="/shop">SHOP</Link>
            <Link className="option" to ="/contact">CONTACT</Link>
            {currentUser? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>:<Link className="option" to ="/signin">SIGN IN</Link>}
            <CartIcon/>
        </div>
    </div>
)

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  })

  //state here represents root reducer 
  //currentUser name is the prop that needs to be passed in header component
  // and this currentUser prop value will be current user value that we are setting in user reducer
  // so it will be currentUser which is in user reducer which in turn is passed in root-reducer 
  //so state which is rootReducer.user which is user reducer dot currentUser which is a property of user reducer

  //so instead of passing currentUser as a prop from App.js we directly access it from the root reducer

export default connect(mapStateToProps)(Header);
//this 'connect' is a higher order component is a function that accepts mapStateToProps function and returns 
//another higher order component which is taking Header as an input component and modify the same