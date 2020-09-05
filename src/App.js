import React from 'react';
import {auth, createUserProfileDocument} from "./firebase/firebase.util";
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from "./redux/user/user.selectors";
import ShopPage from "./page/shop-page/shop.component";
import Header from "./components/header/header.component";
import HomePage from "./page/homepage/homepage.component";
import CheckoutPage from "./page/checkout/checkout.component";
import SignInAndUpPage from "./page/sign-in-and-up/sign-in-and-up.component";

import './App.css';

class App extends React.Component {

    unsubscribeFromAuth = null;
    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            console.log("authChange", userAuth);
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }


    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndUpPage/>)}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
