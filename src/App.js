import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import {HomePage} from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {
  // This is not needed now since we are setting the initial state in user reducer
  // constructor(props){
  //   super(props);
  //   this.state={currentUser:null}
  // }
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser:user});
      //console.log(user);
      if(userAuth){
        const userRef= await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
        // console.log("snapShot from onSnapshot method in appjs:", snapShot);
        // console.log("snapShot data from onSnapshot method in appjs:",snapShot.data());

        //We will now not set the state using setState but using setCurrentUser method
        // this.setState({
        //     currentUser:{
        //       id:snapShot.id,
        //       ...snapShot.data()
        //     }
        //   }, () => {console.log("currentUser data after setting from snapshot data in setState:",this.state.currentUser)});
          
          //console.log(this.state);

          this.props.setUserFunction({
                    id:snapShot.id,
                  ...snapShot.data()
               });
        });
      }
      else{
        //this.setState({currentUser:userAuth},()=>{console.log("currentUser:", this.state.currentUser)});
        this.props.setUserFunction(userAuth);
      }
      

      
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        {/* <HomePage /> */}
        <Header/>
        <Switch>
          <Route exact path='/' component= {HomePage}></Route>
          <Route exact path='/shop' component= {ShopPage}></Route>
          <Route exact path='/signin' component= {SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
  
}

const mapDispatchToProps = dispatch => ({
  setUserFunction: user => dispatch(setCurrentUser(user))
});
//mapDispatchToProps is a method that takes dispatch as an argument provided by redux and returns an object.
//in object, it is returned in key value pair
//first key is setUserFunction that we are creating which we wil be using to set value
// whose value is a function that is accepting user as an argument and dispatching 
//this user argument value to setCurrentuser action to store it in the reducer

export default connect(null,mapDispatchToProps)(App);
//connect takes two arguments, one is mapStateToProps which is used to fetch data from reducer that we did
//in header component but we don't need it here to it's null 
//and second parameter is mapDispatchToProps whcih is used to set the data via action function
