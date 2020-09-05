import React from 'react';
import './App.css';
import HomePage from "./page/homepage/homepage.component";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./page/shop-page/shop.component";
import Header from "./components/header/header.component";
import SignInAndUpPage from "./page/sign-in-and-up/sign-in-and-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.util";
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user.actions';
class App extends React.Component {

    unsubscribeFromAuth = null;
    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                });
            } else {
                setCurrentUser({currentUser: userAuth});
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
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' component={SignInAndUpPage}/>
                </Switch>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
