import React from 'react';

import './sign-in.styles.scss'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDocument, signInWithGoogle} from "../../firebase/firebase.util";
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: ""
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;
        try {
           const { user } = auth.signInWithEmailAndPassword(email, password)
            this.setState({
                email: '',
                password: '',
            });
        } catch (error) {
           console.log(error);
        }
    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value});
    };
    render() {
        const {email, password, username} = this.state;
        return (
            <div className='sign-in'>
               <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="text"
                               value={email}
                               handleChange={this.handleChange}
                               label='email'
                               required />

                    <label style={{display: "none"}}>username</label>
                    <FormInput style={{display: "none"}}
                               name="username"
                               value={username}
                               handleChange={this.handleChange} />

                    <FormInput name="password" type="password"
                               value={password}
                               handleChange={this.handleChange}
                               label='password'
                               required />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}
                            Sign in with google{' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;