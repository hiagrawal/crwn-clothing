import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import {HomePage} from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

function App() {
  return (
    <div>
      {/* <HomePage /> */}
      <Header />
      <Switch>
        <Route exact path='/' component= {HomePage}></Route>
        <Route exact path='/shop' component= {ShopPage}></Route>
        <Route exact path='/signin' component= {SignInAndSignUpPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
