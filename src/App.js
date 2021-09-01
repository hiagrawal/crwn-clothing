import React, {lazy, Suspense, useEffect} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';

import ErrorBoundary  from './components/error-boundary/error-boundary.component';

//import HomePage from './pages/homepage/homepage.component.jsx';
//import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
//import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
//import CheckoutPage from './pages/checkout/checkout.component';
//import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';


const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));

/*class App extends React.Component {
  // This is not needed now since we are setting the initial state in user reducer
  // constructor(props){
  //   super(props);
  //   this.state={currentUser:null}
  // }

  //super is used to get access to all the parent features that is React.component.. 
  //to access all it's methods and data and properties... 
  
  unsubscribeFromAuth = null;

  /*componentDidMount(){
    //const {setCurrentUser, collectionsArray} = this.props
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
      
      //this is just to add shop data in firestore which we needed to run just once on mount 
      //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}))); 
      
    })
  }*/

  /*componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<div>...Loading</div>}>
              <Route exact path='/' component= {HomePage}></Route>
              <Route path='/shop' component= {ShopPage}></Route>
              <Route exact path='/checkout' component= {CheckoutPage}></Route>
              <Route exact path='/signin' render={() =>this.props.currentUser?(<Redirect to='/' />):(<SignInAndSignUpPage/>)}></Route>
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
  
}



// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser,
// }) 

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //collectionsArray: selectCollectionsForPreview
}) 

const mapDispatchToProps = dispatch => ({ 
    checkUserSession : () => dispatch(checkUserSession())
})

// const mapDispatchToProps = dispatch => ({
//   setUserFunction: user => dispatch(setCurrentUser(user))
// });
//mapDispatchToProps is a method that takes dispatch as an argument provided by redux and returns an object.
//in object, it is returned in key value pair
//first key is setUserFunction that we are creating which we wil be using to set value
// whose value is a function that is accepting user as an argument and dispatching 
//this user argument value to setCurrentuser action to store it in the reducer

export default connect(mapStateToProps,mapDispatchToProps)(App);
//connect takes two arguments, one is mapStateToProps which is used to fetch data from reducer that we did
//in header component but we don't need it here to it's null 
//and second parameter is mapDispatchToProps whcih is used to set the data via action function*/

//Converted class component to function component using useEffect hook for lifecycle method
const App = ({checkUserSession}) => {
  
  useEffect(() =>{
    checkUserSession();
  },[checkUserSession])
  //We want checkuserSession to get called on component did mount only so if do not give second paramter 
  //then it will get fired on every re-render and will to infinite loop
  //If we give second parameter as empty array, then it will get fired on mount only but if it had any parent component that
  //gets rendered then this would have also fired which although is not the case here since it does not have any parent component
  //(which we have like in shop page)
  //but better to give second paramter to avoid any gap
  //Now can give checkUserSession only as second paramter since technically function is not getting changed and it will not fire 
  //useEffect ever once after mount 

  return (
    <div>
      <Header/>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>...Loading</div>}>
            <Route exact path='/' component= {HomePage}></Route>
            <Route path='/shop' component= {ShopPage}></Route>
            <Route exact path='/checkout' component= {CheckoutPage}></Route>
            <Route exact path='/signin' render={() =>this.props.currentUser?(<Redirect to='/' />):(<SignInAndSignUpPage/>)}></Route>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}
  
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
}) 

const mapDispatchToProps = dispatch => ({ 
  checkUserSession : () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
