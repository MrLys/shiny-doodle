import React from 'react';
import './App.css';
import HomePage from "./page/homepage/homepage.component";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./page/shop-page/shop.component";
import Header from "./components/header/header.component";
import SignInAndUpPage from "./page/sign-in-and-up/sign-in-and-up.component";
import { auth } from "./firebase/firebase.util";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
       auth.onAuthStateChanged(user => {
           this.setState({currentUser: user});
       });
    }

    unsubscribeFromAuth = null;

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header signedIn={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' component={SignInAndUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
