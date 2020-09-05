import React from 'react';
import './App.css';
import HomePage from "./page/homepage/homepage.component";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./page/shop-page/shop.component";
import Header from "./components/header/header.component";
import SignInAndUpPage from "./page/sign-in-and-up/sign-in-and-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.util";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    this.setState({currentUser: {
                        id: snapshot.id,
                            ...snapshot.data()
                        }
                    }, () => console.log(this.state));
                });
            } else {
                this.setState({currentUser: userAuth});
            }
        });
    }


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
