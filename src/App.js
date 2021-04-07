import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import {HomePage} from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={currentUser:null}
  }
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser:user});
      //console.log(user);
      if(userAuth){
        const userRef= await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
        console.log("snapShot from onSnapshot method in appjs:", snapShot);
        console.log("snapShot data from onSnapshot method in appjs:",snapShot.data());

        this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          }, () => {console.log("currentUser data after setting from snapshot data in setState:",this.state.currentUser)});
          console.log(this.state);
        });
      }
      else{
        this.setState({currentUser:userAuth},()=>{console.log("currentUser:", this.state.currentUser)});
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

export default App;
