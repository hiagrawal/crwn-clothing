
import React from 'react';
//import './header.styles.scss';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';

//Link is used to link a route so it will be redirected to that route as per routes defined in app.js whwn clicked
const Header = ({currentUser,hidden,signOutStart}) => (
    //<div className="header">
    <HeaderContainer>
        {/* <Link className="logo-container" to="/"> */}
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        {/* </Link> */}
        
        {/* <div className="options"> */}
        <OptionsContainer>
            {/* <Link className="option" to ="/shop">SHOP</Link>
            <Link className="option" to ="/contact">CONTACT</Link> */}
            <OptionLink to ="/shop">SHOP</OptionLink>
            <OptionLink to ="/contact">CONTACT</OptionLink>
            {
              currentUser? 
              //<div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> :
              // <div className="option" onClick={signOutStart}>SIGN OUT</div> :
              // <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>:
              <OptionLink as="div" onClick={signOutStart}>SIGN OUT</OptionLink>:
              // <Link className="option" to ="/signin">SIGN IN</Link>
              <OptionLink to ="/signin">SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {/* </div> */}
        { hidden ? null : <CartDropdown /> }
      </HeaderContainer>
    // </div>
)

/*const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    hidden: state.cart.hidden
  })*/

  //state here represents root reducer 
  //currentUser name is the prop that needs to be passed in header component
  // and this currentUser prop value will be current user value that we are setting in user reducer
  // so it will be currentUser which is in user reducer which in turn is passed in root-reducer 
  //so state which is rootReducer.user which is user reducer dot currentUser which is a property of user reducer

  //so instead of passing currentUser as a prop from App.js we directly access it from the root reducer

  /*const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
  })*/
  //if we have multiple props then better to use createStructuredSelector so another way to write it is :

  const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
  })

  const mapDispatchToProps = dispatch => ({
      signOutStart : () => dispatch(signOutStart())
  })

export default connect(mapStateToProps,mapDispatchToProps)(Header);
//this 'connect' is a higher order component is a function that accepts mapStateToProps function and returns 
//another higher order component which is taking Header as an input component and modify the same