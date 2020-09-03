import React from 'react';
import './App.css';
import HomePage from "./page/homepage/homepage.component";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./page/shop-page/shop.component";
import Header from "./components/header/header.component";
import SignInAndUpPage from "./page/sign-in-and-up/sign-in-and-up.component";

function App() {
  return (
      <div>
          <Header />
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/shop' component={ShopPage} />
              <Route exact path='/signin' component={SignInAndUpPage} />
          </Switch>
      </div>
  );
}

export default App;
